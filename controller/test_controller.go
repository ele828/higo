package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/ele828/higo/model"

	"net/http"

	"fmt"
)

func PingController(c *gin.Context) {
//	var comment = &model.Comment{Title: "test"}
//	comment.CreateNewComment()
////	if err != nil {
////		panic(err)
////	}

	topic := new(model.Topic)
	err := topic.FetchTopic(10)
	if  err != nil {
		fmt.Println(err.Error())
	}
	var article = model.Article{
		Title: "测试文章模型",
		Content: "测试正文部分",
		Link: "test-model",
		Topic: *topic,
	}
	article.Create()
	c.JSON(http.StatusOK, gin.H{"test": "PingController"})
}