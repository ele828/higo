import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';
import Navigator from './Navigator';
import styles from './List.css';

export default class Cons extends Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div>
        <Navigator/>
        <section className={styles.container} style={{textAlign: 'center'}}>
            <h1>Under Construction.</h1>
            <a target="_blank" href="https://github.com/ele828/higo" style={{textDecoration: 'underline'}}>Powered by Higo</a>
        </section>
      </div>
    )
  }

}
