package services

import (
	"context"
	"fmt"
	"github.com/NMCNPM-football/backend/config"
	"github.com/NMCNPM-football/backend/gen"
	"github.com/NMCNPM-football/backend/internal/dao"
	"github.com/NMCNPM-football/backend/internal/models"
	"github.com/NMCNPM-football/backend/internal/must"
	"github.com/NMCNPM-football/backend/internal/serializers"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"go.uber.org/zap"
	"google.golang.org/grpc"
	"time"
)

type UserServiceInterface interface {
	gen.UserServiceServer
}

var _ UserServiceInterface = (*UserService)(nil)

type UserService struct {
	AbstractService
	logger  *zap.Logger
	cfg     *config.Config
	userDao dao.UserDaoInterface
	clubDao dao.ClubDaoInterface
}

func (e *UserService) GetUserById(ctx context.Context, request *gen.GetUserByIdRequest) (*gen.GetProfileResponse, error) {
	user, err := e.userFromContext(ctx, e.userDao)
	if err != nil {
		return nil, fmt.Errorf("failed to get user from context: %w", err)
	}
	if user.Position != "Admin" {
		return nil, fmt.Errorf("access denied: user is not an admin")
	}

	user, err = e.userDao.FindByID(request.Id)
	if err != nil {
		return nil, fmt.Errorf("failed to get user: %w", err)
	}
	// Convert the user into the format required by the response
	responseData := &gen.GetProfileResponse_Data{
		Name:     user.Name,
		Email:    user.Email,
		Phone:    user.Phone,
		Address:  user.Address,
		ClubName: user.Club,
		Position: user.Position,
	}

	// Return the response
	return &gen.GetProfileResponse{
		Data: responseData,
	}, nil
}

func (e *UserService) GetUsers(ctx context.Context, request *gen.EmptyRequest) (*gen.GetUsersResponse, error) {
	user, err := e.userFromContext(ctx, e.userDao)
	if err != nil {
		return nil, fmt.Errorf("failed to get user from context: %w", err)
	}
	if user.Position != "Admin" {
		return nil, fmt.Errorf("access denied: user is not an admin")
	}
	users, err := e.userDao.GetAllUsers()
	if err != nil {
		return nil, fmt.Errorf("failed to get users: %w", err)
	}

	// Initialize a slice to hold the response data
	var responseData []*gen.GetUsersResponse_Data

	// Loop through the users and convert them into the format required by the response
	for _, user := range users {
		responseData = append(responseData, &gen.GetUsersResponse_Data{
			Name:     user.Name,
			Email:    user.Email,
			Phone:    user.Phone,
			Address:  user.Address,
			ClubName: user.Club,
			Position: user.Position,
			Id:       user.ID,
		})
	}

	// Return the response
	return &gen.GetUsersResponse{
		Data: responseData,
	}, nil
}

func (e *UserService) Logout(ctx context.Context, request *gen.LogoutRequest) (*gen.LogoutResponse, error) {
	//TODO implement me
	return nil, nil
}

func NewUserService(logger *zap.Logger, cfg *config.Config, userDao dao.UserDaoInterface, clubDao dao.ClubDaoInterface) *UserService {
	return &UserService{logger: logger, cfg: cfg, userDao: userDao, clubDao: clubDao}
}

func (e *UserService) RegisterGrpcServer(s *grpc.Server) {
	gen.RegisterUserServiceServer(s, e)
}

func (e *UserService) RegisterHandler(ctx context.Context, mux *runtime.ServeMux, conn *grpc.ClientConn) error {
	err := gen.RegisterUserServiceHandler(ctx, mux, conn)
	if err != nil {
		return err
	}

	return nil
}

