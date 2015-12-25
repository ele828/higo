import React, { Component } from 'react';
import styles from './Loading.css';

// Loading hint animations
export default class Loading extends Component {
    constructor(props, context) {
        super(props, context);
    }

    // Static Component shouldn't update
    // Improve Perf
    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <div className={styles.wrap}>
                <i className={["iconfont", styles.loading].join(' ')}>&#xe603;</i>
            </div>
        );
    }

}
