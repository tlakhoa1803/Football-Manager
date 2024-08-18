package models

import (
	"github.com/NMCNPM-football/backend/common"
)

type User struct {
	Base
	Name            string `gorm:"size:50"`
	Email           string `gorm:"uniqueIndex:idx_email;size:50;not null"`
	Phone           string `gorm:"size:50"`
	Club            string `gorm:"size:50"`
	Address         string `gorm:"size:200"`
	Password        string `gorm:"size:100"`
	ClubID          string `gorm:"size:50"`
	Position        string `gorm:"size:50"`
	IsVerifiedEmail bool   `gorm:"index:idx_is_verified_email, default:true"`
	SeaSon          string `gorm:"size:50"`
	UpdatedBy       string `gorm:"size:50"`
	DeletedBy       string `gorm:"size:50"`
}

const (
	CLubOwner   = "Owner"
	ClubManager = "Manager"
	ClubMember  = "Member"
	Admin       = "Admin"
)

var (
	MemberPermission = []string{
		common.ServiceGetClubInfo,
		common.ServiceListClubPlayers,
		common.ServiceListClubPlatforms,
	}
)

func (u *User) IsOwner() bool {
	return u.Position == CLubOwner
}

func (u *User) CheckPermission(MethodName string) bool {
	if u.Position == CLubOwner {
		return true
	}
	if u.Position == ClubManager { // Changed from CLubOwner to ClubManager
		for _, v := range MemberPermission {
			if v == MethodName {
				return true
			}
		}
	}
	return false
}
