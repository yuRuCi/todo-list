import actionTypes from './actionTypes';

export const del = (id) => {
  return {
    type: actionTypes.TODOLIST_DEL,
    payload: {
      id
    }
  }
}
export const edit = (id, content) => {
  return {
    type: actionTypes.TODOLIST_EDIT,
    payload: {
      id,
      content
    }
  }
}
export const add = (title, content) => {
  return {
    type: actionTypes.TODOLIST_ADD,
    payload: {
      id: Math.random()*100,
      title,
      content,
      isFinish: false
    }
  }
}
export const finish = (id, isFinish) => {
  return {
    type: actionTypes.TODOLIST_FINISH,
    payload: {
      id,
      isFinish
    }
  }
}