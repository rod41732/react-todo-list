import React from 'react';
import './App.css';
import TodoApp from './todo/TodoApp';
import { BrowserRouter as Router, Route } from "react-router-dom";

const AddNumber = ({match : {params}}) => {
  const {a, b} = params;
  return <div> {+a} + {+b} = {+a+(+b)} </div>
}

function App() {
  return (
    <Router>
      <Route path="/:filter?" component={TodoApp}/>
      <Route path="/:a/:b?" component={AddNumber}/>
    </Router>
  );
}

export default App;
