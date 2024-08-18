package seed

import (
	"fmt"
	"github.com/brianvoe/gofakeit/v6"
	"github.com/pkg/errors"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"strings"
)

func createData(db *gorm.DB, valueStrings []string, valueArgs []interface{}) error {
	stmt := fmt.Sprintf("INSERT INTO users(id,username, email, password,phone,address) VALUES %s ON DUPLICATE KEY UPDATE updated_at=now()", strings.Join(valueStrings, ","))

	err := db.Exec(stmt, valueArgs...).Error
	if err != nil {
		return err
	}

	return nil
}

func FakeMember(db *gorm.DB) error {
	var valueStrings []string
	var valueArgs []interface{}

	for i := 1; i <= 2; i++ {
		password := fmt.Sprintf("password%v", i)
		hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
		if err != nil {
			return errors.Wrap(err, "bcrypt.GenerateFromPassword")
		}

		valueStrings = append(valueStrings, "(?, ?, ?, ?, ?, ?)")

		valueArgs = append(valueArgs, i)
		valueArgs = append(valueArgs, fmt.Sprintf("%v", gofakeit.Username()))
		valueArgs = append(valueArgs, fmt.Sprintf("user%v@example.com", i))
		valueArgs = append(valueArgs, hashed)
		valueArgs = append(valueArgs, fmt.Sprintf("%v", gofakeit.Phone()))
		valueArgs = append(valueArgs, fmt.Sprintf("%v", *gofakeit.Address()))

		if i%100 == 0 && i > 0 {
			err1 := createData(db, valueStrings, valueArgs)
			if err1 != nil {
				continue
			}

			valueStrings = []string{}
			valueArgs = []interface{}{}
		}
	}

	if len(valueStrings) > 0 {
		err1 := createData(db, valueStrings, valueArgs)
		if err1 != nil {
			return err1
		}

		valueStrings = []string{}
		valueArgs = []interface{}{}
	}

	fmt.Println("Fake data successfully")
	return nil
}
