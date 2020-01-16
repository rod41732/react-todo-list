import * as actionTypes from './actions.types';


export const initTodos = (todos) => {
  return {
    type: actionTypes.INIT_TODO,
    todos,
  }
}

export const addTodo = (todo) => ({
  type: actionTypes.ADD_TODO,
  todo,
})

export const removeTodo = (todoId) => ({
  type: actionTypes.REMOVE_TODO,
  todoId,
})

export const toggleTodo = (todoId) => ({
  type: actionTypes.TOGGLE_TODO,
  todoId,
})

export const toggleNavbar = () => ({
  type: actionTypes.TOGGLE_NAVBAR,
})

export const updateTodoText = (todoId, text) => {
  return updateTodo(todoId, { text });
}

export const updateTodoUrgency = (todoId, urgency) => {
  return updateTodo(todoId, { urgency })
}

export const updateTodo = (todoId, todo) => ({
  type: actionTypes.UPDATE_TODO,
  todoId,
  todo: todo,
});

export const initLabels = (labels) => {
  return {
    type: actionTypes.INIT_LABEL,
    labels,
  }
}

export const addLabel = (label) => {
  return {
    type: actionTypes.ADD_LABEL,
    label,
  }
}

export const updateLabel = (labelId, label) => {
  return {
    type: actionTypes.UPDATE_LABEL,
    labelId,
    label,
  }
}

export const selectLabel = (labelId) => {
  return {
    type: actionTypes.SELECT_LABEL,
    labelId,
  }
}

export const filterByCompleteness = (filter) => {
  return {
    type: actionTypes.SET_COMPLETENESS_FILTER,
    filter,
  };
}

export const initStarted = () => {
  return { type: actionTypes.INIT_START };
}

export const initSuccess = () => {
  return { type: actionTypes.INIT_SUCCESS };
}

export const initFailed = (error) => {
  return { type: actionTypes.INIT_FAIL, error };
}
