import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';
import fetch from '../Util/fetch';
import cfg from '../Util/config';
import Navigator from './Navigator';
import styles from './List.css';

export default class Home extends Component {

  constructor(props, context) {
    super(props, context)
    if(!props.params.pageId)
        props.params.pageId = 1;
    this.state = {
        pageId: parseInt(props.params.pageId),
        lists: []
    }
    this._fetchList(props.params.pageId)
  }

  _nextPage() {
      this.setState({
          pageId: this.state.pageId+1
      })
      this._fetchList(this.state.pageId+1)
  }

  _prevPage() {
      if(this.state.pageId-1 < 1)
        return;
      this.setState({
          pageId: this.state.pageId-1
      })
      this._fetchList(this.state.pageId-1)
  }

  _resetPageId() {
      this.setState({
          pageId: 1
      })
  }

  _fetchList(pageId) {
      fetch({
          url: [cfg.getArticleList, pageId].join('')
      })
      .then((r) => JSON.parse(r))
      .then((ret)=> {
          if ( ret !== null ) {
              this.setState({
                  lists: ret
              })
          } else {
              window.history.go(-1);
          }
      })
  }

  render() {
    let listView = null;
    if (!this.state.lists) {
        listView = (
            <div style={{textAlign: "center"}}>No Content</div>
        );
    } else {
        listView = this.state.lists && this.state.lists.map( (article) => {
            return (
                <li key={article.ID}>
                    <Link to={["/article/", article.ID].join('')}>
                         <h3>{'['+article.Topic+'] '+ article.Title}</h3>
                    </Link>
                    <div className={styles.info}>
                        <span>{article.Time}</span>
                        <span><i className={["iconfont", styles.icon].join(' ')}>&#xe600;</i>{'('+article.ReadCount+')'}</span>
                        <span><i className={["iconfont", styles.icon].join(' ')}>&#xe601;</i>{'('+article.ThumbCount+')'}</span>
                    </div>
                </li>
            );
        });
    }

    return (
      <div>
        <Navigator reset={this._resetPageId.bind(this)}/>
        <div className={[styles.back]}></div>
        <section className={styles.container}>
            <div className={styles.wrap}>
                <ul className={styles.list}>
                    {listView && listView}
                </ul>
                <section className={styles.paginator}>
                    <ul>
                        <li>
                            <Link onClick={this._prevPage.bind(this)}
                                to={"/list/" + ((this.state.pageId-1)<1?1:(this.state.pageId-1))}>
                                Prev
                            </Link>
                        </li>
                        <li>
                            <Link onClick={this._nextPage.bind(this)} to={"/list/" + (this.state.pageId+1)}>
                                Next
                            </Link>
                        </li>
                    </ul>
                </section>
            </div>
        </section>
      </div>
    )
  }

}
