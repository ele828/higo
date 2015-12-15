package service

import (
	"github.com/ele828/higo/model"
)

type ArticleService struct{}

// Write an article service
func (as *ArticleService) Write(title, content, link, topicId string) error {
	topic := new(model.Topic)
	err := topic.FetchTopic(topicId)
	if err != nil {
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

func (as *ArticleService) Read(id string) (*model.Article, error) {
	article := new(model.Article)
	err := article.Read(id);
	if err != nil {
		return nil, err
	}
	return article, nil
}
