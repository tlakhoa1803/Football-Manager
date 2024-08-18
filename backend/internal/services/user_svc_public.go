package services

import (
	"context"
	"github.com/NMCNPM-football/backend/common"
	"github.com/NMCNPM-football/backend/config"
	"github.com/NMCNPM-football/backend/gen"
	"github.com/NMCNPM-football/backend/internal/dao"
	"github.com/NMCNPM-football/backend/internal/models"
	"github.com/NMCNPM-football/backend/internal/must"
	"github.com/NMCNPM-football/backend/internal/serializers"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"go.uber.org/zap"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/grpc"
	"time"
)

type UserServicePublicInterface interface {
	gen.UserServicePublicServer
}

var _ UserServicePublicInterface = (*UserServicePublic)(nil)

type UserServicePublic struct {
	logger  *zap.Logger
	cfg     *config.Config
	userDao dao.UserDaoInterface
	clubDao dao.ClubDaoInterface
}

func NewUserServicePublic(logger *zap.Logger, cfg *config.Config, userDao dao.UserDaoInterface, clubDao dao.ClubDaoInterface) *UserServicePublic {
	return &UserServicePublic{logger, cfg, userDao, clubDao}
}

func (e *UserServicePublic) RegisterGrpcServer(s *grpc.Server) {
	gen.RegisterUserServicePublicServer(s, e)
}

func (e *UserServicePublic) RegisterHandler(ctx context.Context, mux *runtime.ServeMux, conn *grpc.ClientConn) error {
	err := gen.RegisterUserServicePublicHandler(ctx, mux, conn)
	if err != nil {
		return err
	}

	return nil
}

func (e *UserServicePublic) AuthFuncOverride(ctx context.Context, fullMethodName string) (context.Context, error) {
	return ctx, nil
}

func (e *UserServicePublic) Register(ctx context.Context, in *gen.RegisterRequest) (*gen.RegisterResponse, error) {
	err := common.CheckMail(in.Email)
	if err != nil {
		return nil, must.HandlerError(must.ErrInvalidEmail, e.logger)
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(in.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, must.HandlerError(err, e.logger)
	}

	domainEmail := common.GetDomainEmail(in.Email)
	if domainEmail == "vpf.vn" {
		newAdmin := &models.User{
			Name:            in.Name,
			Email:           in.Email,
			SeaSon:          in.Season,
			Password:        string(hashedPassword),
			Position:        models.Admin,
			IsVerifiedEmail: false,
		}
		newAdmin.Position = models.Admin
		err = e.userDao.RegisterAsAdmin(newAdmin)
		if err != nil {
			return nil, must.HandlerError(err, e.logger)
		}
		return &gen.RegisterResponse{
			ClubName: "Admin manager",
			Message:  "Register as Admin successfully",
		}, nil
	}
	club, err := e.clubDao.FindByDomainAndSeason(domainEmail, in.Season)
	//Truy van club theo domain va season
	if err != nil {
		return nil, must.HandlerError(err, e.logger)
	}
	newUser := &models.User{
		Name:            in.Name,
		Email:           in.Email,
		SeaSon:          in.Season,
		Password:        string(hashedPassword),
		Position:        models.ClubMember,
		IsVerifiedEmail: false,
	}
	clubName := club.NameClub
	usersWithSameClubAndSeason, err := e.userDao.FindUsersByClub(clubName)
	if err != nil {
		return nil, must.HandlerError(err, e.logger)
	}
	// Check if there's already an owner for the domain and season
	var isOwnerExists bool
	for _, user := range usersWithSameClubAndSeason {
		if user.Position == "Owner" {
			isOwnerExists = true
			break
		}
	}

	if !isOwnerExists {
		// If there's no owner, register the user as an owner
		err = e.userDao.RegisterAsOwner(newUser, club)
		if err != nil {
			return nil, must.HandlerError(err, e.logger)
		}
	} else {
		// If there's already an owner, register the user as a member
		err = e.userDao.RegisterAsMember(newUser, club)
		if err != nil {
			return nil, must.HandlerError(err, e.logger)
		}
	}

	registeredUser, err := e.userDao.FindByEmail(newUser.Email)
	if err != nil {
		return nil, must.HandlerError(err, e.logger)
	}

	if registeredUser != nil {
		return nil, must.HandlerError(must.ErrInternalServerError, e.logger)
	}

	return &gen.RegisterResponse{
		ClubName: club.NameClub,
		Message:  "Register successfully",
	}, nil
}

func (e *UserServicePublic) Login(ctx context.Context, in *gen.LoginRequest) (*gen.LoginResponse, error) {
	user, err := e.authenticatorByEmailPassword(in.Email, in.Password)
	if err != nil {
		return nil, must.HandlerError(err, e.logger)
	}

	data := &serializers.UserInfo{
		ID:    user.ID,
		Email: user.Email,
	}

	expire := time.Now().UTC().Add(1 * time.Hour)
	refreshExpire := time.Now().UTC().Add(24 * time.Hour)
	accessToken, refreshToken, err := must.CreateNewWithClaims(data, e.cfg.AuthenticationSecretKey, expire, refreshExpire)
	if err != nil {
		return nil, must.HandlerError(err, e.logger)
	}

	return &gen.LoginResponse{
		Data: &gen.LoginResponse_Data{
			AccessToken:  accessToken,
			RefreshToken: refreshToken,
		},
	}, nil
}

func (e *UserServicePublic) authenticatorByEmailPassword(email, password string) (*models.User, error) {

	user, _ := e.userDao.FindByEmail(email)
	if user != nil {
		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
			return nil, must.ErrInvalidPassword
		}
		return user, nil
	}

	return nil, must.ErrEmailNotExists
}

