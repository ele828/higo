package model

type Tag struct {
	ID    int
	Name  string `sql:"size:255; not null;"`
	Count int
}

func (t *Tag) Create() error {
	db := DB.Create(t)
	if db.Error != nil {
		return db.Error
	}
	return nil
}

