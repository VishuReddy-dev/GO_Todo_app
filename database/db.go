package database

import (
	"database/sql"

	_ "github.com/lib/pq"
)

var DB *sql.DB
func Connect() error{
	connStr := "postgres://postgres:vishu@123@localhost:5432/Todo_go?sslmode=disable"
	db,err:=sql.Open("postgres",connStr)
	if err!=nil{
		return err
	}
	if err:=db.Ping();err!=nil{
		return err
	}
	DB=db
	return nil
}