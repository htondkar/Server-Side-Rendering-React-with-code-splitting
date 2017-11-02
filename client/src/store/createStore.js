import { createStore } from 'redux'
import rootReducer from './rootReducer'

const defaultInitialStore = {
  user: {}
}

export const storeFactory = defaultState =>
  createStore(rootReducer, defaultState || defaultInitialStore)
