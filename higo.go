package main

import (
    "github.com/gin-gonic/gin"
    "github.com/ele828/higo/core"
//    "github.com/ele828/higo/middleware"
    "github.com/ele828/higo/controller"

//    "fmt"
)

func main() {
    core.InstallORMEngine()
    r := gin.New()
    setRouter(r)
    r.Run(":8080")
}

func setRouter(r *gin.Engine) {
    r.GET("/ping", controller.PingController)
}