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

  const {label, updateLabelName, isUpdatable, reminderCount} = useLabel(selectedLabel);

  const handleInputChange = (evt) => {
    updateLabelName(evt.target.value);
  }

  console.log("current rendered label = ", label)

  return <div className='todo-header p-2'>
    <div>
      ({reminderCount}) # {label.id}
      <input value={label.name} onChange={handleInputChange} readOnly={!isUpdatable} className="m-4 p-2"/>
    </div>
    <a href='#'>
      <FontAwesomeIcon icon={faEllipsisH}/>
    </a>
  </div>

};

export default withTodoApp(TodoHeader);