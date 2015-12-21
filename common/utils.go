package common
import "time"


// Return a date with time
// 2006-01-02 15:04:05
func FormatTime(t time.Time) string {
	return t.Format("2006-01-02 15:04:05")
}

// Return a date without time
// 2006-01-02
func FormatDate(t time.Time) string {
	return t.Format("2006-01-02")
}