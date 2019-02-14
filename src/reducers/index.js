import {combineReducers} from 'redux'
import {toggerCollapsed, currentId} from './siderCollposedReducer.js'
import {todos} from './siderTabs'

const todoAppReducer = combineReducers({
  toggerCollapsed,
  currentId,
  todos
})
export default todoAppReducer
