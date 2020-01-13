import React from 'react';
import './App.css';
import useTodoList from './hooks/useTodoList';
import { TodoContextProvider } from './contexts/todoApp';
import TodoApp from "./components/todoApp";
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {

  const todoApp = useTodoList();

  return (
    <TodoContextProvider value={todoApp}>
      <Router>
        <Route path="/:filter?" component={TodoApp}/>
      </Router>
    </TodoContextProvider>
  );
}



export default App;
