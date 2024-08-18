package dao

import (
	"fmt"
	"github.com/NMCNPM-football/backend/internal/models"
	"github.com/pkg/errors"
	"gorm.io/gorm"
)

type MatchDao struct {
	db *gorm.DB
}

func NewMatchDao(db *gorm.DB) *MatchDao {
	return &MatchDao{db}
}

func (m *MatchDao) CreateMatchCalendar(calendar *models.Matches) error {
	if err := m.db.Create(&calendar).Error; err != nil {
		return errors.Wrap(err, "c.db.Create")
	}
	return nil
}

func (m *MatchDao) GetMatchCalendarByID(id string) (*models.Matches, error) {
	var matchCalendars *models.Matches
	if err := m.db.Where("id = ?", id).Find(&matchCalendars).Error; err != nil {
		return nil, err
	}
	return matchCalendars, nil
}

func (m *MatchDao) UpdateMatchCalendar(match *models.Matches, matchID string) error {
	if err := m.db.Where("id = ?", matchID).Updates(&match).Error; err != nil {
		return errors.Wrap(err, "c.db.Model.Where.Updates")
	}

	return nil
}
func (m *MatchDao) GetAllMatchCalendars() ([]*models.Matches, error) {
	var matchCalendars []*models.Matches
	if err := m.db.Find(&matchCalendars).Error; err != nil {
		return nil, err
	}
	return matchCalendars, nil
}

func (m *MatchDao) GetAllMatchCalendarsWithStatus(status string) ([]*models.Matches, error) {
	var matchCalendars []*models.Matches
	if err := m.db.Where("status = ?", status).Find(&matchCalendars).Error; err != nil {
		return nil, err
	}
	return matchCalendars, nil
}

func (m *MatchDao) GetProgressScoresByMatchID(matchID string) ([]*models.ProgressScore, error) {
	var progress []*models.ProgressScore
	if err := m.db.Where("match_id = ?", matchID).Find(&progress).Error; err != nil {
		return nil, err
	}
	return progress, nil
}
func (m *MatchDao) GetProgressScoresByMatchClubID(matchID string, clubName string) ([]*models.ProgressScore, error) {
	var progress []*models.ProgressScore
	if err := m.db.Where("match_id = ? AND club_name = ?", matchID, clubName).Find(&progress).Error; err != nil {
		return nil, err
	}
	return progress, nil
}

func (m *MatchDao) GetProgressCardByMatchClubID(matchID string, clubName string) ([]*models.ProgressCard, error) {
	var progress []*models.ProgressCard
	if err := m.db.Where("match_id = ? AND club_name = ?", matchID, clubName).Find(&progress).Error; err != nil {
		return nil, err
	}
	return progress, nil
}

func (m *MatchDao) GetProgressCardByMatchID(matchID string) ([]*models.ProgressCard, error) {
	var progress []*models.ProgressCard
	if err := m.db.Where("match_id = ?", matchID).Find(&progress).Error; err != nil {
		return nil, err
	}
	return progress, nil
}

func (m *MatchDao) GetAllMatchResultsByRound(round string) ([]*models.Matches, error) {
	var matchCalendars []*models.Matches
	if err := m.db.Where("match_round = ?", round).Find(&matchCalendars).Error; err != nil {
		return nil, err
	}
	return matchCalendars, nil
}

func (m *MatchDao) GetAllMatchCalendarsByRound(round string) ([]*models.Matches, error) {
	var matchCalendars []*models.Matches
	if err := m.db.Where("match_round = ?", round).Find(&matchCalendars).Error; err != nil {
		return nil, err
	}
	return matchCalendars, nil
}

func (m *MatchDao) CreateProgressScore(score *models.ProgressScore) error {
	if err := m.db.Create(&score).Error; err != nil {
		return errors.Wrap(err, "c.db.Create")
	}
	return nil
}

func (m *MatchDao) CreateResultScore(result *models.Results) error {
	if err := m.db.Create(&result).Error; err != nil {
		return err
	}
	return nil
}

func (m *MatchDao) CreateProgressCard(card *models.ProgressCard) error {
	if err := m.db.Create(&card).Error; err != nil {
		return err
	}
	return nil
}

func (m *MatchDao) CountGoals(matchID string, clubName string) (int, error) {
	var count int
	// Write the SQL query to count the goals
	query := `SELECT COUNT(*) FROM progress_scores WHERE match_id = ? AND club_name = ? AND status = 'no'`

	// Execute the query
	err := m.db.Raw(query, matchID, clubName).Scan(&count).Error
	if err != nil {
		return 0, err
	}

	return count, nil
}

