package model

import (
	. "github.com/ele828/higo/config"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"

	"fmt"
)

var (
	DB gorm.DB
)

func InstallORMEngine() error {
	var err error
	DbConfig := fmt.Sprintf(
		`%s:%s@tcp(%s:%s)/%s?charset=utf8&parseTime=True`,
		DbUser,
		DbPass,
		DbHost,
		DbPort,
		DbName,
	)
	DB, err = gorm.Open("mysql", DbConfig)
	if err != nil {
		return err
	}
	return nil
}

func InstallModels() {
	DB.Set("gorm:table_options", "ENGINE=InnoDB").Set("gorm:table_options", "DEFAULT CHARSET=utf8").
		AutoMigrate(
			&Article{},
			&Topic{},
			&Tag{},
			&Comment{},
			&Friend{},
		)
}
