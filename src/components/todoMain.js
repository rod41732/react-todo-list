import React from 'react';
import AddTodo from './addTodo';
import TodoList from './todoList';
import TodoFilter from './todoFilter';

const TodoMain = () => {
  return <div className="main">
    <AddTodo/>
    <TodoList/>
    <TodoFilter/>
  </div>;
}

export default TodoMain;