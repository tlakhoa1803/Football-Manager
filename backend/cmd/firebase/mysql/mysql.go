package mysql

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql" // Import the MySQL driver
)

type service struct {
	DatabaseName     string
	DatabaseServer   string
	DatabaseUser     string
	DatabasePassword string
	ConnectionString string
	Db               *sql.DB
	DbDriver         string
	maxConn          int
}

type GoMithMysql interface {
	GetDBConnection() *sql.DB
	SetConnectionString(conn string, maxConn int)
}

func NewGoMithMysql(dbName, dbServer, dbUser, dbPassword, dbDriver string) GoMithMysql {
	svc := service{}
	svc.DatabaseName = dbName
	svc.DatabaseServer = dbServer
	svc.DatabaseUser = dbUser
	svc.DatabasePassword = dbPassword
	svc.DbDriver = dbDriver
	return &svc
}

func (s *service) GetDBConnection() *sql.DB {
	db, err := sql.Open(s.DbDriver, s.ConnectionString)
	if err != nil {
		log.Println(err.Error())
	}
	db.SetMaxOpenConns(s.maxConn)
	return db
}

func (s *service) SetConnectionString(conn string, maxConn int) {
	s.ConnectionString = conn
	s.maxConn = maxConn
}
