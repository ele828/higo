package core

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/go-xorm/xorm"

	"fmt"
)

var (
	Db *xorm.Engine
)

func InstallORMEngine() error {
	var err error
	DbConfig := fmt.Sprintf(`%s:%s@tcp(%s:%s)/%s?charset=utf8`, dbUser, dbPass, dbHost, dbPort, dbName)
	Db, err = xorm.NewEngine("mysql", DbConfig)
	if err != nil {
		return err
	}
	return nil
}

