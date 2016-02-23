package error

import "errors"

var (
	ErrGivenPageNumber = errors.New("INVALID PAGE NUMBER")
	ErrEmptyList       = errors.New("LIST IS EMPTY")
	ErrArticleNotFound = errors.New("ARTICLE NOT FOUND")
	ErrGivenArticleId  = errors.New("INVALID ARTICLE ID")
)