func (m *MatchDao) CountCard(matchID, clubName string) (int, int, error) {
	var yellowCardCount, redCardCount int

	// Query to count the number of yellow cards
	yellowCardQuery := `SELECT COUNT(*) FROM progress_cards WHERE match_id = ? AND club_name = ? AND card_type = 'LT01' AND status = 'no'`
	err := m.db.Raw(yellowCardQuery, matchID, clubName).Scan(&yellowCardCount).Error
	if err != nil {
		return 0, redCardCount, fmt.Errorf("failed to count yellow cards: %w", err)
	}

	// Query to count the number of red cards
	redCardQuery := `SELECT COUNT(*) FROM progress_cards WHERE match_id = ? AND club_name = ? AND card_type = 'LT02' AND status = 'no'`
	err = m.db.Raw(redCardQuery, matchID, clubName).Scan(&redCardCount).Error
	if err != nil {
		return yellowCardCount, 0, fmt.Errorf("failed to count red cards: %w", err)
	}

	return yellowCardCount, redCardCount, nil
}

func (m *MatchDao) GetMatchResultByID(matchID string) (*models.Results, error) {
	var matchResults *models.Results
	if err := m.db.Where("match_id = ?", matchID).First(&matchResults).Error; err != nil {
		return nil, err
	}
	return matchResults, nil
}

func (m *MatchDao) GetAllMatchResults() ([]*models.Results, error) {
	var results []*models.Results
	if err := m.db.Find(&results).Error; err != nil {
		return nil, err
	}
	return results, nil
}

func (m *MatchDao) GetAllMatchDone() ([]*models.ProgressScore, error) {
	var matchCalendars []*models.ProgressScore
	if err := m.db.Find(&matchCalendars).Error; err != nil {
		return nil, err
	}
	return matchCalendars, nil
}

func (m *MatchDao) GetAllMatchResultsNotDone() ([]*models.Results, error) {
	var results []*models.Results

	// Query the database for match results where the status is "not done"
	err := m.db.Where("status = ?", "not done").Find(&results).Error
	if err != nil {
		return nil, err
	}

	return results, nil
}

func (m *MatchDao) GetAllMatchResultsByClubID(clubID string) ([]*models.Results, error) {
	var results []*models.Results
	err := m.db.Where("club_id = ? AND status = ?", clubID, "not done").Find(&results).Error
	if err != nil {
		return nil, err
	}

	return results, nil
}

func (m *MatchDao) GetAllMatchResultsBySeaSon(season string) ([]*models.Results, error) {
	var results []*models.Results
	err := m.db.Where("status = ? AND sea_son = ?", "not done", season).Find(&results).Error
	if err != nil {
		return nil, err
	}

	return results, nil
}

func (m *MatchDao) UpdateMatch(match *models.Results) error {
	if err := m.db.Save(match).Error; err != nil {
		return err
	}
	return nil
}

func (m *MatchDao) UpdateMatchStatus(matchID string, status string) error {
	if err := m.db.Model(&models.Matches{}).Where("id = ?", matchID).Update("match_status", status).Error; err != nil {
		return err
	}
	return nil
}

func (m *MatchDao) UpdateAllProgressScoreStatus(matchID string, status string) error {
	// This will update the 'status' field of all ProgressScore records with the given matchID
	if err := m.db.Model(&models.ProgressScore{}).Where("match_id = ?", matchID).Update("status", status).Error; err != nil {
		return err
	}
	return nil
}

func (m *MatchDao) UpdateAllProgressCardStatus(matchID string, status string) error {
	// This will update the 'status' field of all ProgressCard records with the given matchID
	if err := m.db.Model(&models.ProgressCard{}).Where("match_id = ?", matchID).Update("status", status).Error; err != nil {
		return err
	}
	return nil
}

func (m *MatchDao) CreateGoalType(goalType *models.GoalType) error {
	if err := m.db.Create(&goalType).Error; err != nil {
		return err
	}
	return nil
}

func (m *MatchDao) GetGoalTypeByID(id string) (*models.GoalType, error) {
	var goalType *models.GoalType
	if err := m.db.Where("id = ?", id).First(&goalType).Error; err != nil {
		return nil, err
	}
	return goalType, nil
}

func (m *MatchDao) GetAllGoalType() ([]*models.GoalType, error) {
	var goalTypes []*models.GoalType
	if err := m.db.Find(&goalTypes).Error; err != nil {
		return nil, err
	}
	return goalTypes, nil
}

func (m *MatchDao) CreateCardType(cardType *models.CardType) error {
	if err := m.db.Create(&cardType).Error; err != nil {
		return err
	}
	return nil
}

func (m *MatchDao) GetAllCardType() ([]*models.CardType, error) {
	var cardTypes []*models.CardType
	if err := m.db.Find(&cardTypes).Error; err != nil {
		return nil, err
	}
	return cardTypes, nil
}

func (m *MatchDao) DeleteGoalTypeByID(id string) error {
	if err := m.db.Where("goal_type_id = ?", id).Delete(&models.GoalType{}).Error; err != nil {
		return err
	}
	return nil
}
func (m *MatchDao) DeleteCardTypeByID(id string) error {
	if err := m.db.Where("card_type_id = ?", id).Delete(&models.CardType{}).Error; err != nil {
		return err
	}
	return nil
}
