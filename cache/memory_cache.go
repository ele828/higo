package cache

// This is a temporary Memory Cache
// Cached all the data except first time access

var (
	ArticleCache map[string]interface{}
	TopicsCache  map[string]interface{}
)

func init() {
	ArticleCache = make(map[string]interface{})
	TopicsCache  = make(map[string]interface{})
}
