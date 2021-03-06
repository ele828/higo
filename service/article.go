package service

import (
	"github.com/ele828/higo/model"
	"strconv"
)

type ArticleService struct{}

func (as *ArticleService) Read(id string) (*model.Article, error) {
	article := new(model.Article)
	if err := article.Read(id); err != nil {
		return nil, err
	}
	return article, nil
}

// Write an article service
func (as *ArticleService) Write(title, content, link, topicId string, tags []model.Tag) (err error) {
	topic := new(model.Topic)
	// fetch topic data from db by topic ID
	if err = topic.FetchTopic(topicId); err != nil {
		return err
	}

	var article = model.Article{
		Title:   title,
		Content: content,
		Link:    link,
		Topic:   *topic,
	}
	err = article.Write()
	if err != nil {
		return err
	}
	return nil
}

type List struct {
	Code      int16
	Data      []model.ArticleItem
	PageCount int
}

func (as *ArticleService) GetList(page string) (*List, error) {
	listModel := new(model.List)
	list, err := listModel.GetList(page)
	if err != nil {
		return nil, err
	}

	count, err := listModel.GetListPageCount()
	if err != nil {
		return nil, err
	}

	return &List{Code: 200, Data: list, PageCount: count}, nil
}

// Write an comment for specified article
func (as *ArticleService) WriteComment(id, name, email, content string) error {
	comment := model.Comment {
		Name:    name,
		Email:   email,
		Content: content,
	}
	article, err := as.Read(id)
	if err != nil {
		return err
	}

	err = article.WriteComment(comment)
	if err != nil {
		return err
	}
	return nil
}

// Write an article tag
func (as *ArticleService) WriteTag(id, name, count string) error {
	ID, err := strconv.Atoi(id)
	if err != nil {
		return err
	}
	tag := model.Tag{
		ID: ID,
		Name: name,
		Count: 0,
	}

	tag.Create()

	return nil
}