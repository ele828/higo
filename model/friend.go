package model

type Friend struct {
	ID       int
	SiteName string `sql:"size:255; not null;"`
	Link     string `sql:"size:255; not null;"`
	Count    int8
}

// Create a friend link
func (f *Friend) Create() error {
	db := DB.Create(f)
	if db.Error != nil {
		return db.Error
	}
	return nil
}

// Remove a friend link
func (f *Friend) Remove() error {
	q := DB.Delete(f)
	if q.Error != nil {
		return q.Error
	}
	return nil
}

// Modify a friend link
func (f *Friend) Update() error {
	q := DB.Save(f)
	if q.Error != nil {
		return q.Error
	}
	return nil
}
