import React from 'react';
import { connect } from 'react-redux';
import { addTodo, addTodoWithDelay } from './actions';



const AddTodo = ({addTodo, addTodoWithDelay}) => {
  let input;

  const submit = () => {
    if (input.value) {
      addTodo(input.value);
      input.value = '';
    }
  }

  const submitWithDelay = () => {
    if (input.value) {
      addTodoWithDelay(input.value);
      input.value = '';
    }
  }

  return <div>
    <label> What todo ? </label>
    <input ref={node => input = node}></input>
    <button onClick={submit}> Add </button>
    <button onClick={submitWithDelay}> AddWithDelay </button>
  </div>;
}

const actionCreators = {
  addTodo,
  addTodoWithDelay,
}

export default connect(
  null,
  actionCreators,
)(AddTodo);

// or 
/*
  export default connect(
    null,
    { addTodo }
  )(AddTodo)
*/