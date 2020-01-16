import React from 'react';
import TodoMain from './todoMain';
import Navbar from './navbar';
import Sidebar from './sidebar';
import { withTodoApp } from '../hoc/withTodoApp';

const TodoApp = ({todoApp}) => {
  const {state, state: { init }, methods: {initData}} = todoApp;
  console.log("-->", init);
  const {finished, inProgress} = init;
  console.log(!inProgress, !finished);
  if (!inProgress && !finished) {
    console.dir(todoApp.methods)
    initData();
  }

  return (
  <div className="grid-app">
    <Navbar/>
    <Sidebar className="side-bar"/>
    <TodoMain/>
  </div>);
} 

export default withTodoApp(TodoApp);
