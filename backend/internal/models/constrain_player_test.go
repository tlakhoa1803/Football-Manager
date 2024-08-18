package models

import (
	"github.com/NMCNPM-football/backend/config"
	"github.com/NMCNPM-football/backend/internal/must"
	"log"
	"strconv"
	"strings"
	"testing"
	"time"
)

func TestConstrainPlayer(t *testing.T) {
	// Connect to the database

	cfg := config.ReadConfigAndArg()

	logger, sentry, err := must.NewLogger(cfg.SentryDSN, cfg.ServiceName+"-app")
	if err != nil {
		log.Fatalf("logger: %v", err)
	}

	defer logger.Sync()
	defer sentry.Flush(2 * time.Second)

	db := must.ConnectDb(cfg.Db)

	// Get all players
	var players []Player
	err = db.Raw("SELECT * FROM `players`").Scan(&players).Error
	if err != nil {
		t.Fatalf("Failed to select players: %v", err)
	}

	// Update TypePlayer for each player
	// Update Status for each player (Valid or Invalid) based on the BirthDay field of the player
	for _, player := range players {
		if player.Nationality == "VIE" {
			player.TypePlayer = "National Player"
		} else {
			player.TypePlayer = "Naturalization Player"
		}

		if len(strings.Split(player.BirthDay, "-")) == 3 {

			birthdayParts := strings.Split(player.BirthDay, "-")
			year, _ := strconv.Atoi(birthdayParts[0])
			month, _ := strconv.Atoi(birthdayParts[1])
			day, _ := strconv.Atoi(birthdayParts[2])
			birthday := time.Date(year, time.Month(month), day, 0, 0, 0, 0, time.UTC)

			// Calculate the age
			age := time.Now().Year() - birthday.Year()

			if player.BirthDay != "" && age >= 16 && age <= 40 {
				player.Status = "Valid"
			} else {
				player.Status = "Invalid"
			}
		} else {
			log.Printf("Invalid BirthDay format for player: %v", player)
		}

		err = db.Model(&player).Updates(Player{TypePlayer: player.TypePlayer, Status: player.Status}).Error
		if err != nil {
			t.Fatalf("Failed to update player: %v", err)
		}
	}
}
