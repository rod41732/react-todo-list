export function addTodo(text) {
  return {
    type: 'ADD_TODO',
    text,
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

// thunk function
export function addTodoWithDelay(text) {
  return (dispatch, getState) => {
    console.log('current state =', getState)
    dispatch(addTodo("initial -> " + text));
    setTimeout(() => {
      dispatch(addTodo("delayed -> " + text))
    }, 1000);
  }
}

export function filterByCompleteness(filter) {
  return {
    type: 'SET_COMPLETENESS_FILTER',
    filter,
  };
}

