package main

import (
	"bufio"
	"bytes"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
	"sync"
	"time"
)

// Replace with your actual LINE API access token
const accessToken = ""

// Define the message structure
type message struct {
	To      string `json:"to"`
	Message string `json:"message"`
}

func main() {
	// Open user ID file
	fmt.Println("Time Now: ", time.Now())
	file, err := ioutil.ReadFile("userid.txt")
	if err != nil {
		log.Fatal(err)
	}

	// Open log file for writing responses
	logFile, err := os.Create("push_log.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer logFile.Close()
	logWriter := log.New(logFile, "", 0)

	// Define channel for user IDs
	userIDChan := make(chan string)
	go func() {
		scanner := bufio.NewScanner(bytes.NewReader(file))
		for scanner.Scan() {
			userIDChan <- scanner.Text()
		}
		close(userIDChan)
	}()

	// Define wait group for goroutines
	var wg sync.WaitGroup

	// Set maximum number of concurrent requests (adjust based on your system resources)
	maxWorkers := 5000

	// Launch goroutines for sending messages
	for i := 0; i < maxWorkers; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for userID := range userIDChan {
				sendMessage(userID, logWriter)
				// Introduce a slight delay to avoid overwhelming the API
				// time.Sleep(time.Millisecond * 10)
			}
		}()
	}

	wg.Wait()
	fmt.Println("All messages sent!")
	fmt.Println("Time Now: ", time.Now())

}

func sendMessage(userID string, logWriter *log.Logger) {

	url := "https://api.line.me/v2/bot/message/push"
	method := "POST"

	payload := strings.NewReader(`{
	"to": "U61198bb44f6c28c97c5818617464ba1d",
		"messages": [
		{
			"type": "text",
			"text": "Your Push Message"
		}
		]
  	}`)
	// Build request
	req, err := http.NewRequest(method, url, payload)
	if err != nil {
		fmt.Println("[Error] err: ", err)
		logWriter.Printf("Error creating request for user %s: %v\n", userID, err)
		return
	}
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", accessToken))
	req.Header.Set("Content-Type", "application/json")
	// Send request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Println("[Error] err: ", err)
		logWriter.Printf("Error sending request for user %s: %v\n", userID, err)
		return
	}
	defer resp.Body.Close()

	// Read response body
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("[Error] err: ", err)
		logWriter.Printf("Error reading response for user %s: %v\n", userID, err)
		return
	}

	// Log response status code and body
	logWriter.Printf("User: %s, Status Code: %d, Response: %s\n", userID, resp.StatusCode, string(body))
}
