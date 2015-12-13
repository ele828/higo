package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/ele828/higo/model"

	"net/http"
)

func PingController(c *gin.Context) {
	var comment = &model.Comment{Title: "test"}
	comment.CreateNewComment()
//	if err != nil {
//		panic(err)
//	}
	c.JSON(http.StatusOK, gin.H{"test": "PingController"})
}