func (e *UserService) RefreshToken(ctx context.Context, in *gen.EmptyRequest) (*gen.LoginResponse, error) {
	tokenInfo, err := e.userFromContext(ctx, e.userDao)
	if err != nil {
		return nil, must.HandlerError(err, e.logger)
	}

	data := &serializers.UserInfo{
		Email: tokenInfo.Email,
	}

	expire := time.Now().Add(2 * time.Hour)
	refreshExpire := time.Now().Add(24 * time.Hour)
	accessToken, refreshToken, err := must.CreateNewWithClaims(data, e.cfg.AuthenticationSecretKey, expire, refreshExpire)
	if err != nil {
		return nil, must.HandlerError(err, e.logger)
	}

	//projectId, err := e.projectDao.DefaultProject(tokenInfo.ID)
	//if err != nil {
	//	return nil, must.HandlerError(err, e.logger)
	//}
	//
	//if projectId == "" {
	//	return nil, must.HandlerError(must.ErrInternalServerError, e.logger)
	//}

	return &gen.LoginResponse{
		Data: &gen.LoginResponse_Data{
			AccessToken:  accessToken,
			RefreshToken: refreshToken,
			//ProjectId:    projectId,
		},
	}, nil
}

func (e *UserService) GetProfile(ctx context.Context, in *gen.EmptyRequest) (*gen.GetProfileResponse, error) {

	user, err := e.userFromContext(ctx, e.userDao)
	if err != nil {
		return nil, must.HandlerError(err, e.logger)
	}

	return &gen.GetProfileResponse{
		Data: &gen.GetProfileResponse_Data{
			Email:    user.Email,
			Name:     user.Name,
			Phone:    user.Phone,
			Address:  user.Address,
			ClubName: user.Club,
			Position: user.Position,
			ClubId:   user.ClubID,
			SeaSon:   user.SeaSon,
		},
	}, nil
}

func (e *UserService) UpdateProfile(ctx context.Context, in *gen.UpdateProfileRequest) (*gen.SuccessMessageResponse, error) {
	user, err := e.userFromContext(ctx, e.userDao)
	if err != nil {
		return nil, must.HandlerError(err, e.logger)
	}

	newUser := &models.User{
		Email:   user.Email,
		Name:    in.Name,
		Phone:   in.Phone,
		Address: in.Address,
	}

	err = e.userDao.Update(newUser)
	if err != nil {
		return nil, must.HandlerError(err, e.logger)
	}

	return &gen.SuccessMessageResponse{
		Data: &gen.SuccessMessageResponseSuccessMessage{
			Message: "Update successfully",
		},
	}, nil
}

func (e *UserService) UpdatePosition(ctx context.Context, in *gen.UpdatePositionRequest) (*gen.SuccessMessageResponse, error) {
	user, err := e.userFromContext(ctx, e.userDao)
	if err != nil {
		return nil, fmt.Errorf("failed to get user from context: %w", err)
	}
	if user.Position != "Admin" {
		return nil, fmt.Errorf("access denied: user is not an admin")
	}

	customer, err := e.userDao.FindByID(in.Id)
	if err != nil {
		return nil, must.HandlerError(err, e.logger)
	}
	updateCustomer := &models.User{
		Position: in.Position,
	}

	err = e.userDao.UpdatePosition(updateCustomer, customer.ID)
	if err != nil {
		return nil, must.HandlerError(err, e.logger)
	}

	return &gen.SuccessMessageResponse{
		Data: &gen.SuccessMessageResponseSuccessMessage{
			Message: "Update successfully",
		},
	}, nil
}
func (e *UserService) DeleteUser(ctx context.Context, request *gen.DeleteUserRequest) (*gen.SuccessMessageResponse, error) {
	// Use the userDao to delete the User from the database
	err := e.userDao.DeleteUser(request.Id)
	if err != nil {
		return nil, fmt.Errorf("failed to delete user: %w", err)
	}

	// If the deletion is successful, return a SuccessMessageResponse with a success message
	return &gen.SuccessMessageResponse{
		Data: &gen.SuccessMessageResponseSuccessMessage{
			Message: "User deleted successfully",
		},
	}, nil
}
