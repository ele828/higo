package model
import (
	"github.com/ele828/higo/cache"
	"fmt"
)

type Topic struct {
	ID    int
	Name  string `sql:"size:255; not null;"`
	Link  string `sql:"size:255; not null;"`
	Desc  string `sql:"type:text;"`
	Count int8   `sql:"not null; default:0;"`
}

func(t *Topic) Create() error {
	db := DB.Create(t)
	if db.Error != nil {
		return db.Error
	}
	return nil
}

// Read Topic Data From Storage.
func(t *Topic) FetchTopic(id string) error {
	// Cache
	if v, ok := cache.TopicsCache[id]; ok {
		fmt.Println("hit cache")
		t = v.(*Topic)
		return nil;
	}

	q := DB.First(t, id)
	if q.Error != nil {
		return q.Error
	}
	cache.TopicsCache[id] = t
	return nil
}
