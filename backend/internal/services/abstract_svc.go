package services

import (
	"context"
	"github.com/NMCNPM-football/backend/common"
	"github.com/NMCNPM-football/backend/internal/dao"
	"github.com/NMCNPM-football/backend/internal/models"
	"github.com/NMCNPM-football/backend/internal/must"
	"github.com/NMCNPM-football/backend/internal/serializers"
)

type AbstractService struct {
}

func (e *AbstractService) userFromContext(c context.Context, userDao dao.UserDaoInterface) (*models.User, error) {
	auth := c.Value(common.CustomerKey)
	if auth == nil {
		return nil, must.ErrInvalidCredentials
	}

	userVal := auth.(*serializers.UserInfo)

	user, err := userDao.FindByEmail(userVal.Email)
	if err != nil || user == nil {
		return nil, must.ErrInvalidCredentials
	}

	return user, nil
}
