import ReactDOM from 'react-dom'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Landing from './views/Landing/Landing.jsx'

ReactDOM.render(
  <Router>
    <Switch>
      <Route path='/' exact component={Landing} />
    </Switch>
  </Router>, document.getElementById('app'))
