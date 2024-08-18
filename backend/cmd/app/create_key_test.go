package main

import (
	"crypto/rand"
	"crypto/rsa"
	"crypto/x509"
	"encoding/base64"
	"encoding/pem"
	"fmt"
	"github.com/stretchr/testify/suite"
	"testing"
)

type KeyGenerationSuite struct {
	suite.Suite
}

func (suite *KeyGenerationSuite) SetupTest() {
	// This method will be run before each test in the suite
}

func (suite *KeyGenerationSuite) TearDownTest() {
	// This method will be run after each test in the suite
}

func (suite *KeyGenerationSuite) TestKeyGeneration() {
	// Generate a new private key
	privateKey, err := rsa.GenerateKey(rand.Reader, 2048)
	suite.NoError(err)

	// Encode the private key to PEM format
	privateKeyPEM := &pem.Block{
		Type:  "RSA PRIVATE KEY",
		Bytes: x509.MarshalPKCS1PrivateKey(privateKey),
	}
	privatePEM := pem.EncodeToMemory(privateKeyPEM)

	// Base64 encode the private key
	privatePEMBase64 := base64.StdEncoding.EncodeToString(privatePEM)

	// Generate the public key from the private key
	publicKey := &privateKey.PublicKey

	// Encode the public key to PEM format
	publicKeyDER, err := x509.MarshalPKIXPublicKey(publicKey)
	suite.NoError(err)

	publicKeyPEM := &pem.Block{
		Type:  "PUBLIC KEY",
		Bytes: publicKeyDER,
	}
	publicPEM := pem.EncodeToMemory(publicKeyPEM)

	// Base64 encode the public key
	publicPEMBase64 := base64.StdEncoding.EncodeToString(publicPEM)

	// Print the keys
	fmt.Printf("Private Key: %s\n", privatePEMBase64)
	fmt.Printf("Public Key: %s\n", publicPEMBase64)
}

func TestKeyGenerationSuite(t *testing.T) {
	suite.Run(t, new(KeyGenerationSuite))
}
