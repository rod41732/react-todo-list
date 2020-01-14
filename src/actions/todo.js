import * as actionTypes from './todo.types';

export function addTodo(todo) {
  return {
    type: 'ADD_TODO',
    todo,
  };
}

export function removeTodo(index) {
  return {
    type: 'REMOVE_TODO',
    index,
  };
}

export function toggleTodo(index) {
  return {
    type: 'TOGGLE_TODO',
    index,
  };
}

export function toggleNavbar() {
  return {
    type: actionTypes.TOGGLE_NAVBAR,
  }
}

export function updateTodoText(todoId, text) {
  return {
    type: actionTypes.UPDATE_TODO_TEXT,
    todoId,
    text,
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
  console.log('selected', labelId)
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

