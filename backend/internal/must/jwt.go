package must

import (
	"crypto/x509"
	"encoding/base64"
	"encoding/pem"
	"fmt"
	"github.com/NMCNPM-football/backend/internal/serializers"
	"github.com/golang-jwt/jwt/v5"
	"github.com/pkg/errors"
	"time"
)

func ParseToken(tokenString string, publicKey string) (*serializers.UserInfo, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
			return nil, fmt.Errorf("Unexpected signing")
		}

		key, err := base64.StdEncoding.DecodeString(publicKey)
		if err != nil {
			return nil, errors.Wrap(err, "DecodeString")
		}

		pk, err := jwt.ParseRSAPublicKeyFromPEM(key)
		if err != nil {
			return nil, errors.Wrap(err, "ParseRSAPrivateKeyFromPEM")
		}

		return pk, nil
	})

	if err != nil {
		return nil, ErrInvalidCredentials
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if ok && token.Valid {
		if customerEmail, ok1 := claims["email"]; ok1 && len(customerEmail.(string)) > 0 {
			return &serializers.UserInfo{
				Email: customerEmail.(string),
			}, nil
		}

		return nil, ErrInvalidCredentials
	}

	return nil, ErrInvalidCredentials
}

func CreateNewWithClaims(data *serializers.UserInfo, secretKey string, expire, refreshExpire time.Time) (string, string, error) {
	accessClaims := jwt.MapClaims{
		"id":    fmt.Sprintf("%d", data.ID),
		"email": data.Email,
		"exp":   expire.Unix(),
	}

	refreshClaims := jwt.MapClaims{
		"id":    fmt.Sprintf("%d", data.ID),
		"email": data.Email,
		"exp":   refreshExpire.Unix(),
	}

	accessToken := jwt.NewWithClaims(jwt.SigningMethodRS512, accessClaims)
	refreshToken := jwt.NewWithClaims(jwt.SigningMethodRS512, refreshClaims)

	key, err := base64.StdEncoding.DecodeString(secretKey)
	if err != nil {
		return "", "", errors.Wrap(err, "DecodeString")
	}

	privateKey, _ := pem.Decode(key)
	if privateKey == nil {
		return "", "", errors.New("invalid PEM block in secret key")
	}
	k, err := x509.ParsePKCS1PrivateKey(privateKey.Bytes)
	if err != nil {
		return "", "", errors.Wrap(err, "ParsePKCS1PrivateKey")
	}

	if err := k.Validate(); err != nil {
		return "", "", errors.Wrap(err, "Validate")
	}

	accessTokenString, err := accessToken.SignedString(k)
	if err != nil {
		return "", "", errors.Wrap(err, "SignedString")
	}

	refreshTokenString, err := refreshToken.SignedString(k)
	if err != nil {
		return "", "", errors.Wrap(err, "SignedString")
	}

	return accessTokenString, refreshTokenString, nil
}
