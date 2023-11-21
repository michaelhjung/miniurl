package util

import (
	"crypto/rand"
	"encoding/base64"
	"strings"
)

// GenerateRandomToken generates a random token of the specified length in lowercase.
func GenerateRandomToken(length int) (string, error) {
	// Determine the number of bytes needed based on the desired length
	numBytes := length / 3 * 4
	if length%3 > 0 {
		numBytes += 4
	}

	// Create a byte slice to store the random bytes
	bytes := make([]byte, numBytes)

	// Read random bytes from the crypto/rand package
	_, err := rand.Read(bytes)
	if err != nil {
		return "", err
	}

	// Encode the random bytes to base64 to get a URL-safe string
	token := base64.RawURLEncoding.EncodeToString(bytes)

	// Trim the string to the desired length
	token = token[:length]

	// Convert the token to lowercase
	token = strings.ToLower(token)

	return token, nil
}
