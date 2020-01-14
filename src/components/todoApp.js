import React from 'react';
import TodoMain from './todoMain';
import Navbar from './navbar';
import Sidebar from './sidebar';
import { useRouteMatch } from 'react-router-dom';

const TodoApp = ({match: { params }}) => {
  console.log(params);
  useRouteMatch("")
  return (
  <div className="grid-app">
    <Navbar/>
    <Sidebar className="side-bar"/>
    <TodoMain/>
  </div>);
} 

export default TodoApp;
