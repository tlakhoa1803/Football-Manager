package dao

import (
	"github.com/NMCNPM-football/backend/internal/models"
	"github.com/pkg/errors"
	"gorm.io/gorm"
)

type SummaryDao struct {
	db *gorm.DB
}

func NewSummaryDao(db *gorm.DB) *SummaryDao {
	return &SummaryDao{db}
}
func (m *SummaryDao) GetSummaryByClubID(clubID string) (*models.Summary, error) {
	var summary models.Summary
	err := m.db.Where("club_id = ?", clubID).First(&summary).Error
	return &summary, err
}

func (m *SummaryDao) GetSummaryByClubName(clubName string) (*models.Summary, error) {
	var summary models.Summary
	err := m.db.Where("club_name = ?", clubName).First(&summary).Error
	return &summary, err
}

func (m *SummaryDao) UpdateSummary(summary *models.Summary) error {
	return m.db.Save(summary).Error
}

// CreateSummary Implement the CreateSummary method
func (m *SummaryDao) CreateSummary(summary *models.Summary) error {
	if err := m.db.Create(&summary).Error; err != nil {
		return errors.Wrap(err, "c.db.Create")
	}
	return nil
}

func (m *SummaryDao) GetSummaryBySeaSon(season string) ([]*models.Summary, error) {
	var summary []*models.Summary
	if err := m.db.Where("sea_son = ?", season).Find(&summary).Error; err != nil {
		return nil, err
	}
	return summary, nil
}

func (m *SummaryDao) CreateSeason(season *models.SeaSon) error {
	if err := m.db.Create(&season).Error; err != nil {
		return errors.Wrap(err, "c.db.Create")
	}
	return nil
}

func (m *SummaryDao) CreateLeagueRule(leagueRule *models.LeagueRule) error {
	if err := m.db.Create(&leagueRule).Error; err != nil {
		return errors.Wrap(err, "c.db.Create")
	}
	return nil
}

func (m *SummaryDao) GetAllRule() ([]*models.LeagueRule, error) {
	var leagueRule []*models.LeagueRule
	if err := m.db.Find(&leagueRule).Error; err != nil {
		return nil, err
	}
	return leagueRule, nil
}

func (m *SummaryDao) GetLeagueRuleByKey(key string) (*models.LeagueRule, error) {
	var leagueRule models.LeagueRule
	err := m.db.Where("`key` = ?", key).First(&leagueRule).Error
	return &leagueRule, err
}

func (m *SummaryDao) UpdateLeagueRule(leagueRule *models.LeagueRule, key string) error {
	if err := m.db.Where("`key` = ?", key).Updates(&leagueRule).Error; err != nil {
		return errors.Wrap(err, "c.db.Model.Where.Updates")
	}

	return nil
}
