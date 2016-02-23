package middleware

import (
	"database/sql"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

var db *sql.DB

func Storage(cfg string) gin.HandlerFunc {
	db, err := sql.Open("mysql", cfg)
	if err != nil {
		panic("Failed to connect to database.")
	}

	return func(c *gin.Context) {
		c.Set("db", db)
		c.Next()
	}
}

func CloseStorage() error {
	return db.Close()
}
