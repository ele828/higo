package model

import "sync/atomic"

type Tag struct {
	ID    int
	Name  string `sql:"size:255; not null;"`
	Count int32
}

func (t *Tag) Create() error {
	// Judge if this tag already exists
	if q := DB.Find(t); q.Error == nil {
		t.Count = atomic.AddInt32(&t.Count, 1)
	}

	if q := DB.Create(t); q.Error != nil {
		return q.Error
	}
	return nil
}
