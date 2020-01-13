import React, { useState } from 'react';
import { withTodoApp } from '../hoc/withTodoApp';

const AddTodo = ({todoApp}) => {
  const [text, setText] = useState("")

  const handleTextChange = (evt) => {
    setText(evt.target.value);
  }

  return <div style={{
    display: "flex",
  }}>
    <label> What todo ? </label>
    <input value={text} onChange={handleTextChange}></input>
    <button onClick={() => todoApp.addTodo(text)}> Add </button>
    <button onClick={() => todoApp.addTodoWithDelay(text)}> AddWithDelay </button>
  </div>;
}

export default withTodoApp(AddTodo)
