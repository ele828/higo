package service

import (
	"github.com/ele828/higo/model"
)

type ArticleService struct{}

func (as *ArticleService) Read(id string) (*model.Article, error) {
	article := new(model.Article)
	err := article.Read(id)
	if err != nil {
		return nil, err
	}
	return article, nil
}

// Write an article service
func (as *ArticleService) Write(title, content, link, topicId string) (err error) {
	topic := new(model.Topic)
	// fetch topic data from db by topic ID
	if err = topic.FetchTopic(topicId); err != nil {
		return err
	}

	var article = model.Article {
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
	Data      []model.ArticleItem
	PageCount int
}
func (as *ArticleService) GetList(page string) (*List, error) {
	listModel := new(model.List)
	list, err := listModel.GetList(page)
	if err != nil {
		return nil, err
	}
	num, err := listModel.GetListPageCount()
	if err != nil {
		return nil, err
	}

	return &List{
		Data: list,
		PageCount: num,
	}, nil
}

func (as *ArticleService) WriteComment(id, name, email, content string) error {
	comment := model.Comment{
		Name: name,
		Email: email,
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
