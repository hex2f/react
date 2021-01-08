import ReactDOM from 'react-dom'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Landing from './views/Landing/Landing.jsx'

import './style.sass'

const Policy = () => {
  return (
    <div>
      <h1>Bulwark Privacy Policy</h1>
      <p>Bulwark collects no private data about you. All your 2FA tokens are encrypted and synced using your own iCloud account. For further details, please reach out to me at <a href="mailto:leah@pigeon.sh">leah@pigeon.sh</a>.</p>
    </div>
  )
}

ReactDOM.render(
  <Router>
    <Switch>
      <Route path='/' exact component={Landing} />
      <Route path='/bulwark/privacy' exact component={Policy} />
    </Switch>
  </Router>, document.getElementById('app'))
