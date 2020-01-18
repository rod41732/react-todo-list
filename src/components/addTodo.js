import React, { useState } from 'react';
import { withTodoApp } from '../hoc/withTodoApp';
import './addTodo.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import { UrgencyIcon } from './common';

import { apiRoot } from "../actions/config";
import * as actions from "../actions/actions";
import request from 'superagent';



const AddTodo = ({todoApp}) => {
  const [text, setText] = useState("")
  const [urgency, setUrgency] = useState(0);
  
  let {state: {selectedLabel}, dispatch} = todoApp;
  const [isBusy, setBusy] = useState(false);
  selectedLabel = Math.max(selectedLabel, 0); // if selecting 'All -1 /Reminder -2, add to 'no catergory'

  const addTodo = (todo) => {
    setBusy(true);
    request.post(`${apiRoot}/todos`)
      .send(todo)
      .then((res) => {
        dispatch(actions.addTodo(JSON.parse(res.text)));
      })
      .catch(console.error)
      .finally(() => {
        setBusy(false);
      })
  }

  const handleTextChange = (evt) => {
    setText(evt.target.value);
  }

  const toggleUrgency = () => {
    setUrgency((urgency + 1)%4);
  }


  return <div className="add-todo">
    <input 
      disabled={isBusy}
      className="px-4 p-2 bg-gray-200 todo-input rounded-lg"
      value={text} onChange={handleTextChange} 
      placeholder="What to do..." 
    />
    <button disabled={isBusy} className={
      classnames({
        "px-4 py-2": true,
      })
    } onClick={toggleUrgency}> 
      <UrgencyIcon urgency={urgency}/>
     </button>
    <button disabled={isBusy} className="px-4 py-2" onClick={() => addTodo({
      text,
      urgency,
      label: selectedLabel,
    })}> 
      <FontAwesomeIcon icon={faPlus}/>
     </button>
    {/* <button className="px-4 py-2" onClick={() => todoApp.addTodoWithDelay(text)}> AddWithDelay </button> */}
  </div>;
}

export default withTodoApp(AddTodo)
