package dao

import (
	"github.com/NMCNPM-football/backend/internal/models"
)

type ClubDaoInterface interface {
	FindClubByID(id string) (*models.Club, error)
	FindByDomain(domain string) (*models.Club, error)
	FindByDomainAndSeason(domain string, season string) (*models.Club, error)
	GetClubByID(clubID string) (*models.Club, error)
	GetPLayerByID(playerID string) (*models.Player, error)
	UpdateClub(club *models.Club, clubID string) error
	UpdatePlayer(player *models.Player, playerID string) error
	GetAllClubs() ([]*models.Club, error)
	GetAllPlayersInClub(clubID string) ([]*models.Player, error)
	DeletePlayer(playerID string) error
	CreatePlayer(player *models.Player) error
	FindClubByNameAndSeaSon(name string, season string) (*models.Club, error)
	CreateStadium(stadium *models.Stadium) error
	GetAllClubsBySeaSon(season string) ([]*models.Club, error)
	GetStadiumByClubID(clubID string) (*models.Stadium, error)
	GetCoachByClubID(clubID string) (*models.Coach, error)
	CreateClub(club *models.Club) error
	CreateCoach(coach *models.Coach) error
	UpdateCoach(coach *models.Coach, coachID string) error
	GetCoachByID(coachID string) (*models.Coach, error)
	GetAllCoaches() ([]*models.Coach, error)
	GetAllCoachesByClubID(clubID string) ([]*models.Coach, error)
	DeleteCoach(coachID string) error
}
