export const ADD_TO_LIST = 'ADD_TO_LIST' // 添加tab
export const DELETE_TO_LIST = 'DELETE_TO_LIST' // 删除tab

export const CACHE_PAGE = 'CACHE_PAGE' // 缓存的page
export const CURRENT_PAGE = 'CURRENT_PAGE' // 当前page

export const SIDER_FLAG = 'SIDER_FLAG' // sider 的关闭或开启状态

export function siderTabAddTodo (id, key) { // 每增加一个tab需要传输id,url, name.
  return {
    type: ADD_TO_LIST,
     payload: {id, key}
  }
}

export const siderTabTodo = id =>{
  console.log(id,'------------------------')
  return {
    type: ADD_TO_LIST,
    id
  }
}





// 测试代码
let nextTodoId = 0
export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

export const toggleTodo = id => {
    console.log(id,'changre------------------------')
    return ({
      type: 'TOGGLE_TODO',
      id
    })
}

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}
