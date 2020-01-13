import React from 'react'
import AddTodo from './addTodo';
import TodoList from './todoList';
import TodoFilter from './todoFilter'
import Navbar from './navbar';
import { useRouteMatch } from 'react-router-dom';

const TodoApp = ({match: { params }}) => {
  console.log(params);
  useRouteMatch("")
  return (<>
    <Navbar/>
    <AddTodo/>
    <TodoList/>
    <TodoFilter/>
  </>);
} 

export default TodoApp;
