import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js';
import fetch from '../Util/fetch'
import cfg from '../Util/config'
import Navigator from './Navigator'
import avatar from './avatar.jpg'
import styles from './Article.css'
import './Markdown.css'
import './Highlight.css'

const md = MarkdownIt();
export default class Home extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
        id: props.params.articleId,
        article: null
    };

    this.fetchArticle()
  }

  highlightCode(content) {
    const re = /<pre><code>((.|\n)*?)<\/code><\/pre>/gi
    return content.replace(re,
            ($1, $2) => {
                return '<pre><code>'+hljs.highlightAuto($2).value+'</code></pre>';
            })
  }

  fetchArticle() {
      const id = this.state.id;
      fetch({
          url: [ cfg.readArticle, id ].join('')
      })
      .then((ret)=>JSON.parse(ret))
      .then((ret) => {
          md.set({
          	  html:         true,
          	  xhtmlOut:     true,
          	  breaks:       false,
          	  linkify:      true,
          	  typographer:  true,
          });
          ret.Content = md.render(ret.Content);
          ret.Content = this.highlightCode(ret.Content);
          this.setState({
              article: ret
          })
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
        <Navigator white={true}/>
        <div className={[styles.back]}></div>
        <section className={styles.container}>
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
