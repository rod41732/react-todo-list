import React, { useState } from 'react'
import { withTodoApp } from '../hoc/withTodoApp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import './todoHeader.css'
const TodoHeader = ({todoApp}) => {
  // const [header, setHeader] = 
  const {
    selectedLabel
  } = todoApp;

  return <div className='todo-header p-2'>
    <input value={selectedLabel} readOnly className="m-4 p-2"/>
    <a href='#'>
      <FontAwesomeIcon icon={faEllipsisH}/>
    </a>
  </div>

};

export default withTodoApp(TodoHeader);