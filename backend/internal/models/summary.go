package models

type Summary struct {
	Base
	ClubID         string `gorm:"size:100"`
	ClubName       string `gorm:"size:50"`
	MatchesPlayed  int
	MatchesWon     int
	MatchesDraw    int
	MatchesLost    int
	GoalsScored    int
	GoalsConceded  int
	YellowCard     int
	RedCard        int
	GoalDifference int
	Points         int
	Rank           int
	SeaSon         string `gorm:"size:100"`
	LogoLink       string `gorm:"size:5000"`
}

type LeagueRule struct {
	Base
	Value string `gorm:"size:50"`
	Key   string `gorm:"size:50"`
}
