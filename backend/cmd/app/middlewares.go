package main

import (
	"context"
	"github.com/NMCNPM-football/backend/common"
	"github.com/NMCNPM-football/backend/internal/must"
	_ "github.com/NMCNPM-football/backend/internal/serializers"
	"github.com/grpc-ecosystem/go-grpc-middleware/v2/interceptors/auth"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"net/http"
	"strings"
)

type Middleware struct {
	TokenSecretKey string
}

func NewMiddleware(tokenSecretKey string) *Middleware {
	return &Middleware{TokenSecretKey: tokenSecretKey}
}

func (m *Middleware) AuthMiddleware(ctx context.Context) (context.Context, error) {
	token, err := auth.AuthFromMD(ctx, "bearer")
	if err != nil {
		return nil, err
	}

	tokenInfo, err := must.ParseToken(token, m.TokenSecretKey)
	if err != nil {
		return nil, status.Error(codes.Unauthenticated, err.Error())
	}

	return context.WithValue(ctx, common.CustomerKey, tokenInfo), nil
}

func (m *Middleware) AuthHttpServerMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		tokenString := r.Header.Get("Authorization")
		if len(tokenString) <= 0 {
			next.ServeHTTP(w, r)
			return
		}

		if len(tokenString) > 6 && strings.ToUpper(tokenString[0:7]) == "BEARER " {
			tokenString = tokenString[7:]
		}

		user, err := must.ParseToken(tokenString, m.TokenSecretKey)
		if err == nil && user != nil {
			ctxWithUser := context.WithValue(r.Context(), common.CustomerKey, user)
			next.ServeHTTP(w, r.WithContext(ctxWithUser))
		} else {
			next.ServeHTTP(w, r)
		}
	})
}
