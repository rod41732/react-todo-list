import React, { useState } from 'react';
import TodoMain from './todoMain';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Login from './login';
import { withTodoApp } from '../hoc/withTodoApp';
import request from 'superagent';
import { apiRoot } from '../actions/config';



const TodoApp = ({todoApp}) => {
  const {actions: {login}, state: { init, user }, methods: {initData}} = todoApp;
  const {finished, inProgress} = init;
  const [isLoggedIn, setLoggedIn] = useState(null);


  // fetch todos from server
  if (user !== null && !inProgress && !finished) {
    console.dir(todoApp.methods)
    initData();
  }
  console.log('user is', user)
  if (user === null) {
    request.agent()
      .withCredentials()
      .get(`${apiRoot}/auth/status`)
      .then((_res) => {
        const res = JSON.parse(_res.text);
        login(res.user);
        setLoggedIn(true);
      })
      .catch(err => {
        console.error(err);
        setLoggedIn(false);
      })
  }

  console.log(user);

  if (user !== null) {
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
        {
          // don't show login panel until sure that user isn't logged in
          isLoggedIn === false && <Login/>
        }        
      </div>
    )
  }
} 

export default withTodoApp(TodoApp);
