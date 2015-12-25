package controller

import (
	"github.com/ele828/higo/service"
	"github.com/gin-gonic/gin"
	"net/http"
)

var svc = service.ArticleService{}

func PingController(c *gin.Context) {

//	err := svc.Write("13", "123", "123", "1")
//	err = svc.WriteComment("2", "test", "test", "test@test.com")
//
//	if err != nil {
//		c.JSON(http.StatusOK, gin.H{"content": err.Error()})
//	}

	c.JSON(http.StatusOK, gin.H{"content": "ok"})
}

func ReadArticle(c *gin.Context) {
	article, _ := svc.Read(c.Query("id"))
	c.JSON(http.StatusOK, article)
}

func ReadArticleList(c *gin.Context) {
	list, _ := svc.GetList(c.Query("page"))
	c.JSON(http.StatusOK, list)
}

func ReadAboutMe(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"Content": "待更新..."})
}

func Frontend(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{})
}
