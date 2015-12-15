package model

type Topic struct {
	ID    int
	Name  string `sql:"size:255; not null;"`
	Link  string `sql:"size:255; not null;"`
	Desc  string `sql:"type:text;"`
	Count int8   `sql:"not null; default:0;"`
}

func(t *Topic) Create() {
	DB.Create(t)
}

// Read Topic Data From Storage.
func(t *Topic) FetchTopic(id int) error {
	q := DB.First(t, id)
	if q.Error != nil {
		return q.Error
	}
	return nil
}
