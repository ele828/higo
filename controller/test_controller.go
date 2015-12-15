package controller

import (
	"github.com/ele828/higo/service"
	"github.com/gin-gonic/gin"
	"net/http"
)

func PingController(c *gin.Context) {

	svc := service.ArticleService{}
	err := svc.Write("13", "123", "123", "1")
	if err != nil {
		c.JSON(http.StatusOK, gin.H{"content": err.Error()})
	}
//	id := c.Query("id")
//	a, _ := svc.Read(id)

	c.JSON(http.StatusOK, gin.H{"content": "ok"})
}
