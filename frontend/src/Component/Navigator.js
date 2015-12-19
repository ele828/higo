import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import styles from './Navigator.css'
import Profile from './Profile'

const navList = [
        {
          name: 'HOME',
          link: '/'
        },{
          name: 'ARTICLE',
          link: '/user1'
        }, {
          name: 'TOPIC',
          link: '/user2'
        }, {
          name: 'ABOUT',
          link: '/'
        }
    ];

export default class Navigator extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      active: 0
    }

  }

  componentWillMount() {
    const url = window.location.href;
    navList.forEach( (item, i)=> {
      console.log(url.indexOf(item.link))
      if(url.indexOf(item.link) > 20)
        this.setState({
          active: i
        })
    })
  }

  render() {

  	const menu = navList.map( (item, i)=> {
  		return (
  				<li key={i}>
	       			<Link to={item.link} onClick={()=>{ this.setState({active: i}) }}
	       				className={this.state.active === i ? "highlight" : ""}>
	       				{item.name}
	       			</Link>
	       		</li>
  			)
  	});

    return (
      <section className={styles.wrap}>
      	<nav className={styles.nav}>
      		<div className={styles.left}>
      		  <Profile />
      		</div>
	       	<div className={styles.right}>
	       		<ul className={styles.menu}>
		       		{menu}

		       	</ul>
	       	</div>
	    </nav>
	      {this.props.children}
      </section>
    )
  }

}
