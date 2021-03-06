import React, { useState, useEffect, useRef } from 'react'
import { withTodoApp } from '../hoc/withTodoApp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import './todoHeader.css'
import { useLabel } from '../contexts/useLabel';
const TodoHeader = ({todoApp}) => {
  // const [header, setHeader] = 
  const {
    state: {selectedLabel}
  } = todoApp;

  const {label, updateLabelName, isUpdatable, reminderCount} = useLabel(selectedLabel);
  const {name, _id} = label;
  const [localName, setLocalName] = useState(name);
  
  // handle when changing list
  const localId = useRef(_id);
  if (localId.current !== _id) {
    localId.current = _id;
    setLocalName(name);
  }
  const handleInputChange = (evt) => {
    setLocalName(evt.target.value);
  }

  useEffect(() => {
    const handle = setTimeout(() => {
      if (localName !== name && isUpdatable)
        updateLabelName(localName);
    }, 300);
    return () => {
      clearTimeout(handle);
    };
  });

  return <div className='todo-header p-2' key={_id}>
    <div>
      ({reminderCount}) # {_id}
      <input value={localName} onChange={handleInputChange} readOnly={!isUpdatable} className="m-4 p-2"/>
    </div>
    <a href='#'>
      <FontAwesomeIcon icon={faEllipsisH}/>
    </a>
  </div>

};

export default withTodoApp(TodoHeader);