package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

type Base struct {
	ID        string `gorm:"primary_key;size:100"`
	CreatedAt time.Time
	UpdatedAt time.Time      `gorm:"autoUpdateTime"`
	DeletedAt gorm.DeletedAt `gorm:"index"`
}

func (b *Base) BeforeCreate(tx *gorm.DB) error {
	b.ID = uuid.New().String()
	b.CreatedAt = time.Now().Add(time.Hour * 7) // Add 7 hours to current time to match with UTC+7 timezone
	b.UpdatedAt = time.Now().Add(time.Hour * 7) // Add 7 hours to current time to match with UTC+7 timezone
	return nil
}
