package dao

import (
	"github.com/NMCNPM-football/backend/internal/models"
	"github.com/pkg/errors"
	"gorm.io/gorm"
	"strings"
)

type UserDao struct {
	db *gorm.DB
}

func NewUserDao(db *gorm.DB) *UserDao {
	return &UserDao{db}
}

func (u *UserDao) FindByEmail(email string) (*models.User, error) {
	var user models.User

	if err := u.db.Where("email = ? AND is_verified_email = ?", email, true).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, errors.Wrap(err, "u.db.Where.First")
	}
	return &user, nil
}

func (u *UserDao) FindByID(id string) (*models.User, error) {
	var user models.User

	if err := u.db.Where("id = ?", id).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, errors.Wrap(err, "u.db.Where.First")
	}
	return &user, nil
}

func (u *UserDao) CheckExistEmail(email string) (bool, error) {
	var user *models.User

	if err := u.db.Unscoped().Where("email = ?", email).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return false, nil
		}
		return false, errors.Wrap(err, "u.db.Where.First")
	}

	return true, nil
}

func (u *UserDao) ListClubMembers(companyId string) ([]*models.User, error) {
	var users []*models.User

	if err := u.db.Where("company_id = ?", companyId).Find(&users).Error; err != nil {
		return nil, errors.Wrap(err, "u.db.Where.Find")
	}

	return users, nil
}

func (u *UserDao) Create(user *models.User) error {

	if err := u.db.Create(&user).Error; err != nil {
		if strings.Contains(err.Error(), "Duplicate entry") {
			err = u.UnDeleteByEmail(user)
			if err != nil {
				return err
			}
		}
		return errors.Wrap(err, "u.db.Create")
	}

	return nil
}

func (u *UserDao) Update(user *models.User) error {
	if err := u.db.Where("email = ?", user.Email).Updates(&user).Error; err != nil {
		return errors.Wrap(err, "u.db.Where.Updates")
	}

	return nil
}

func (u *UserDao) UnDeleteByEmail(user *models.User) error {
	u.db.Unscoped().Model(&models.User{}).Where("email = ?", user.Email).Update("deleted_at", nil)
	if err := u.db.Unscoped().Where("email = ?", user.Email).Updates(&user).Error; err != nil {
		return errors.Wrap(err, "u.db.Unscoped.Where.Updates")
	}

	return nil
}

func (u *UserDao) GetAllUsers() ([]*models.User, error) {
	var users []*models.User
	if err := u.db.Find(&users).Error; err != nil {
		return nil, err
	}
	return users, nil
}

func (u *UserDao) UpdatePosition(position *models.User, ID string) error {
	if err := u.db.Where("id = ?", ID).Updates(&position).Error; err != nil {
		return errors.Wrap(err, "c.db.Model.Where.Updates")
	}

	return nil
}

func (u *UserDao) DeleteUser(id string) error {
	if err := u.db.Where("id = ?", id).Delete(&models.User{}).Error; err != nil {
		return errors.Wrap(err, "u.db.Where.Delete")
	}
	return nil
}
