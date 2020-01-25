import React from 'react';
import AddTodo from './addTodo';
import TodoList from './todoList';
import TodoHeader from './todoHeader';
import './todoMain.css';
import { withTodoApp } from '../hoc/withTodoApp';
import classnames from 'classnames';
import Spinner from './spinner';

const TodoMain = ({todoApp}) => {
  const {state: {expanded: {desktop}, init: {finished: ready}}} = todoApp;
  if (ready) {
    return <div className={
      classnames({
        "todo-main p-4": true,
        "expand-todo": desktop,
      })}>
        <TodoHeader/>
        <AddTodo/>
        <TodoList/>
    </div>;
  }
  // to inherit the expanded-ness
  return <div className={
    classnames({
      "todo-main p-4": true,
      "expand-todo": desktop,
    })} style={{
    display: "grid",
    alignItems: "center",
  }}>
    <Spinner/>
  </div>
  
}

export default withTodoApp(TodoMain);