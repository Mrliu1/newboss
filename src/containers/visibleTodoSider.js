import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { siderTabAddTodo } from '../actions/siderActions'
import { SIDER_FLAG } from '../actions/siderActions'
import Side from '../sideMenu/SideMenuIndex'
const changeToggle = (collapsed = false, ownProps={}) =>{
  return collapsed
}
const tabsShowActiveFn = (key = '1', ownProps={}) =>{
  return key
}
const mapStateToProps = (state, ownProps) => ({
    collapsed:changeToggle(state.toggerCollapsed, ownProps),
    activeKeyState:tabsShowActiveFn(state.currentId, ownProps),
})
const mapDispatchToProps  = dispatch => {
  return {
    onTodoClick: (id,key) => {
      dispatch(siderTabAddTodo(id, key))
    }
  }
}
const SideList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Side)
export default SideList;
