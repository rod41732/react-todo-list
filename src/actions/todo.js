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

export function addTodoWithDelay(text) {
  return (dispatch, currentState) => {
    console.log('current state =', currentState)
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

