package common

import (
	"crypto/md5"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"math/big"
	"regexp"
	"strings"
	"time"
	"unicode"
)

func IsValidDateFormat(input string) bool {
	// Define the expected date format using a regular expression
	dateFormatRegex := regexp.MustCompile(`^\d{4}-\d{2}-\d{2}$`)

	// Check if the input matches the expected format
	if !dateFormatRegex.MatchString(input) {
		return false
	}

	// Parse the input string as a date
	_, err := time.Parse("2006-01-02", input)
	return err == nil
}

func IsEmptyString(input string) bool {
	return input == ""
}

func IsItemStringInArray(target string, _arr []string) bool {
	found := false
	for _, item := range _arr {
		if item == target {
			found = true
			break
		}
	}
	return found
}

func IsItemIntInArray(target int, _arr []int) bool {
	found := false
	for _, item := range _arr {
		if item == target {
			found = true
			break
		}
	}
	return found
}

func ToSnakeCase(input string) string {
	var result strings.Builder

	for i, char := range input {
		if i > 0 && unicode.IsUpper(char) {
			result.WriteRune('_')
		}
		result.WriteRune(unicode.ToLower(char))
	}

	return result.String()
}

func RandomStringAlpha(n int) string {
	var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
	return generateRandomString(n, letters)
}

func RandomStringNumber(n int) string {
	var numbers = []rune("0123456789")
	return generateRandomString(n, numbers)
}

func generateRandomString(n int, charset []rune) string {
	b := make([]rune, n)

	for i := range b {
		num, err := rand.Int(rand.Reader, big.NewInt(int64(len(charset))))
		if err != nil {
			return ""
		}
		b[i] = charset[num.Int64()]
	}

	return string(b)
}

func RemovePunctuation(input string) string {
	var result strings.Builder

	for _, char := range input {
		if !unicode.IsPunct(char) {
			result.WriteRune(char)
		}
	}

	return result.String()
}

func NewStringMD5(input string, secret string) string {
	hash := md5.New()
	hash.Write([]byte(input + secret))
	return hex.EncodeToString(hash.Sum(nil))
}

func FormatArrayToSqlCondition(array []string) string {
	// Check if the array is empty
	if len(array) == 0 {
		return "()"
	}

	// Create a string builder to efficiently concatenate strings
	var builder strings.Builder

	// Start the formatted string with "("
	builder.WriteString("(")

	// Iterate over the array elements
	for i, element := range array {
		// Add the element to the formatted string
		builder.WriteString(fmt.Sprintf(`"%s"`, element))

		// Add a comma after each element, except the last one
		if i < len(array)-1 {
			builder.WriteString(", ")
		}
	}

	// End the formatted string with ")"
	builder.WriteString(")")

	// Return the final formatted string
	return builder.String()
}

//func SendMessageTelegramBot(chatIDStr string, message string, botToken string) error {
//	// Create a new bot instance
//	bot, err := tgbotapi.NewBotAPI(botToken)
//	if err != nil {
//		return err
//	}
//
//	chatID, err := strconv.ParseInt(chatIDStr, 10, 64)
//	if err != nil {
//		return err
//	}
//
//	// Create a message configuration
//	msg := tgbotapi.NewMessage(chatID, message)
//
//	// Send the message
//	_, err = bot.Send(msg)
//	if err != nil {
//		return err
//	}
//
//	return nil
//}
