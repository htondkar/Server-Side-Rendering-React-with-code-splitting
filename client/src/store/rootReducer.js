import { combineReducers } from 'redux'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_USER':
      return { ...state, user: action.newUser }

    default:
      return state
  }
}

const rootReducer = combineReducers({
  user: userReducer
})

export default rootReducer
