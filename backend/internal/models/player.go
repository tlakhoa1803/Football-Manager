package models

type Player struct {
	ID          string `gorm:"primary_key;size:100"`
	ClubID      string `gorm:"size:50"`
	ClubName    string `gorm:"size:50"`
	SeaSon      string `gorm:"size:50"`
	TypePlayer  string `gorm:"size:50"`
	Name        string `gorm:"size:50"`
	BirthDay    string `gorm:"size:50"`
	Height      string `gorm:"size:50"`
	Weight      string `gorm:"size:50"`
	Position    string `gorm:"size:50"`
	Nationality string `gorm:"size:50"`
	Kit         string `gorm:"size:50"`
	Achievement string `gorm:"size:50"`
	CreatedBy   string `gorm:"size:50"`
	UpdatedBy   string `gorm:"size:50"`
	Status      string `gorm:"size:50"`
	LogoLink    string `gorm:"size:5000"`
}

type PLayerStats struct {
	ID          string `gorm:"primary_key;size:100"`
	PlayerID    string `gorm:"size:50"`
	Position    string `gorm:"size:50"`
	PlayingTime string `gorm:"size:50"`
	YellowCard  string `gorm:"size:50"`
	RedCard     string `gorm:"size:50"`
	Goals       string `gorm:"size:50"`
	Assists     string `gorm:"size:50"`
}

type PlayerStatsGeneral struct {
	ID          string `gorm:"primary_key;size:100"`
	PlayerID    string `gorm:"size:50"`
	Position    string `gorm:"size:50"`
	PlayingTime string `gorm:"size:50"`
	YellowCard  string `gorm:"size:50"`
	RedCard     string `gorm:"size:50"`
}

type PlayerStatsDefensive struct {
	PlayerStatsGeneral
	Dribbles string `gorm:"size:50"`
	Assists  string `gorm:"size:50"`
	Passing  string `gorm:"size:50"`
	Tackles  string `gorm:"size:50"`
}

type PlayerStatsAttacking struct {
	PlayerStatsGeneral
	Goals       string `gorm:"size:50"`
	Shots       string `gorm:"size:50"`
	ShotsOnGoal string `gorm:"size:50"`
	Passing     string `gorm:"size:50"`
}

type PlayerStatsGoalkeeper struct {
	PlayerStatsGeneral
	SaveAccuracy      string `gorm:"size:50"`
	GoalsConceded     string `gorm:"size:50"`
	CleanSheets       string `gorm:"size:50"`
	MatchSaves        string `gorm:"size:50"`
	PenaltiesSaved    string `gorm:"size:50"`
	SuccessfulCatches string `gorm:"size:50"`
}
