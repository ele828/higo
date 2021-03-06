package controller

import (
	. "github.com/ele828/higo/error"
	"github.com/ele828/higo/service"
	"github.com/gin-gonic/gin"
	"net/http"
)

var svc = service.ArticleService{}

func PingController(c *gin.Context) {

	//err := svc.Write("13", "123", "123", "1")
	_ = svc.WriteComment("2", "test", "test", "test@test.com")
	//
	//if err != nil {
	//	c.JSON(http.StatusOK, gin.H{"content": err.Error()})
	//}

	c.JSON(http.StatusOK, gin.H{"Status": "ok"})
}

func WriteTest(c *gin.Context) {
	//svc.Write("name", "content", "link", "10")
	c.JSON(http.StatusOK, gin.H{"Status": "write ok"})
}

func ReadArticle(c *gin.Context) {
	article, err := svc.Read(c.Query("id"))
	if err != nil {
		switch err {
		case ErrArticleNotFound:
			c.JSON(http.StatusNotFound, gin.H{
				"Code":    404,
				"Message": err.Error(),
			})
		case ErrGivenArticleId:
			c.JSON(http.StatusBadRequest, gin.H{
				"Code":    400,
				"Message": err.Error(),
			})
		}

	} else {
		c.JSON(http.StatusOK, article)
	}
}

func ReadArticleList(c *gin.Context) {
	list, err := svc.GetList(c.Query("page"))
	if err != nil {
		switch err {
		case ErrGivenPageNumber:
			c.JSON(http.StatusBadRequest, gin.H{
				"Code":    400,
				"Message": ErrGivenPageNumber.Error(),
			})

		case ErrEmptyList:
			c.JSON(http.StatusNotFound, gin.H{
				"Code":    404,
				"Message": ErrEmptyList.Error(),
			})
		default:
		}
	} else {
		c.JSON(http.StatusOK, list)
	}
}

func ReadAboutMe(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"Content": `Hey, welcome! I'm Eric Wong, a really passionate web developer, now pursuing my bachelor's degree at Northeastern University(China) as junior student, majored in Software Engineering.
I'm crazy about web full stack technologies, from front end to back end. Always focusing on fantastic web front end techniques and high performance server development.

This is my personal blog, it's written by Golang and React, named [higo](https://github.com/ele828/higo). I plan to make a really cool blog system, now it's still under construction, I'll constantly add new features to it as far as I'm free and I really appreciate it if any of you can join together to finish it.

Now, I'm actively seeking for 2016 Summer / Fall internship opportunity of Web Front End or Full Stack Software Engineer position. If you think I'm qualified, please reach out to me :)

## Contact
* Email: eric@dobest.me
* Github: [https://github.com/ele828](https://github.com/ele828)
* Linkedin: [http://cn.linkedin.com/in/ele828/en](http://cn.linkedin.com/in/ele828/en)`})
}

func Frontend(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{})
}
