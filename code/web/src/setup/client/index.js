// Imports
import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

// App Imports
import { store } from '../../setup/store'
import { setUser, loginSetUserLocalStorageAndCookie } from '../../modules/user/api/actions'
import ScrollToTop from '../../modules/common/ScrollToTop'
import App from './App'

// User Authentication
const token = window.localStorage.getItem('token')
if (token && token !== 'undefined' && token !== '') {
  const user = JSON.parse(window.localStorage.getItem('user'))
  if (user) {
    // Dispatch action
    store.dispatch(setUser(token, user))

    loginSetUserLocalStorageAndCookie(token, user)
  }
}

// Client App
const Client = () => (
  <Provider store={store} key="provider">
    <Router>
      <ScrollToTop>
        <App/>
      </ScrollToTop>
    </Router>
  </Provider>
)

// Mount client app
window.onload = () => {
  hydrate(
    <Client/>,
    document.getElementById('app')
  )
}

// hydrate() is a method given to us by react-dom, it's used when our html contents
// are rendered by server ( works like render() ).
// Client is a functional component, with the expected structure:
// - Provider component a.k.a. our redux store wraps
// - Router component, provides us the ability to have a multi-page app
// - ScrollToTop is a helper component that ensure we begin at page top when navigating across pages
// - Finally the actual App component.

// This script also check for a previous user, and logs that user in (set
// previous user to store) before the app is rendered, so that user does not
// have to login each time app is visited
