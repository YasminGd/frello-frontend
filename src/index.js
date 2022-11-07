import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { HashRouter as Router } from 'react-router-dom'
import App from './app.jsx'
import { store } from './store/store'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Router>
      <GoogleOAuthProvider clientId="1031425776599-1fk9n9l1d95umd9mtgikqjbsi5gcf571.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Router>
  </Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()
