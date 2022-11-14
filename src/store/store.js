import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from 'redux'
import thunk from 'redux-thunk'
import { boardReducer } from './reducers/board.reducer'
import { userReducer } from './reducers/user.reducer'

const rootReducer = combineReducers({
  boardModule: boardReducer,
  userModule: userReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)
