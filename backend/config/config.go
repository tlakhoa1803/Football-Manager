package config

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"runtime"
)

type Config struct {
	Env                        string `json:"env"`
	ServiceName                string `json:"service_name"`
	GrpcPort                   int    `json:"grpc_port"`
	SentryDSN                  string `json:"sentry_dsn"`
	Port                       int    `json:"port"`
	AuthenticationSecretKey    string `json:"authentication_secret_key"`
	AuthenticationPubSecretKey string `json:"authentication_pub_secret_key"`
	//db
	Db string `json:"db"`
}

func ReadConfigAndArg() *Config {
	_, b, _, _ := runtime.Caller(0)
	basepath := filepath.Dir(b)

	fileConfig := "config.json"

	data, err := os.ReadFile(basepath + "/" + fileConfig)
	if err != nil {
		log.Fatalln(err)
	}

	var tempCfg *Config
	if data != nil {
		err = json.Unmarshal(data, &tempCfg)
		if err != nil {
			log.Fatalf("Unmarshal err %v", err.Error())
		}
	}

	if tempCfg.GrpcPort <= 0 {
		tempCfg.GrpcPort = 9000
	}

	fmt.Println("============Config===============")
	fmt.Println("env =", tempCfg.Env)
	fmt.Println("fileConfig =", fileConfig)
	fmt.Println("===========================")

	return tempCfg
}
