package model

import (
	//	"github.com/ele828/higo/core"
	//	"fmt"
	//	"fmt"
//	"github.com/ele828/higo/core"
	"time"
	"fmt"
)

//type Article struct {
//	Id           int64
//	Title        string `xorm:"unique"`
//	Content      string
//	Link         string
//	Topic        string
//	Comments     string
//	ReadCount    int8  `xorm:"INT(8)"`
//	ThumbCount   int8  `xorm:"INT(8)"`
//	CommentCount int8  `xorm:"INT(8)"`
//	CreateAt     int64 `xorm:"INT(8) created"`
//}

type Comment struct {
	ID        int
	Title     string `sql:"size:255"`
	Tests     []Test `gorm:"many2many:comment_tests"`
	CreatedAt time.Time
}

type Test struct {
	ID   int
	Name string
}

func (c *Comment) CreateNewComment() {
	comment := Comment{
		Title: "测试数据",
		Tests: []Test{{Name: "123"}, {Name: "Hehe"}},
	}
	DB.Create(&comment)

	var comment1 Comment
	DB.First(&comment1)

	fmt.Printf("%#v", comment1)

}
