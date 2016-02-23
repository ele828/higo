package model

import (
	"github.com/ele828/higo/common"
	"time"
)

type Comment struct {
	ID        int
	ArticleID int       `sql:"index"`
	Name      string    `sql:"size:255; not null;"`
	Email     string    `sql:"size:255; not null;"`
	Content   string    `sql:"type:text; not null;"`
	CreateAt  time.Time `json:"-"; sql:"not null; DEFAULT:current_timestamp;"`
	Time      string    `sql:"-"`
}

// Write a comment
func (c *Comment) Create() error {
	db := DB.Create(c)
	if db.Error != nil {
		return db.Error
	}
	return nil
}

// Fetch a set of comments
// According to given article model
func ReadComments(a *Article) error {
	var comments []Comment
	q := DB.Model(a).Related(&comments)
	for i, v := range comments {
		comments[i].Time = common.FormatTime(v.CreateAt)
	}
	a.Comment = comments
	if q != nil {
		return q.Error
	}
	return nil
}
