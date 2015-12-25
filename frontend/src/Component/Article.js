import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router'
import marked from 'marked';
import hljs from 'highlight.js';
import fetch from '../Util/fetch';
import cfg from '../Util/config';
import Navigator from './Navigator';
import Loading from './Loading';
import avatar from './avatar.jpg';
import styles from './Article.css';
import './Markdown.css';
import './Highlight.css';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
});

export default class Home extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
        id: props.params.articleId,
        article: null
    };

    this.fetchArticle()
  }

  fetchArticle() {
      const start = +(new Date)
      const id = this.state.id;
      fetch({
          url: [ cfg.readArticle, id ].join('')
      })
      .then((ret)=>JSON.parse(ret))
      .then((ret) => {
          ret.Content = marked(ret.Content);
          // Wait for page animation loaded.
          const sub = +(new Date) - start;
          if(sub >= 800) {
              this.setState({
                  article: ret
              })
          } else {
              setTimeout(() => {
                  this.setState({
                      article: ret
                  })
              }, 800-sub);
          }
      })
  }

  createMarkup(str) {
      return {
          __html: this.state.article && this.state.article.Content
      }
  }

  render() {
    return (
      <div>
        <Navigator/>
        <div className={[styles.back]}></div>
        <section className={styles.container}>
            {!this.state.article?<Loading />:null}
            <div className={[styles.wrap, "markdown-body"].join(' ')}>
                <h1 className={styles.title}>
				    {this.state.article && this.state.article.Title}
			    </h1>
                <article dangerouslySetInnerHTML={this.createMarkup()}></article>
            </div>
        </section>
      </div>
    )
  }

}
