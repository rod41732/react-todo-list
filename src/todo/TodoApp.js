import React from 'react'
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import { addTodo } from './actions'

const loggerMiddleware = createLogger()


export default class TodoApp extends React.Component {

  render() {
    const store = createStore(
      rootReducer,
      applyMiddleware(
        thunkMiddleware, 
        loggerMiddleware,
      )
    );

    store.dispatch(addTodo("Hello world"))

    return (<Provider store={store}>
      <AddTodo/>
      <TodoList/>
      {/* <FilterTodo/> */}
    </Provider>);
  } 
}
