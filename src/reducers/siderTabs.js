import {
  ADD_TO_LIST,
  DELETE_TO_LIST,
  CACHE_PAGE,
  CURRENT_PAGE
} from '../actions/siderActions.js'

export function todos (state = [], action){
  switch (action.type){
    case ADD_TO_LIST:
      return [
        ...state,
        {
          text: action.payload.id.text,
          key: action.payload.id.key,
          id: action.payload.id.id
        }
      ]
    case DELETE_TO_LIST:
      return state
    default:
     return state
  }
}
