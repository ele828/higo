package main

import (
    "github.com/gin-gonic/gin"
    "github.com/ele828/higo/core"
    "github.com/ele828/higo/router"
    "github.com/ele828/higo/config"
)

func main() {
    r := gin.New()
    core.Install()
    router.PublicRouter(r)
    r.Run(config.AppHost)
}