import React from 'react';
import AddTodo from './addTodo';
import TodoList from './todoList';
import TodoHeader from './todoHeader';
import './todoMain.css';
import { withTodoApp } from '../hoc/withTodoApp';
import classnames from 'classnames';

const TodoMain = ({todoApp}) => {
  const {expanded: {desktop}} = todoApp;
  return <div className={
    classnames({
      "todo-main p-4": true,
      "expand-todo": desktop,
    })
    }>
    <TodoHeader/>
    <AddTodo/>
    <TodoList/>
    {/* <TodoFilter/> */}
  </div>;
}

export default withTodoApp(TodoMain);