import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';
import fetch from '../Util/fetch';
import cfg from '../Util/config';
import Navigator from './Navigator';
import styles from './List.css';

export default class Home extends Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div>
        <Navigator reset={this._resetPageId.bind(this)}/>
        <div className={[styles.back]}></div>
        <section className={styles.container}>
            Construction
        </section>
      </div>
    )
  }

}
