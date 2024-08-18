package models

import (
	"github.com/NMCNPM-football/backend/config"
	"github.com/NMCNPM-football/backend/internal/must"
	"log"
	"testing"
	"time"
)

func TestUpdateAllClubsWithStadiumNames(t *testing.T) {
	// Connect to the database
	cfg := config.ReadConfigAndArg()
	logger, sentry, err := must.NewLogger(cfg.SentryDSN, cfg.ServiceName+"-app")
	if err != nil {
		log.Fatalf("logger: %v", err)
	}
	defer logger.Sync()
	defer sentry.Flush(2 * time.Second)
	db := must.ConnectDb(cfg.Db)

	// Retrieve all Stadium instances from the database
	var stadiums []Stadium
	if err := db.Find(&stadiums).Error; err != nil {
		t.Fatalf("Failed to retrieve stadiums: %v", err)
	}

	// Retrieve all Club instances from the database
	var clubs []Club
	if err := db.Find(&clubs).Error; err != nil {
		t.Fatalf("Failed to retrieve clubs: %v", err)
	}

	// Create a map of stadium names by club ID
	stadiumNamesByClubID := make(map[string]string)
	for _, stadium := range stadiums {
		stadiumNamesByClubID[stadium.ClubID] = stadium.StadiumName
	}

	// Update each Club instance with the nameStadium from the corresponding Stadium instance
	for _, club := range clubs {
		if stadiumName, ok := stadiumNamesByClubID[club.ID]; ok {
			club.NameStadium = stadiumName
			if err := db.Save(&club).Error; err != nil {
				t.Fatalf("Failed to update club: %v", err)
			}
		}
	}

	// Verify that all clubs' nameStadium have been updated
	for _, club := range clubs {
		var updatedClub Club
		if err := db.First(&updatedClub, club.ID).Error; err != nil {
			t.Fatalf("Failed to retrieve updated club: %v", err)
		}
		if updatedClub.NameStadium != stadiumNamesByClubID[club.ID] {
			t.Fatalf("Club's nameStadium was not updated correctly")
		}
	}
}
