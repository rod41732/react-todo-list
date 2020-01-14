import React from 'react'
import { withTodoApp } from '../hoc/withTodoApp';
import './todoList.css';
import { UrgencyIcon } from './common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

const filterTodo = (todos, labelId) => {
  if (labelId == -1) return todos;
  else if (labelId == -2) return todos.filter(todo => todo.urgency);
  return todos.filter(todo => todo.label == labelId);
}

// params is used for accesing params in URL
const TodoList = ({todoApp}) => {
  const {removeTodo, toggleTodo, todos, selectedLabel} = todoApp;
  return <div className="todo-list pb-8">
    {
      filterTodo(todos, selectedLabel).map((todo, index) => {
        const { text, urgency = 0, completed, id } = todo;
        return (
          <div key={index} className="todo-item">
            <div className="p-4">
              <input type="checkbox" onClick={() => toggleTodo(index)} value={completed}></input>
            </div>
              <div className="p-4 todo-text">  # {id} {completed ? "[completed]" : ""} { text } </div>
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