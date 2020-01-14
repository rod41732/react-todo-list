import React from 'react';
import AddTodo from './addTodo';
import TodoList from './todoList';
import TodoFilter from './todoFilter';
import TodoHeader from './todoHeader';
import './todoMain.css';

const TodoMain = () => {
  return <div className="todo-main p-4">
    <TodoHeader/>
    <AddTodo/>
    <TodoList/>
    {/* <TodoFilter/> */}
  </div>;
}

export default TodoMain;