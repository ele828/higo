package model

import (
	"time"
)

type Article struct {
	ID           int
	Title        string    `sql:"size:255; not null;"`
	Content      string    `sql:"type:text; not null;"`
	Link         string    `sql:"size:255; not null;"`
	Topic        Topic     // Foreign Key
	TopicId      int       // Name of Foreign Key
	Comment      []Comment `gorm:"many2many:article_comments;"`
	ReadCount    int8      `sql:"not null; default:0;"`
	ThumbCount   int8      `sql:"not null; default:0;"`
	CommentCount int8      `sql:"not null; default:0;"`
	CreateAt     time.Time `sql:"not null;"`
}

// Write an article from storage
func (a *Article) Write() error {
	q := DB.Create(a)
	if q.Error != nil {
		return q.Error
	}
	return nil
}

// Read an article from storage
func (a *Article) Read(id string) error {
	q := DB.First(a, id)
	if q.Error != nil {
		return q.Error
	}
	return nil
}
