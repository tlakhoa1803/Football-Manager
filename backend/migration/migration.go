package migration

import (
	"fmt"
	"github.com/NMCNPM-football/backend/internal/models"
	"github.com/pkg/errors"
	"gorm.io/gorm"
)

func Migration(db *gorm.DB) error {
	if err := db.AutoMigrate(
		&models.User{},
		&models.Club{},
		&models.SeaSon{},
		&models.Player{},
		&models.Matches{},
		&models.Stadium{},
		&models.ProgressScore{},
		&models.GoalType{},
		&models.Results{},
		&models.ProgressCard{},
		&models.CardType{},
		&models.Summary{},
		&models.Coach{},
		&models.LeagueRule{},
	); err != nil {
		return errors.Wrap(err, "db.AutoMigrate")
	}

	return nil
}

func AutoSeedingData(db *gorm.DB) error {
	for _, seed := range All() {
		if err := seed.Run(db); err != nil {
			return errors.Wrap(err, fmt.Sprintf("Running seed '%s'", seed.Name))
		}
	}

	return nil
}
