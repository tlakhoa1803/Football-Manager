package must

import (
	"context"
	"fmt"
	"github.com/NMCNPM-football/backend/config"
	"github.com/NMCNPM-football/backend/swagger"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"google.golang.org/grpc/connectivity"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/grpc/grpclog"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"path"
	"strings"
	"syscall"
	"time"
)

type ServiceServer interface {
	RegisterGrpcServer(*grpc.Server)
	RegisterHandler(context.Context, *runtime.ServeMux, *grpc.ClientConn) error
}

func preflightHandler(w http.ResponseWriter, r *http.Request) {
	headers := []string{"Content-Type", "Accept", "Authorization"}
	w.Header().Set("Access-Control-Allow-Headers", strings.Join(headers, ","))
	methods := []string{"GET", "HEAD", "POST", "PUT", "DELETE"}
	w.Header().Set("Access-Control-Allow-Methods", strings.Join(methods, ","))
	grpclog.Infof("Preflight request for %s", r.URL.Path)
}

func allowCORS(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if origin := r.Header.Get("Origin"); origin != "" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			if r.Method == "OPTIONS" && r.Header.Get("Access-Control-Request-Method") != "" {
				preflightHandler(w, r)
				return
			}
		}
		h.ServeHTTP(w, r)
	})
}

func handleHealth(gwmux *runtime.ServeMux, conn *grpc.ClientConn) {
	gwmux.HandlePath("GET", "/healthz", func(w http.ResponseWriter, req *http.Request, pathParams map[string]string) {
		w.Header().Set("Content-Type", "text/plain")
		if s := conn.GetState(); s != connectivity.Ready {
			http.Error(w, fmt.Sprintf("grpc server is %s", s), http.StatusBadGateway)
			return
		}

		fmt.Fprintln(w, "ok")
	})
}

func serveSwagger(mux *runtime.ServeMux) {
	mux.HandlePath("GET", "/docs/{name}", func(w http.ResponseWriter, r *http.Request, pathParams map[string]string) {
		if !strings.HasSuffix(r.URL.Path, ".swagger.json") {
			http.Error(w, fmt.Sprintf("file not found"), http.StatusBadGateway)
			return
		}

		p := strings.TrimPrefix(r.URL.Path, "/docs/")
		p = path.Join("docs", p)
		http.ServeFile(w, r, p)
	})

	mux.HandlePath("GET", "/swagger-ui/{file}", func(w http.ResponseWriter, r *http.Request, pathParams map[string]string) {
		p := path.Join("swagger/dist", pathParams["file"])
		if pathParams["file"] == "" {
			p = "swagger/dist/index.html"
		} else {
			_, err := swagger.Asset(p)
			if err != nil {
				http.Error(w, fmt.Sprintf("file not found"), http.StatusBadGateway)
				return
			}
		}

		http.ServeFile(w, r, p)
	})
}

func NewServer(
	ctx context.Context,
	cfg *config.Config,
	opt []grpc.ServerOption,
	optHttpServer []func(http.Handler) http.Handler,
	serviceServer ...ServiceServer,
) *grpc.Server {
	RegisterGrpcServer(opt, cfg.GrpcPort, serviceServer...)
	// Create a client connection to the gRPC server we just started
	// This is where the gRPC-Gateway proxies the requests
	conn, err := grpc.DialContext(
		ctx,
		fmt.Sprintf("0.0.0.0:%v", cfg.GrpcPort),
		grpc.WithBlock(),
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	)

	if err != nil {
		log.Fatalln("Failed to dial server:", err)
	}

	srv := RegisterHttpServer(ctx, conn, cfg.Port, optHttpServer, serviceServer...)

	go func() {
		log.Printf("Serving Http-Gateway on %v\n", cfg.Port)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal("srv.ListenAndServe", zap.Error(err))
		}
	}()

	// Wait for interrupt signal to gracefully shutdown the server with
	// a timeout of 5 seconds.
	quit := make(chan os.Signal)
	// kill (no param) default send syscall.SIGTERM
	// kill -2 is syscall.SIGINT
	// kill -9 is syscall.SIGKILL but can't be catch, so don't need add it
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")

	// The context is used to inform the server it has 5 seconds to finish
	// the request it is currently handling
	ctxTimeout, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctxTimeout); err != nil {
		log.Fatal("Server forced to shutdown", zap.Error(err))
	}

	log.Println("Server exiting")

	return nil
}

func RegisterGrpcServer(opt []grpc.ServerOption, grpcPort int, serviceServer ...ServiceServer) *grpc.Server {
	// Create a gRPC server object
	grpcServer := grpc.NewServer(
		opt...,
	)
	// Attach the Greeter services to the server

	for _, server := range serviceServer {
		server.RegisterGrpcServer(grpcServer)
	}

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", grpcPort))
	if err != nil {
		log.Fatalln("Failed to listen:", err)
	}

	go func() {
		log.Fatalln(grpcServer.Serve(lis))
	}()

	log.Println("Serving gRPC on 0.0.0.0" + fmt.Sprintf(":%d", grpcPort))

	return grpcServer
}

func RegisterHttpServer(ctx context.Context, conn *grpc.ClientConn, httpPort int, middleware []func(http.Handler) http.Handler, serviceServer ...ServiceServer) *http.Server {
	mux := runtime.NewServeMux(
	//runtime.WithRoutingErrorHandler(handleRoutingError),
	)

	for _, server := range serviceServer {
		err := server.RegisterHandler(ctx, mux, conn)
		if err != nil {
			log.Fatalln("Failed to register gateway:", err)
		}
	}

	handleHealth(mux, conn)
	serveSwagger(mux)

	var handler http.Handler = mux
	for i := len(middleware) - 1; i >= 0; i-- {
		handler = middleware[i](handler)
	}

	httpMux := http.NewServeMux()
	httpMux.Handle("/", handler)

	srv := &http.Server{
		Handler: allowCORS(httpMux),
		Addr:    fmt.Sprintf(":%d", httpPort),
	}

	return srv
}
