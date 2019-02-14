import { createStore } from 'redux'
import todoAppReducer from './reducers'

let store = createStore(todoAppReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
