package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/ele828/higo/core"

	"net/http"
//	"database/sql"
)

func PingController(c *gin.Context) {
	core.Db.DB().Exec("insert into `test` values(123)")
	c.JSON(http.StatusOK, gin.H{"test": "PingController"})
}