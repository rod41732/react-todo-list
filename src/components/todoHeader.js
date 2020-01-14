import React, { useState } from 'react'
import { withTodoApp } from '../hoc/withTodoApp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import './todoHeader.css'
import { useLabel } from '../contexts/useLabel';
const TodoHeader = ({todoApp}) => {
  // const [header, setHeader] = 
  const {
    selectedLabel
  } = todoApp;


  const {label, updateLabelName, selectThisLabel} = useLabel(selectedLabel);
  console.log(label)

  return <div className='todo-header p-2'>
    <div>
      # {label.id}
      <input value={label.name} readOnly className="m-4 p-2"/>
    </div>
    <a href='#'>
      <FontAwesomeIcon icon={faEllipsisH}/>
    </a>
  </div>

};

export default withTodoApp(TodoHeader);