import { connect } from 'react-redux'
import { toggleTodo } from '../actions/siderActions'
// import TabsMenu from '../tabs/TabsIndex'
import TabsMenu from '../tabs/TABS'

const tabsShowFn = (tabsArr = [], ownProps={}) =>{
  console.log(tabsArr, 'tabsArrtabsArrtabsArrtabsArr')
  return tabsArr
}
const tabsShowActiveFn = (key = [], ownProps={}) =>{
  let keyArr = key.slice(-1)
  console.log(keyArr.length>0 ? keyArr[0].id : '1')
  return keyArr.length>0 ? keyArr[0].id : '1'
}
const changeToggle = (collapsed = false, ownProps={}) =>{
  return collapsed
}
const mapStateToProps = (state, ownProps) => ({
    tabsArr:tabsShowFn(state.todos, ownProps),
    activeKeyState:tabsShowActiveFn(state.todos, ownProps),
    collapsed:changeToggle(state.toggerCollapsed, ownProps)
})
const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
})
const tabShow = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabsMenu)
export default tabShow
