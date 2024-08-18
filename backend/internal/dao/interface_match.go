package dao

import "github.com/NMCNPM-football/backend/internal/models"

type MatchDaoInterface interface {
	CreateMatchCalendar(calendar *models.Matches) error
	GetMatchCalendarByID(id string) (*models.Matches, error)
	UpdateMatchCalendar(match *models.Matches, matchID string) error
	GetAllMatchCalendars() ([]*models.Matches, error)
	GetAllMatchCalendarsWithStatus(status string) ([]*models.Matches, error)
	CreateProgressScore(score *models.ProgressScore) error
	CreateProgressCard(card *models.ProgressCard) error
	CountGoals(matchID string, clubName string) (int, error)
	CountCard(matchID, clubName string) (int, int, error)
	CreateResultScore(result *models.Results) error
	GetMatchResultByID(matchID string) (*models.Results, error)
	GetAllMatchResults() ([]*models.Results, error)
	GetAllMatchDone() ([]*models.ProgressScore, error)
	GetAllMatchResultsNotDone() ([]*models.Results, error)
	GetAllMatchResultsByClubID(clubID string) ([]*models.Results, error)
	GetAllMatchResultsBySeaSon(season string) ([]*models.Results, error)
	UpdateMatch(match *models.Results) error
	GetAllMatchResultsByRound(round string) ([]*models.Matches, error)
	GetProgressScoresByMatchID(matchID string) ([]*models.ProgressScore, error)
	GetProgressCardByMatchID(matchID string) ([]*models.ProgressCard, error)
	GetProgressScoresByMatchClubID(matchID string, clubName string) ([]*models.ProgressScore, error)
	GetProgressCardByMatchClubID(matchID string, clubName string) ([]*models.ProgressCard, error)
	UpdateMatchStatus(matchID string, status string) error
	UpdateAllProgressScoreStatus(matchID string, status string) error
	UpdateAllProgressCardStatus(matchID string, status string) error
	CreateGoalType(goalType *models.GoalType) error
	GetAllGoalType() ([]*models.GoalType, error)
	CreateCardType(cardType *models.CardType) error
	GetAllCardType() ([]*models.CardType, error)
	DeleteGoalTypeByID(id string) error
	DeleteCardTypeByID(id string) error
	GetAllMatchCalendarsByRound(round string) ([]*models.Matches, error)
}
