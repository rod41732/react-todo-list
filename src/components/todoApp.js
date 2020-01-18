import React from 'react';
import TodoMain from './todoMain';
import Navbar from './navbar';
import Sidebar from './sidebar';
import { withTodoApp } from '../hoc/withTodoApp';


const Login = () => {
  return <div>Login</div>
}

const TodoApp = ({todoApp}) => {
  const {state: { init }, methods: {initData}} = todoApp;
  const {finished, inProgress} = init;
  if (!inProgress && !finished) {
    console.dir(todoApp.methods)
    initData();
  }

  const isLoggedIn = true;

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
