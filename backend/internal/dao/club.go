package dao

import (
	"github.com/NMCNPM-football/backend/internal/models"
	"github.com/pkg/errors"
	"gorm.io/gorm"
)

type ClubDao struct {
	db *gorm.DB
}

func NewClubDao(db *gorm.DB) *ClubDao {
	return &ClubDao{db}
}

func (m *ClubDao) FindClubByID(id string) (*models.Club, error) {
	var club *models.Club

	if err := m.db.Where("id = ?", id).First(&club).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}

		return nil, errors.Wrap(err, "u.db.Where.First")
	}

	return club, nil
}

func (m *ClubDao) FindByDomain(domain string) (*models.Club, error) {
	var club *models.Club

	if err := m.db.Where("domain_email = ?", domain).First(&club).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}

		return nil, errors.Wrap(err, "u.db.Where.First")
	}
	return club, nil
}

func (m *ClubDao) FindByDomainAndSeason(domainEmail string, season string) (*models.Club, error) {
	var club *models.Club
	err := m.db.Where("domain_email = ? AND sea_son = ?", domainEmail, season).First(&club).Error
	if err != nil {
		return nil, err
	}
	return club, nil
}

func (m *ClubDao) GetClubByID(clubID string) (*models.Club, error) {
	var club models.Club
	if err := m.db.Where("id = ?", clubID).First(&club).Error; err != nil {
		return nil, err
	}
	return &club, nil
}

func (m *ClubDao) UpdateClub(club *models.Club, clubID string) error {
	if err := m.db.Where("id = ?", clubID).Updates(&club).Error; err != nil {
		return errors.Wrap(err, "c.db.Model.Where.Updates")
	}

	return nil
}

func (m *ClubDao) GetPLayerByID(playerID string) (*models.Player, error) {
	var player models.Player
	if err := m.db.Where("id = ?", playerID).First(&player).Error; err != nil {
		return nil, err
	}
	return &player, nil
}

func (m *ClubDao) UpdatePlayer(player *models.Player, playerID string) error {
	if err := m.db.Where("id = ?", playerID).Updates(&player).Error; err != nil {
		return errors.Wrap(err, "c.db.Model.Where.Updates")
	}

	return nil
}

func (m *ClubDao) GetAllClubs() ([]*models.Club, error) {
	var clubs []*models.Club
	if err := m.db.Find(&clubs).Error; err != nil {
		return nil, err
	}
	return clubs, nil
}
func (m *ClubDao) GetAllClubsBySeaSon(season string) ([]*models.Club, error) {
	var clubs []*models.Club
	if err := m.db.Where("sea_son = ?", season).Find(&clubs).Error; err != nil {
		return nil, err
	}
	return clubs, nil
}
func (m *ClubDao) GetAllPlayersInClub(clubID string) ([]*models.Player, error) {
	var players []*models.Player
	if err := m.db.Where("club_id = ?", clubID).Find(&players).Error; err != nil {
		return nil, err
	}
	return players, nil
}

func (m *ClubDao) DeletePlayer(playerID string) error {
	if err := m.db.Where("id = ?", playerID).Delete(&models.Player{}).Error; err != nil {
		return errors.Wrap(err, "c.db.Model.Where.Delete")
	}

	return nil
}

func (m *ClubDao) CreatePlayer(player *models.Player) error {
	if err := m.db.Create(&player).Error; err != nil {
		return errors.Wrap(err, "c.db.Create")
	}

	return nil
}

func (m *ClubDao) FindClubByNameAndSeaSon(name string, season string) (*models.Club, error) {
	var club *models.Club

	if err := m.db.Where("name_club = ? AND sea_son = ?", name, season).First(&club).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}

		return nil, errors.Wrap(err, "u.db.Where.First")
	}

	return club, nil
}

func (m *ClubDao) CreateStadium(stadium *models.Stadium) error {
	if err := m.db.Create(&stadium).Error; err != nil {
		return errors.Wrap(err, "c.db.Create")
	}

	return nil
}

func (m *ClubDao) GetStadiumByClubID(clubID string) (*models.Stadium, error) {
	var stadium models.Stadium
	if err := m.db.Where("club_id = ?", clubID).First(&stadium).Error; err != nil {
		return nil, err
	}
	return &stadium, nil
}

func (m *ClubDao) GetCoachByClubID(clubID string) (*models.Coach, error) {
	var coach models.Coach
	if err := m.db.Where("club_id = ?", clubID).First(&coach).Error; err != nil {
		return nil, err
	}
	return &coach, nil
}

func (m *ClubDao) CreateClub(club *models.Club) error {
	// Find the season with the given name
	var season models.SeaSon
	if err := m.db.Where("sea_son = ?", club.SeaSon).First(&season).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return errors.New("season not found")
		}
		return errors.Wrap(err, "m.db.Where.First")
	}

	// Set the SeaSonID of the club to the ID of the found season
	club.SeaSonID = season.ID

	// Create the club
	if err := m.db.Create(&club).Error; err != nil {
		return errors.Wrap(err, "m.db.Create")
	}

	return nil
}

func (m *ClubDao) CreateCoach(coach *models.Coach) error {
	if err := m.db.Create(&coach).Error; err != nil {
		return errors.Wrap(err, "c.db.Create")
	}

	return nil
}

func (m *ClubDao) UpdateCoach(coach *models.Coach, coachID string) error {
	if err := m.db.Where("id = ?", coachID).Updates(&coach).Error; err != nil {
		return errors.Wrap(err, "c.db.Model.Where.Updates")
	}

	return nil
}

func (m *ClubDao) GetCoachByID(coachID string) (*models.Coach, error) {
	var coach models.Coach
	if err := m.db.Where("id = ?", coachID).First(&coach).Error; err != nil {
		return nil, err
	}
	return &coach, nil
}
func (m *ClubDao) GetAllCoaches() ([]*models.Coach, error) {
	var coaches []*models.Coach
	if err := m.db.Find(&coaches).Error; err != nil {
		return nil, err
	}
	return coaches, nil
}

func (m *ClubDao) GetAllCoachesByClubID(clubID string) ([]*models.Coach, error) {
	var coaches []*models.Coach
	if err := m.db.Where("club_id = ?", clubID).Find(&coaches).Error; err != nil {
		return nil, err
	}
	return coaches, nil
}

func (m *ClubDao) DeleteCoach(coachID string) error {
	if err := m.db.Where("id = ?", coachID).Delete(&models.Coach{}).Error; err != nil {
		return errors.Wrap(err, "c.db.Model.Where.Delete")
	}

	return nil
}
