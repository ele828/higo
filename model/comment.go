package model

import "time"

type Comment struct {
	ID       int
	Name     string `sql:"size:255; not null;"`
	Email    string `sql:"size:255; not null;"`
	Content  string `sql:"type:text; not null;"`
	CreateAt time.Time `sql:"not null;"`
}
