import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router'
import avatar from './avatar.jpg'
import styles from './Test.css'

export default class Test extends Component {

  constructor(props, context) {
    super(props, context)
  }

  componentWillMount() {
  	// this.state = true;
  }

  componentDidMount() {
  }


  render() {
    return (
      <div>
        <div className={[styles.back]}></div>
        <div className={styles.profile}>
            <div className={styles.avatarWrap}>
                <img className={styles.avatar} src={avatar} />
            </div>
            <div>
                <ul className={styles.site}>
                    <li>Github</li>
                    <li>Linkedin</li>
                    <li>Facebook</li>
                    <li>Twitter</li>
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
