package main

import (
    "github.com/gin-gonic/gin"
    "github.com/ele828/higo/core"
    "github.com/ele828/higo/router"
)

func main() {
    r := gin.New()
    r.Run(":8080")

    core.InstallORMEngine()
    // Set up routers
    router.PublicRouter(r)
}