package model

import (
	"github.com/ele828/higo/common"
	"github.com/ele828/higo/config"
	. "github.com/ele828/higo/error"
	"github.com/jinzhu/gorm"
	"log"
	"math"
	"strconv"
	"time"
)

//------------------- ORM MODEL ---------------------//
type Article struct {
	ID           int
	Title        string `sql:"size:255; not null;"`
	Content      string `sql:"type:text; not null;"`
	Link         string `sql:"size:255; not null;"`
	Topic        Topic  // Foreign Key
	TopicId      int    // Name of Foreign Key
	Tag          []Tag  `gorm:"many2many:article_tags;"`
	Comment      []Comment
	ReadCount    int       `sql:"not null; default:0;"`
	ThumbCount   int       `sql:"not null; default:0;"`
	CommentCount int       `sql:"not null; default:0;"`
	CreateAt     time.Time `json:"-"; sql:"not null; DEFAULT:current_timestamp;"`
	Time         string    `sql:"-"`
}

//----------------- JSON OUTPUT --------------------//
type ArticleItem struct {
	ID         int
	Title      string
	Topic      string
	TopicId    int
	ReadCount  int
	ThumbCount int
	Time       string
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
	// id validator
	if id, err := strconv.Atoi(id); err != nil || id < 0 {
		return ErrGivenArticleId
	}
	q := DB.First(a, id)
	if q.Error != nil {
		// article not found error
		if q.Error == gorm.RecordNotFound {
			log.Print(ErrArticleNotFound.Error())
			return ErrArticleNotFound
		}
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

type List struct{}

// Get a list of articles
func (l *List) GetList(page string) ([]ArticleItem, error) {
	pageSize := config.PageSize
	p, err := strconv.Atoi(page)
	if err != nil {
		return nil, ErrGivenPageNumber
	}
	start := (p - 1) * pageSize
	if start < 0 {
		return nil, ErrGivenPageNumber
	}
	var articles = []Article{}
	q := DB.Order("id desc").
		Limit(pageSize).
		Offset(start).
		Find(&articles)

	if q.Error != nil {
		return nil, q.Error
	}

	// if articles not found
	if len(articles) == 0 {
		return nil, ErrEmptyList
	}

	var items []ArticleItem
	for _, v := range articles {
		if err := ReadTopic(&v); err != nil {
			return nil, err
		}
		item := ArticleItem{
			ID:         v.ID,
			Title:      v.Title,
			Topic:      v.Topic.Name,
			TopicId:    v.TopicId,
			ReadCount:  v.ReadCount,
			ThumbCount: v.ThumbCount,
			Time:       common.FormatDate(v.CreateAt),
		}
		items = append(items, item)
	}
	return items, nil
}

// Get total number of article list.
func (l *List) GetListPageCount() (int, error) {
	var count int
	q := DB.Table("articles").Count(&count)
	if q.Error != nil {
		return 0, q.Error
	}
	return int(math.Ceil(float64(count) / float64(config.PageSize))), nil
}
