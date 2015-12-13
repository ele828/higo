package core

import (
	"github.com/ele828/higo/model"
)

func Install() {
	model.InstallORMEngine()
	model.InstallModels()
}