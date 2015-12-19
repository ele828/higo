import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router'
import xhr from '../Util/xhr';

export default class Test extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      list: null
    }
  }

  componentWillMount() {
  	// this.state = true;
    xhr("http://localhost:8080/read?id=2",
      {
        type: 'GET',
        onsuccess: (resp, xhr) => {

          console.log(resp)

          this.setState({
            list: JSON.parse(resp)
          })

        }
      }
    );
  }

  componentDidMount() {
  }


  render() {

    const listView = this.state.list? (
          <div>
            <h1>LIST</h1>
            <h2>{this.state.list.ID}</h2>
            <h2>{this.state.list.Title}</h2>
            <h2>{this.state.list.Comment[0].Content}</h2>
          </div>
        ):
       (<div></div>);
    return (
      <div>
        {listView}
      </div>
    )
  }

}
