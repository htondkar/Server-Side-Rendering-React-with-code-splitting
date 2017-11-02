import React, { Component } from 'react'
import { Route, Switch, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Loadable from 'react-loadable'

import './App.css'

const AboutUsLoadable = Loadable({
  loader: () => import('./components/AboutUs'),
  loading() {
    return <div>Loading Contact us page ...</div>
  }
})

const ContactUsLoadable = Loadable({
  loader: () => import('./components/ContactUs.js'),
  loading() {
    return <div>Loading Contact us page...</div>
  }
})

class App extends Component {
  render() {
    const { user } = this.props
    return (
      <div className="App">
        <h3>Hello </h3>
        <Switch>
          <Route exact path="/">
            <div className="app">
              <div>Welcome {user && user.name}</div>
              <div>this is the home page</div>
              <div>
                <Link to="/about">about us</Link>
              </div>
              <div>
                <Link to="/contact">contact us</Link>
              </div>
            </div>
          </Route>
          <Route path="/about">
            <AboutUsLoadable />
          </Route>
          <Route path="/contact">
            <ContactUsLoadable />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default withRouter(connect(state => ({ user: state.user }))(App))
