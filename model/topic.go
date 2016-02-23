package model

type Topic struct {
	ID    int
	Name  string `sql:"size:255; not null;"`
	Link  string `sql:"size:255; not null;"`
	Desc  string `sql:"type:text;"`
	Count int8   `sql:"not null; default:0;"`
}

func (t *Topic) Create() error {
	db := DB.Create(t)
	if db.Error != nil {
		return db.Error
	}
	if db.Error != nil {
		return db.Error
	}
	return nil
}

// Read Topic Data From Storage.
func (t *Topic) FetchTopic(id string) error {
	q := DB.First(t, id)
	if q.Error != nil {
		return q.Error
	}
	return nil
}

func ReadTopic(a *Article) error {
	var topic Topic
	q := DB.Model(a).Related(&topic)
	if q.Error != nil {
		return q.Error
	}
	a.Topic = topic
	return nil
}
