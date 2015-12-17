package controller

import (
	"github.com/ele828/higo/service"
	"github.com/gin-gonic/gin"
	"net/http"
)

func PingController(c *gin.Context) {

	svc := service.ArticleService{}
	err := svc.Write("13", "123", "123", "1")

	err = svc.WriteComment("2", "test", "test", "test@test.com")

	if err != nil {
		c.JSON(http.StatusOK, gin.H{"content": err.Error()})
	}

	c.JSON(http.StatusOK, gin.H{"content": "ok"})
}

func ReadTest(c *gin.Context) {
	svc := service.ArticleService{}
	article, _ := svc.Read(c.Query("id"))
	c.JSON(http.StatusOK, article)
}
