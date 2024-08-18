package dao

import (
	"github.com/NMCNPM-football/backend/internal/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"testing"
)

func TestGetAllMatchCalendars(t *testing.T) {
	// Replace with your actual MySQL connection string
	dsn := "root:root@tcp(127.0.0.1:3306)/SE104?charset=utf8mb4&parseTime=True&loc=Local"

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		t.Fatalf("Failed to open database: %v", err)
	}

	// Create a new MatchDao
	m := NewMatchDao(db)
	var matchCalendars []*models.Matches
	err = m.db.Find(&matchCalendars).Error
	if err != nil {
		t.Fatalf("Failed to fetch match calendars: %v", err)
	}
	// Log the number of match calendars fetched
	t.Logf("Fetched %d match calendars", len(matchCalendars))
}
