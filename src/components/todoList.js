import React from 'react'
import { withTodoApp } from '../hoc/withTodoApp';
// params is used for accesing params in URL
const TodoList = ({todoApp}) => {
  const {removeTodo, toggleTodo, todos} = todoApp;
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

export default withTodoApp(TodoList);