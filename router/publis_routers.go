package router

import (
	"github.com/gin-gonic/gin"
	"github.com/ele828/higo/controller"
)

// Public Router
// Set http request dispatcher
func PublicRouter(r *gin.Engine) {
	r.GET("/ping", controller.PingController)
}