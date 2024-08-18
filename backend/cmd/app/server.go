package main

import (
	"context"
	"github.com/NMCNPM-football/backend/config"
	"github.com/NMCNPM-football/backend/internal/dao"
	"github.com/NMCNPM-football/backend/internal/must"
	"github.com/NMCNPM-football/backend/internal/services"
	"github.com/NMCNPM-football/backend/migration"
	"github.com/allegro/bigcache/v3"
	"github.com/grpc-ecosystem/go-grpc-middleware/v2/interceptors/auth"
	_ "google.golang.org/genproto/googleapis/cloud/bigquery/migration/v2"
	"google.golang.org/grpc"
	"log"
	"net/http"
	"time"
)

func main() {
	var ctx = context.TODO()
	cfg := config.ReadConfigAndArg()

	logger, sentry, err := must.NewLogger(cfg.SentryDSN, cfg.ServiceName+"-app")
	if err != nil {
		log.Fatalf("logger: %v", err)
	}

	defer logger.Sync()
	defer sentry.Flush(2 * time.Second)

	db := must.ConnectDb(cfg.Db)
	err = migration.Migration(db)
	if err != nil {
		log.Fatalf("migration: %v", err)
	}

	//dao
	middlewareAuth := NewMiddleware(cfg.AuthenticationPubSecretKey)
	userDao := dao.NewUserDao(db)
	clubDao := dao.NewClubDao(db)
	matchDao := dao.NewMatchDao(db)
	summaryDao := dao.NewSummaryDao(db)

	opt := []grpc.ServerOption{
		//grpc
		grpc.StreamInterceptor(auth.StreamServerInterceptor(middlewareAuth.AuthMiddleware)),
		grpc.UnaryInterceptor(auth.UnaryServerInterceptor(middlewareAuth.AuthMiddleware)),
	}

	optHttpServer := []func(http.Handler) http.Handler{
		middlewareAuth.AuthHttpServerMiddleware,
	}

	//userService := services.NewUserService(logger, cfg, userDao)
	_, _ = bigcache.New(context.Background(), bigcache.DefaultConfig(10*time.Minute))

	must.NewServer(
		ctx,
		cfg,
		opt,
		optHttpServer,
		services.NewUserService(
			logger,
			cfg,
			userDao,
			clubDao,
		),
		services.NewUserServicePublic(
			logger,
			cfg,
			userDao,
			clubDao,
		),
		services.NewClubService(
			logger,
			cfg,
			userDao,
			clubDao,
		),
		services.NewClubServicePublic(
			logger,
			cfg,
			userDao,
			clubDao,
		),
		services.NewMatchService(
			logger,
			cfg,
			userDao,
			clubDao,
			matchDao,
		),
		services.NewMatchServicePublic(
			logger,
			cfg,
			userDao,
			clubDao,
			matchDao,
			summaryDao,
		),
		services.NewSummaryService(
			logger,
			cfg,
			userDao,
			clubDao,
			matchDao,
			summaryDao,
		),
	)

}
