import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router'
import Navigator from './Navigator'
import avatar from './avatar.jpg'
import styles from './List.css'

export default class Home extends Component {

  constructor(props, context) {
    super(props, context)
    if(!props.params.pageId)
        props.params.pageId = 1;
    this.state = {
        pageId: parseInt(props.params.pageId)
    }
  }

  _nextPage() {
      this.setState({
          pageId: this.state.pageId+1
      })
  }

  _prevPage() {
      if(this.state.pageId-1 <1)
        return;
      this.setState({
          pageId: this.state.pageId-1
      })
  }

  _resetPageId() {
      this.setState({
          pageId: 1
      })
  }

  render() {
    return (
      <div>
        <Navigator reset={this._resetPageId.bind(this)}/>
        <div className={[styles.back]}></div>
        <section className={styles.container}>
            <div className={styles.wrap}>
                <ul className={styles.list}>
                    <li>
                        <Link to="/article/1">
                             <h3>[前端开发] React + Go 打造单页博客应用</h3>
                        </Link>
                        <div className={styles.info}>
                            <span>2015-08-28</span>
                            <span><i className={["iconfont", styles.icon].join(' ')}>&#xe600;</i>(100)</span>
                            <span><i className={["iconfont", styles.icon].join(' ')}>&#xe601;</i>(100)</span>
                        </div>
                    </li>
                    <li>
                        <Link to="/article/1">
                             <h3>[前端开发] React + Go 打造单页博客应用</h3>
                        </Link>
                        <div className={styles.info}>
                            <span>2015-08-28</span>
                            <span><i className={["iconfont", styles.icon].join(' ')}>&#xe600;</i>(100)</span>
                            <span><i className={["iconfont", styles.icon].join(' ')}>&#xe601;</i>(100)</span>
                        </div>
                    </li>
                    <li>
                        <Link to="/article/1">
                             <h3>[前端开发] React + Go 打造单页博客应用</h3>
                        </Link>
                        <div className={styles.info}>
                            <span>2015-08-28</span>
                            <span><i className={["iconfont", styles.icon].join(' ')}>&#xe600;</i>(100)</span>
                            <span><i className={["iconfont", styles.icon].join(' ')}>&#xe601;</i>(100)</span>
                        </div>
                    </li>
                    <li>
                        <Link to="/article/1">
                             <h3>[前端开发] React + Go 打造单页博客应用</h3>
                        </Link>
                        <div className={styles.info}>
                            <span>2015-08-28</span>
                            <span><i className={["iconfont", styles.icon].join(' ')}>&#xe600;</i>(100)</span>
                            <span><i className={["iconfont", styles.icon].join(' ')}>&#xe601;</i>(100)</span>
                        </div>
                    </li>
                    <li>
                        <Link to="/article/1">
                             <h3>[前端开发] React + Go 打造单页博客应用</h3>
                        </Link>
                        <div className={styles.info}>
                            <span>2015-08-28</span>
                            <span><i className={["iconfont", styles.icon].join(' ')}>&#xe600;</i>(100)</span>
                            <span><i className={["iconfont", styles.icon].join(' ')}>&#xe601;</i>(100)</span>
                        </div>
                    </li>
                    <li>
                        <Link to="/article/1">
                             <h3>[前端开发] React + Go 打造单页博客应用</h3>
                        </Link>
                        <div className={styles.info}>
                            <span>2015-08-28</span>
                            <span><i className={["iconfont", styles.icon].join(' ')}>&#xe600;</i>(100)</span>
                            <span><i className={["iconfont", styles.icon].join(' ')}>&#xe601;</i>(100)</span>
                        </div>
                    </li>

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
