package common

import (
	"github.com/badoux/checkmail"
	"github.com/pkg/errors"
	"regexp"
	"strings"
)

func CheckMail(mail string) error {
	err := checkmail.ValidateFormat(mail)
	if err != nil {
		return err
	}
	if isPersonalMail(mail) {
		return errors.New("personal email is not allowed")
	}
	if isStudentEmail(mail) {
		return errors.New("student email is not allowed")
	}
	return err
}

func isPersonalMail(mail string) bool {
	personalEmailRegex := `@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com|icloud\.com)`

	re := regexp.MustCompile(personalEmailRegex)

	return re.MatchString(mail)
}

func isStudentEmail(email string) bool {
	// Split the email by "@"
	parts := strings.Split(email, "@")
	if len(parts) != 2 {
		// The email should have exactly one "@"
		return false
	}

	// Get the domain part
	domain := parts[1]

	// Check if the domain contains "edu", "student", or "school"
	keywords := []string{"edu", "student", "school"}
	for _, keyword := range keywords {
		if strings.Contains(domain, keyword) {
			return true
		}
	}

	return false
}

func GetDomainEmail(email string) string {
	parts := strings.Split(email, "@")
	if len(parts) == 2 {
		return parts[1]
	}
	return "" // Return an empty string if there's no "@" or more than one "@" in the email
}

func isValidPhoneNumber(phoneNumber string) bool {
	// Define a regular expression for a US phone number
	phoneRegex := `^\+?1?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$`

	// Compile the regular expression
	re := regexp.MustCompile(phoneRegex)

	// Use the regular expression to check if the phone number matches the pattern
	return re.MatchString(phoneNumber)
}
