import React from 'react';

import { Router, Route, Link } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import Navigator from './Component/Navigator'
import Test from './Component/Test'
import Test1 from './Component/Test1'

const history = createBrowserHistory()

export default class AppRouter extends React.Component {
  render() {
    return (
          <Router history={history}>
            <Route path="/" component={Navigator}>
              <Route path="user1" component={Test} />
              <Route path="user2" component={Test1} />
            </Route>
          </Router>
        );
  }
}