//func (e *UserServicePublic) DeactivateProfile(ctx context.Context, in *gen.DeactivateProfileRequest) (*gen.SuccessMessageResponse, error) {
//	user, err := e.authenticatorByEmailPassword(in.Email, in.Password)
//	if err != nil {
//		return nil, must.HandlerError(err, e.logger)
//	}
//
//	company, err := e.companyDao.FindClubByID(user.CompanyID)
//	if err != nil {
//		return nil, must.HandlerError(err, e.logger)
//	}
//
//	if company == nil {
//		return nil, must.HandlerError(must.ErrInternalServerError, e.logger)
//	}
//
//	if user.IsOwner() {
//		err = e.userDao.DeleteCompanyOwner(user, company)
//		if err != nil {
//			return nil, must.HandlerError(err, e.logger)
//		}
//	} else {
//		err = e.userDao.DeleteCompanyMember(user)
//		if err != nil {
//			return nil, must.HandlerError(err, e.logger)
//		}
//	}
//
//	return &gen.SuccessMessageResponse{
//		Data: &gen.SuccessMessageResponseSuccessMessage{
//			Message: "Delete profile successfully",
//		},
//	}, nil
//}

func (e *UserServicePublic) DeactivateProfile(ctx context.Context, in *gen.DeactivateProfileRequest) (*gen.SuccessMessageResponse, error) {
	return nil, nil
}

//func (e *UserServicePublic) VerifyEmail(ctx context.Context, in *gen.TokenRequest) (*gen.SuccessMessageResponse, error) {
//	userVerify, err := e.userDao.FindEmailVerifyByToken(in.Token)
//	if err != nil {
//		return nil, must.HandlerError(err, e.logger)
//	}
//
//	if userVerify == nil {
//		return nil, must.HandlerError(must.ErrInvalidToken, e.logger)
//	}
//
//	if userVerify.ExpiredAt < time.Now().UTC().Unix() {
//		return nil, must.HandlerError(must.ErrTokenExpired, e.logger)
//	}
//
//	user, err := e.userDao.FindByEmail(userVerify.Email)
//	if err != nil {
//		return nil, must.HandlerError(err, e.logger)
//	}
//
//	if user == nil {
//		return nil, must.HandlerError(must.ErrEmailNotExists, e.logger)
//	}
//
//	if user.IsVerifiedEmail {
//		return nil, must.HandlerError(must.ErrEmailAlreadyVerified, e.logger)
//	}
//
//	user.IsVerifiedEmail = true
//
//	err = e.userDao.VerifyEmail(userVerify)
//	if err != nil {
//		return nil, must.HandlerError(err, e.logger)
//	}
//
//	return &gen.SuccessMessageResponse{
//		Data: &gen.SuccessMessageResponseSuccessMessage{
//			Message: "Verify email successfully",
//		},
//	}, nil
//}

func (e *UserServicePublic) VerifyEmail(ctx context.Context, in *gen.TokenRequest) (*gen.SuccessMessageResponse, error) {
	return nil, nil
}
