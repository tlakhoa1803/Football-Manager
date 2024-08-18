package models

type Configuration struct {
	MinimumPlayerAge                 int
	MaximumPlayerAge                 int
	MinimumNumberOfPlayers           int
	MaximumNumberOfPlayers           int
	MaximumNumberOfForeignPlayers    int
	MinimumCoachCertificate          string `gorm:"size:50"`
	MinimumAssistantCoachCertificate string `gorm:"size:50"`
	MinimumGoalTime                  int
	MaximumGoalTime                  int
	WinPoints                        int
	DrawPoints                       int
	LosePoints                       int
	RankingPriority                  string `gorm:"size:50"`
}
