import React from 'react'
import { hydrate } from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { storeFactory } from './store/createStore'
import { BrowserRouter } from 'react-router-dom'
import Loadable from 'react-loadable'

const store = storeFactory(window._PRELOADED_STORE_)

window.main = () => {
  Loadable.preloadReady().then(() => {
    hydrate(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.getElementById('root')
    )
  })
}
