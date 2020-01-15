import React from 'react';
import './App.css';
import { TodoContextProvider } from './contexts/todoApp';
import TodoApp from "./components/todoApp";
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  
  return (
    <TodoContextProvider>
      <Router>
        <Route path="/:filter?" component={TodoApp}/>
      </Router>
    </TodoContextProvider>
  );
}



export default App;
