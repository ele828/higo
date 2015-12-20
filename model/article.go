package model

import (
	"time"
	"github.com/ele828/higo/common"
)

type Article struct {
	ID           int
	Title        string `sql:"size:255; not null;"`
	Content      string `sql:"type:text; not null;"`
	Link         string `sql:"size:255; not null;"`
	Topic        Topic  // Foreign Key
	TopicId      int    // Name of Foreign Key
	Tag          []Tag  `gorm:"many2many:article_tags;"`
	Comment      []Comment
	ReadCount    int8      `sql:"not null; default:0;"`
	ThumbCount   int8      `sql:"not null; default:0;"`
	CommentCount int8      `sql:"not null; default:0;"`
	CreateAt     time.Time `json:"-"; sql:"not null; DEFAULT:current_timestamp;"`
	Time         string    `sql:"-"`
}

// Write an article from storage
func (a *Article) Write() error {
	db := DB.Create(a)
	if db.Error != nil {
		return db.Error
	}
	return nil
}

// Read an article from storage
func (a *Article) Read(id string) error {
	q := DB.First(a, id)
	if q.Error != nil {
		return q.Error
	}
	a.Time = common.FormatTime(a.CreateAt)
	err := ReadComments(a)
	if err != nil {
		return err
	}
	return nil
}

// Insert into a comment to an article
func (a *Article) WriteComment(c Comment) error {
	a.Comment = append(a.Comment, c)
	a.CommentCount = a.CommentCount + 1
	q := DB.Save(a)
	if q.Error != nil {
		return q.Error
	}
	return nil
}
