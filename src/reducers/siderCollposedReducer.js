const initState = {
  collapsed: false
}
export  function toggerCollapsed(state = initState.collapsed, action){
  console.log(state,action, '==================')
  switch (action.type){
    case 'SIDER_FLAG':
      return action.id
    default:
    return  state
  }
}
export  function currentId(state = '1', action){
  console.log(state,action, '==================')
  switch (action.type){
    case 'TOGGLE_TODO':
      return action.id
    default:
    return  state
  }
}
