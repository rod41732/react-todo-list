import React from 'react'
import { connect } from 'react-redux';
import { toggleTodo, removeTodo } from "./actions";
// params is used for accesing params in URL
const TodoList = ({todos, toggleTodo, removeTodo}) => {
  return <div>
    {
      todos.map((todo, index) => {
        return (<div key={index}>
          <input type="checkbox" onClick={() => toggleTodo(index)} value={todo.completed}></input>
          <div> {todo.completed ? "[completed]" : ""} { todo.text } </div>
          <button onClick={() => removeTodo(index)}> remove </button>
        </div>);
      })
    }
  </div>
};

const mapStateToProps = (state) => ({
  todos: state.todos,
});

export default connect(
  mapStateToProps,
  // null,
  { toggleTodo, removeTodo }
)(TodoList);