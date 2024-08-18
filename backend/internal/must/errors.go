package must

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"go.uber.org/zap"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	_ "google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"
	"net/http"
	"strings"
)

var (
	//CommonErrors
	ErrInvalidCredentials  = &Error{Code: codes.Unauthenticated, Message: "Invalid credentials."}
	ErrInternalServerError = &Error{Code: codes.Internal, Message: "Internal server error"}
	ErrTokenExpired        = &Error{Code: codes.Unauthenticated, Message: "Token expired."}

	//Users
	ErrEmailExists     = &Error{Code: codes.AlreadyExists, Message: "Email already exists."}
	ErrInvalidEmail    = &Error{Code: codes.InvalidArgument, Message: "Must be business email."}
	ErrInvalidPassword = &Error{Code: codes.InvalidArgument, Message: "Invalid password."}
	ErrEmailNotExists  = &Error{Code: codes.NotFound, Message: "Email doesn't exist."}
)

type Error struct {
	Code    codes.Code `json:"code"`
	Message string     `json:"message"`
}

func (e Error) Error() string {
	return e.Message
}

func (e Error) GetCode() codes.Code {
	return e.Code
}

func HandlerError(err error, logger *zap.Logger) error {
	var detectErr *Error
	switch {
	case errors.As(err, &detectErr):
		e := err.(*Error)
		return status.Error(e.Code, e.Error())
	default:
		logger.Error("s.ErrorResponseHandle", zap.Error(err))
		return status.Error(ErrInternalServerError.Code, ErrInternalServerError.Error())
	}
}

func HttpErrorException(logger *zap.Logger, w http.ResponseWriter, err error) {
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		switch err.(type) {
		case *Error:
			errJson, _ := json.Marshal(err.(*Error))
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(string(errJson)))
			return
		default:
			logger.Error("ErrorException", zap.Error(err))
			w.WriteHeader(http.StatusInternalServerError)
			errJson, _ := json.Marshal(ErrInternalServerError)
			w.Write([]byte(string(errJson)))
			return
		}
	}
}

func HttpErrorAuthorize(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusUnauthorized)
	errJson, _ := json.Marshal(ErrInvalidCredentials)
	w.Write([]byte(string(errJson)))
	return
}

func handleRoutingError(ctx context.Context, mux *runtime.ServeMux, marshaler runtime.Marshaler, w http.ResponseWriter, r *http.Request, httpStatus int) {
	fmt.Println("handleRoutingError", httpStatus)

	if httpStatus != http.StatusMethodNotAllowed {
		runtime.DefaultRoutingErrorHandler(ctx, mux, marshaler, w, r, httpStatus)
		return
	}

	// Use HTTPStatusError to customize the DefaultHTTPErrorHandler status code
	err := &runtime.HTTPStatusError{
		HTTPStatus: http.StatusInternalServerError,
		Err:        status.Errorf(http.StatusInternalServerError, ErrInternalServerError.Message),
	}

	runtime.DefaultHTTPErrorHandler(ctx, mux, marshaler, w, r, err)
}

func ExtractTokenFromContext(ctx context.Context) (string, error) {
	// The actual implementation depends on how you're passing the token.
	// This is just a simple example that assumes the token is passed as a bearer token in the Authorization header.
	md, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return "", errors.New("no metadata in context")
	}

	authorization := md["authorization"]
	if len(authorization) < 1 {
		return "", errors.New("no authorization header")
	}

	parts := strings.Split(authorization[0], " ")
	if len(parts) < 2 || parts[0] != "Bearer" {
		return "", errors.New("invalid authorization header")
	}

	return parts[1], nil
}
