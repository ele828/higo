import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';
import marked from 'marked';
import fetch from '../Util/fetch';
import cfg from '../Util/config';
import Navigator from './Navigator';
import Loading from './Loading';
import styles from './About.css';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

export default class About extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
        content: ''
    };
    this._fetch();
  }

  _fetch() {
      fetch({
          url: cfg.about
      })
      .then((ret) => JSON.parse(ret))
      .then((ret) => {
          this.setState({
              content: marked(ret.Content)
          });
      }).catch((e) => {
          console.error(e)
      })
  }

  createMarkup(str) {
      return {
          __html: this.state.content && this.state.content
      }
  }

  render() {
    return (
      <div>
        <Navigator />
        <div className={[styles.back]}></div>
        <section className={styles.container}>
            <div className={styles.wrap}>
                <h1 className={styles.title}>About me</h1>
                {this.state.content.length==0? <Loading/>:null}
                <article dangerouslySetInnerHTML={this.createMarkup()}>
                </article>
            </div>
        </section>
      </div>
    )
  }

}
