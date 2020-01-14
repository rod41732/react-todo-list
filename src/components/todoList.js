import React from 'react'
import { withTodoApp } from '../hoc/withTodoApp';
import './todoList.css';
import { UrgencyIcon } from './common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

// params is used for accesing params in URL
const TodoList = ({todoApp}) => {
  const {removeTodo, toggleTodo, todos} = todoApp;
  return <div class="todo-list pb-8">
    {
      todos.map((todo, index) => {
        const { text, urgency = 0, completed } = todo;
        return (
          <div key={index} className="todo-item">
            <div className="p-4">
              <input type="checkbox" onClick={() => toggleTodo(index)} value={completed}></input>
            </div>
            <div className="p-4 todo-text"> {completed ? "[completed]" : ""} { text } </div>
            <div className="p-4">
              <UrgencyIcon urgency={urgency}/>
            </div>
            <button className="p-4 text-red-600 remove-btn" onClick={() => removeTodo(index)}>
              <FontAwesomeIcon icon={faTimesCircle}/>
            </button>
          </div>
        );
      })
    }
  </div>
};

export default withTodoApp(TodoList);