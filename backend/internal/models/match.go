package models

type Results struct {
	Base
	MatchID        string `gorm:"primary_key;size:100"`
	HomeTeamGoal   int
	AwayTeamGoal   int
	HomeTeam       string `gorm:"size:50"`
	AwayTeam       string `gorm:"size:50"`
	YellowCardHome int
	RedCardHome    int
	YellowCardAway int
	RedCardAway    int
	SeaSon         string `gorm:"size:50"`
	Status         string `gorm:"size:50;default:'not done'"`
}

type Matches struct {
	Base
	ClubOneName string `gorm:"size:50"` //Home club name
	ClubTwoName string `gorm:"size:50"` //Away club name
	IntendTime  string `gorm:"size:50"`
	RealTime    string `gorm:"size:50"`
	Stadium     string `gorm:"size:50"`
	MatchRound  int32
	MatchTurn   string `gorm:"size:50"`
	IdClubOne   string `gorm:"size:50"`
	IdClubTwo   string `gorm:"size:50"`
	MatchStatus string `gorm:"size:50;default:'no'"`
	SeaSon      string `gorm:"size:50"`
}

type GoalType struct {
	GoalTypeID   string `gorm:"primary_key;size:50"`
	GoalTypeName string `gorm:"size:50"`
}

type CardType struct {
	CardTypeID   string `gorm:"primary_key;size:50"`
	CardTypeName string `gorm:"size:50"`
}

type ProgressScore struct {
	Base
	MatchID     string `gorm:"size:50"`
	ClubName    string `gorm:"size:50"`
	PlayerName  string `gorm:"size:50"`
	GoalType    string `gorm:"size:50"`
	TimeInMatch string `gorm:"size:50"`
	Status      string `gorm:"size:50;default:'no'"`
}

type ProgressCard struct {
	Base
	MatchID     string `gorm:"size:50"`
	ClubName    string `gorm:"size:50"`
	PlayerName  string `gorm:"size:50"`
	CardType    string `gorm:"size:50"`
	TimeInMatch string `gorm:"size:50"`
	Status      string `gorm:"size:50;default:'no'"`
}
