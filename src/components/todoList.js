import React, { useContext, useState, useRef } from 'react'
import { withTodoApp } from '../hoc/withTodoApp';
import './todoList.css';
import { UrgencyIcon } from './common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { useLabel } from '../contexts/useLabel';
import { TodoContext } from '../contexts/todoApp';
import classNames from 'classnames';
import * as _ from 'lodash';

const filterTodo = (todos, labelId) => {
  if (labelId == -1) return todos;
  else if (labelId == -2) return todos.filter(todo => todo.urgency);
  return todos.filter(todo => todo.label == labelId);
}

const TodoItem = withTodoApp(({todoApp, todo}) => {
  const { toggleTodo, removeTodo, updateTodoText, updateTodoUrgency} = todoApp;
  const { text, urgency = 0, completed, label, id} = todo;
  const {label: {name}} = useLabel(label); // label name
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();

  const [localText, setLocalText] = useState(text);
  const handleChange = useRef(_.debounce(() => {
    console.log("handle change");
    updateTodoText(id, inputRef.current.value);  
  }, 100))
  console.log(handleChange);  

  return (
    <div key={todo.id } className={
      classNames({
        "todo-item": true,
        editing,
      })
    }>
      <div className="p-4">
        <input type="checkbox" onClick={() => toggleTodo(id)} value={completed}></input>
      </div>
      <div className="p-4"> {name} {id} - {completed ? "[completed]" : ""}</div>
      <div className={
        classNames({
          "p-4 todo-text": true,
          hidden: editing,
        })
      } onClick={() => {
        setEditing(true);
        setLocalText(text); // TODO: remove this hack
        setTimeout(() => {
          inputRef.current.focus();
        }, 1); 
      }}>  {text} </div>
      <input ref={inputRef} className={
        classNames({
          "p-4 todo-text": true,
          hidden: !editing,
        })
      } onBlur={() => setEditing(false)} value={localText} onChange={(evt) => {
        setLocalText(evt.target.value);
        handleChange.current();
      }}/>
      <button className="p-4 remove-btn" onClick={() => {
        // console.log('change', (urgency+1)%4);
        updateTodoUrgency(id, (urgency+1)%4);
      }} >
        <UrgencyIcon urgency={urgency}/>
      </button>
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