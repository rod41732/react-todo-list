import React from 'react'
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import TodoFilter from './TodoFilter'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import { addTodo } from './actions'

const loggerMiddleware = createLogger()


// match.params is passed by `Route` in react-router
// it only pass to direct child
const TodoApp = ({match: { params }}) => {
  console.log(params);
  const store = createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware, 
      loggerMiddleware,
    )
  );

  store.dispatch(addTodo("Hello world"))

  return (<Provider store={store}>
    <div> params.filter = {params.filter} </div>
    <AddTodo/>
    <TodoList filter={params.filter}/>
    <TodoFilter/>
    {/* <FilterTodo/> */}
  </Provider>);
} 

export default TodoApp;