import React from 'react';

import { Router, Route, Link } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Home from './Component/Home';
import List from './Component/List';
import Article from './Component/Article';

const history = createBrowserHistory()

export default class AppRouter extends React.Component {
  render() {
    return (
          <Router history={history}>
            <Route path="/" component={Home} />
            <Route path="/list/:pageId" component={List} />
            <Route path="/article/:articleId" component={Article} />
          </Router>
        );
  }
}
