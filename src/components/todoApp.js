import React from 'react';
import TodoMain from './todoMain';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Login from './login';
import { withTodoApp } from '../hoc/withTodoApp';



const TodoApp = ({todoApp}) => {
  const {state: { init }, methods: {initData}} = todoApp;
  const {finished, inProgress} = init;
  if (!inProgress && !finished) {
    console.dir(todoApp.methods)
    initData();
  }

  const isLoggedIn = false;

  if (isLoggedIn) {
    return (
    <div className="grid-app">
      <Navbar/>
      <Sidebar/>
      <TodoMain/>
    </div>);
  } else {
    return (
      <div className="grid-app">
        <Navbar/>
        <Login/>
      </div>
    )
  }
} 

export default withTodoApp(TodoApp);
