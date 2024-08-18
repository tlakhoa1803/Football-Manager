package firebase

import (
	"context"
	firebase "firebase.google.com/go"
	"log"
	"testing"
)

func TestFirebaseInit(t *testing.T) {
	// test the local connection to firebase
	log.Println("Testing Firebase initialization")
	ctx := context.Background()
	conf := &firebase.Config{ProjectID: "se104-71786"}
	app, err := firebase.NewApp(ctx, conf)

	if err != nil {
		log.Fatalf("error initializing app: %v", err)
		return
	}

	client, err := app.Firestore(ctx)
	if err != nil {
		log.Fatalf("error initializing firestore: %v", err)
	}

	ref := client.Collection("users").NewDoc()
	result, err := ref.Set(ctx, map[string]interface{}{
		"title":       "Hello, world!",
		"description": "This is a test",
	})
	if err != nil {
		log.Fatalf("error adding document: %v", err)
	}

	log.Printf("Document added with ID: %v", result)
	defer client.Close()
}
