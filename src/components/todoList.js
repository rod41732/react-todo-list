import React, { useContext } from 'react'
import { withTodoApp } from '../hoc/withTodoApp';
import './todoList.css';
import { UrgencyIcon } from './common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { useLabel } from '../contexts/useLabel';
import { TodoContext } from '../contexts/todoApp';

const filterTodo = (todos, labelId) => {
  if (labelId == -1) return todos;
  else if (labelId == -2) return todos.filter(todo => todo.urgency);
  return todos.filter(todo => todo.label == labelId);
}

const TodoItem = withTodoApp(({todoApp, todo, index}) => {
  const {toggleTodo, removeTodo} = todoApp;
  const { text, urgency = 0, completed, label, id} = todo;
  const {label: {name}} = useLabel(label); // label name

  return (
    <div key={todo.id } className="todo-item">
      <div className="p-4">
        <input type="checkbox" onClick={() => toggleTodo(id)} value={completed}></input>
      </div>
      <div className="p-4"> {name} {id} - {completed ? "[completed]" : ""}</div>
      <div className="p-4 todo-text">  {text} </div>
      <div className="p-4">
        <UrgencyIcon urgency={urgency} />
      </div>
      <button className="p-4 text-red-600 remove-btn" onClick={() => removeTodo(id)}>
        <FontAwesomeIcon icon={faTimesCircle} />
      </button>
    </div>
  );
})

// params is used for accesing params in URL
const TodoList = ({ todoApp }) => {
  const { removeTodo, toggleTodo, todos, selectedLabel } = todoApp;
  return <div className="todo-list pb-8">
    {
      filterTodo(todos, selectedLabel).map((todo, index) => {
        return <TodoItem todo={todo} index={index}/>
      })
    }
  </div>
};

export default withTodoApp(TodoList);