import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router'
import Navigator from './Navigator'
import avatar from './avatar.jpg'
import styles from './Home.css'

export default class Home extends Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div>
        <Navigator/>
        <div className={[styles.back]}></div>
        <div className={styles.profile}>
            <div className={styles.avatarWrap}>
                <img className={styles.avatar} src={avatar} />
                <div className={styles.intro}>
                    <b>A passionate web developer</b>
                </div>
            </div>
            <div>
                <ul className={styles.site}>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <a href="https://github.com/ele828" target="_blank">
                            Github
                        </a>
                    </li>
                    <li>
                        <a href="http://weibo.com/ele828" target="_blank">
                            Weibo
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/ele828" target="_blank">
                            Linkedin
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div className={styles.copyright}>
            <p>WWW.DOBEST.ME</p>
        </div>
      </div>
    )
  }

}
