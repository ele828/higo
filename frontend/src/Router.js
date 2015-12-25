import React from 'react';

import { Router, Route, Link } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import Home from './Component/Home';
import List from './Component/List';
import Article from './Component/Article';
import About from './Component/About';

import Construction from './Component/Construction';

const history = createBrowserHistory()

export default class AppRouter extends React.Component {
  render() {
    return (
          <Router history={history}>
            <Route path="/" component={Home} />
            <Route path="/list/:pageId" component={List} />
            <Route path="/article/:articleId" component={Article} />
            <Route path="/topic" component={Construction} />
            <Route path="/tag" component={Construction} />
            <Route path="/friend" component={Construction} />
            <Route path="/about" component={About} />
          </Router>
        );
  }
}
