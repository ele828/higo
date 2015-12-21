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
      resetFunc: props.reset || function() {}
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
    })
  }

  render() {

  	const menu = navList.map( (item, i)=> {
  		return (
  				<li key={i}>
	       			<Link to={item.link[0]} onClick={()=>{ this.setState({active: i}); this.state.resetFunc(); }}
	       				className={this.state.active === i ? "highlight" : ""}>
	       				{item.name}
	       			</Link>
	       		</li>
  			)
  	});

    return (
      <section className={styles.wrap}>
      	<nav className={this.state.white?styles.whitenav:styles.nav}>
      		<div className={styles.left}>
                <Link to="/">
                    <img src={e} className={styles.logo}/>
                </Link>
      		</div>
	       	<div className={styles.right}>
	       		<ul className={styles.menu}>
                    <li>
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
