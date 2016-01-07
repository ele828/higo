import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import styles from './Navigator.css'
import e from './e.png'

const navList = [
        {
          name: 'Home',
          link: ['/']
        },{
          name: 'Article',
          link: ['/list/1', '/article']
        }, {
          name: 'Topic',
          link: ['/topic']
        }, {
          name: 'Tag',
          link: ['/tag']
        }, {
          name: 'Friend',
          link: ['/friend']
        }, {
          name: 'About',
          link: ['/about']
        }
    ];

export default class Navigator extends Component {
  constructor(props, context) {
    super(props, context)
    const white = props.white || false;
    this.state = {
      active: 0,
      white: white,
      resetFunc: props.reset || function() {},
      isMobile: false,
      fold: true
    }
  }

  componentWillMount() {
    const url = window.location.href;
    navList.forEach( (item, i)=> {
      item.link.forEach( (link, j) => {
          if(url.indexOf(link) > 0)
            this.setState({
              active: i
            })
      })
    });

    // calculate if it's mobile devices.
    this.updateDeviceInfo();

    // mobile detection.
    window.addEventListener("resize", ()=>{this.deviceDetection()});
  }

  componentWillUnmount() {
    window.removeEventListener("resize", ()=>{this.deviceDetection()});
  }

  deviceDetection() {
      this.updateDeviceInfo();
  }

  updateDeviceInfo() {
      var width = window.innerWidth;
      if (width <= 750) {
          this.setState({
              isMobile: true
          });
      } else {
          this.setState({
              isMobile: false,
              fold: true
          });
      }
  }

  render() {

  	const menu = navList.map( (item, i) => {
  		return (
  				<li key={i}>
	       			<Link to={item.link[0]} onClick={()=>{ this.setState({active: i}); this.state.resetFunc(); }}
	       				className={this.state.active === i ? "highlight" : ""}>
	       				{item.name}
	       			</Link>
	       		</li>
  			)
  	});
    const navHeight = this.state.isMobile
                    ? "60px"
                    : "70px";
    return (
      <section className={styles.wrap}>
      	<nav className={this.state.white?styles.whitenav:styles.nav}
            style={{
                height: !this.state.fold
                            ? "280px"
                            : navHeight
              , background: "rgba(255,255,255,0.8)"
            }}>
      		<div className={styles.left}>
                <Link to="/">
                    <img src={e} className={styles.logo}/>
                </Link>
      		</div>
            <div className={styles.button}
                style={{
                    display: this.state.isMobile
                                ? "block"
                                : "none",
                    transform: this.state.isMobile && !this.state.fold
                                 ? "rotate(-90deg)"
                                 : "rotate(0deg)"
                }}>
                <div onClick={(e) => {
                        this.setState({fold: !this.state.fold});
                    }}>
                    <i className={["iconfont", styles.icon].join(' ')}>&#xe602;</i>
                </div>
            </div>
	       	<div className={styles.right} style={{
                    opacity: this.state.isMobile && this.state.fold
                              ? '0'
                              : '1'
                    }}>
	       		<ul className={styles.menu}>
                    <li className={styles.prev}>
                        <a href="http://www.dobest.me:3000" target="_blank">
                            Prev Blog
                        </a>
                    </li>
		       		{menu}
		       	</ul>
	       	</div>
	    </nav>
      </section>
    )
  }

}
