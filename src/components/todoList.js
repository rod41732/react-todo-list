import React, { useContext, useEffect, useState, useRef } from 'react'
import { withTodoApp } from '../hoc/withTodoApp';
import './todoList.css';
import { UrgencyIcon } from './common';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { useLabel } from '../contexts/useLabel';
import { TodoContext } from '../contexts/todoApp';
import classNames from 'classnames';
import * as _ from 'lodash';
import Modal from 'react-modal';

const filterTodo = (todos, labelId) => {
  if (labelId === -1) return todos;
  else if (labelId === -2) return todos.filter(todo => todo.urgency);
  return todos.filter(todo => todo.label === labelId);
}

const TodoItem = withTodoApp(({todoApp, todo, onDelete}) => {
  const { methods: {updateTodo}} = todoApp;
  const { text, urgency = 0, completed, label, id} = todo;
  const {label: {name}} = useLabel(label); // label name
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  
  const [localText, setLocalText] = useState(text);
  const [localUrgency, setLocalUrgency] = useState(urgency);
  const [localCompleteness, setLocalCompleteness] = useState(completed);
  
  useEffect(() => {
    const handle = setTimeout(() => {
      if (localText !== text || localUrgency !== urgency || localCompleteness !== completed) {
        updateTodo(id, {
          text: localText,
          urgency: localUrgency,
          completed: localCompleteness
        })
      } 
    }, 300);
    return () => {
      clearTimeout(handle);
    };
  });

  return (
    <div key={todo.id } className={
      classNames({
        "todo-item": true,
        editing,
      })
    }>
      <div className="p-4">
        <input type="checkbox" onClick={() => setLocalCompleteness(!localCompleteness)} checked={localCompleteness}></input>
      </div>
      <div className="p-4"> {name} {id} - {localCompleteness ? "[V]" : ""}</div>
      <p className={
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
      }}>  {text} </p>
      <input ref={inputRef} className={
        classNames({
          "p-4 todo-text": true,
          hidden: !editing,
        })
      } onBlur={() => setEditing(false)} value={localText} onChange={(evt) => {
        setLocalText(evt.target.value);
      }}/>
      <button className="p-4 remove-btn" onClick={() => {
        setLocalUrgency((localUrgency+1)%4);
      }} >
        <UrgencyIcon urgency={localUrgency}/>
      </button>
      <button className="p-4 text-red-600 remove-btn" onClick={onDelete}>
        <FontAwesomeIcon icon={faTimesCircle} />
      </button>
    </div>
  );
})

const customStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "unset",
    bottom: "unset",
    minWidth: "300px",
    // width: "50%",
    // height: "50%"
    // minWidth: "0",
    // minHeight: "0",
    transform: "translate(-50%, -50%)"
  }
}

Modal.setAppElement("#root");
// params is used for accesing params in URL
const TodoList = ({ todoApp }) => {
  const { state: {todos, selectedLabel}, methods: {removeTodo}} = todoApp;
  const [isOpen, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(-1);

  const onConfirmDelete = () => {
    if (deleteId !== -1) {
      removeTodo(deleteId);
    }
    setOpen(false)
  }
  
  const onCancelDelete = () => setOpen(false);

  return <div className="todo-list pb-8">
    <Modal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={() => {
        setDeleteId(-1);
        setOpen(false);
      }}
    >
      <h1 className="font-semibold pb-4"> Move todo # {deleteId} to trash ? </h1>
      <div> You can restore it from trash (Kapp) </div>
      <button className="float-right uppercase font-bold mx-4 py-4" onClick={onCancelDelete}> No </button>
      <button className="float-right uppercase font-bold mx-4 py-4 text-red-400" onClick={onConfirmDelete} autoFocus> Move to trash </button>
    </Modal>
    {
      filterTodo(todos, selectedLabel).map((todo, index) => {
        return <TodoItem todo={todo} key={todo.id} onDelete={() => {
          setDeleteId(todo.id);
          setOpen(true);
        }}/>
      })
    }
  </div>
};

export default withTodoApp(TodoList);