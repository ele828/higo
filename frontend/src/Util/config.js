// Define API url
const site = 'http://localhost:8080/api/';
export default {
    getArticleList: site + 'list?page=',
    readArticle: site + 'read?id=',
    about: site + 'about',
}
