import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { tableReducer } from './reducers'

const rootReducer = combineReducers({ table: tableReducer })
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
export default store
