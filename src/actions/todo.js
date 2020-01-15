import * as actionTypes from './todo.types';
import request from 'superagent';
import * as _ from 'lodash';

export const apiRoot = 'http://localhost:3001';

export function initTodos(todos) {
  return{
    type: actionTypes.INIT_TODO,
    todos,
  }
}

export function addTodo(todo) {
  return {
    type: 'ADD_TODO',
    todo,
  };
}

export function removeTodo(todoId) {
  return {
    type: 'REMOVE_TODO',
    todoId,
  };
}

export function toggleTodo(todoId) {
  return {
    type: 'TOGGLE_TODO',
    todoId,
  };
}

export function toggleNavbar() {
  return {
    type: actionTypes.TOGGLE_NAVBAR,
  }
}

export function updateTodoText(todoId, text) {
  return (dispatch, currentTodo) => {
    updateTodo(todoId, {text: text + "(...)"})(dispatch, currentTodo); // fake dispatch quick message
    request.patch(`${apiRoot}/todos/${todoId}`)
    .send({text})
    .then((res) => {
      updateTodo(todoId, JSON.parse(res.text))(dispatch, currentTodo);
    })
  }
}

export function updateTodoUrgency(todoId, urgency) {
  return updateTodo(todoId, {urgency})
}

export function updateTodo(todoId, todo) {
  console.log("update todo", todoId, todo);
  return (dispatch, currentTodo) => {
    dispatch({
      type: actionTypes.UPDATE_TODO,
      todoId,
      todo,
    });
  }
}


export function initLabels(labels) {
  return {
    type: actionTypes.INIT_LABEL,
    labels,
  }
}

export function updateLabel(labelId, label) {
  return {
    type: actionTypes.UPDATE_LABEL,
    labelId,
    label,
  }
}

export function selectLabel(labelId) {
  return {
    type: actionTypes.SELECT_LABEL,
    labelId,
  }
}

// export function addTodoWithDelay(text) {
//   return (dispatch, currentState) => {
//     console.log('current state =', currentState)
//     dispatch(addTodo("initial -> " + text));
//     setTimeout(() => {
//       dispatch(addTodo("delayed -> " + text))
//     }, 1000);
//   }
// }

export function filterByCompleteness(filter) {
  return {
    type: 'SET_COMPLETENESS_FILTER',
    filter,
  };
}

