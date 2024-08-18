package dao

import (
	"github.com/NMCNPM-football/backend/internal/models"
)

type UserDaoInterface interface {
	FindByEmail(email string) (*models.User, error)
	FindByID(id string) (*models.User, error)
	CheckExistEmail(email string) (bool, error)
	Create(user *models.User) error
	DeleteClubOwner(user *models.User, club *models.Club) error
	DeleteClubMember(user *models.User) error
	Update(user *models.User) error
	ListClubMembers(companyId string) ([]*models.User, error)
	RegisterAsMember(user *models.User, club *models.Club) error
	RegisterAsOwner(user *models.User, club *models.Club) error
	FindUsersByClub(clubName string) ([]*models.User, error)
	RegisterAsAdmin(user *models.User) error
	GetAllUsers() ([]*models.User, error)
	UpdatePosition(position *models.User, ID string) error
	DeleteUser(id string) error
}
