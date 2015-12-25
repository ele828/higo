package router

import (
	"github.com/gin-gonic/gin"
	"github.com/ele828/higo/controller"
)

// Public Router
// Set http request dispatcher
func PublicRouter(r *gin.Engine) {
	r.LoadHTMLGlob("public/html/*")
	r.Static("/public", "./public")
	r.Static("/resume", "./public/resume")

	r.GET("/", controller.Frontend)
	r.GET("/list/*stub", controller.Frontend)
	r.GET("/article/*stub", controller.Frontend)
	r.GET("/about/*stub", controller.Frontend)

	v := r.Group("/api")
	{
		v.GET("/ping", controller.PingController)
		v.GET("/list", controller.ReadArticleList)
		v.GET("/read", controller.ReadArticle)
		v.GET("/", controller.ReadArticle)
	}
}