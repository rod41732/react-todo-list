import React from 'react';
import { useReducer } from 'react'; 

import * as actions from '../actions/actions';
import * as methods from '../actions/methods';
import reducer from '../actions/reducer';

const initialState = {
  todos: [],
  labels: [],
  expanded: {
    desktop: false,
    mobile: false,
  },
  selectedLabel: -1,
  user: null, 
  init: {finished: false, inProgress: false}
};



export const TodoContext  = React.createContext({});

export const TodoContextProvider = ({children}) => {

  const [state, dispatch] = useReducer(reducer, initialState);


  const wrapActionCreator = (actionCreator) => (...args) => {
    dispatch(actionCreator(...args));
  }

  const wrapMethod = (method) => (...args) => {
    method(...args)(dispatch);
  }

  const boundActions = {};
  for (let [name, actionCreator] of Object.entries(actions)) {
    boundActions[name] = wrapActionCreator(actionCreator);
  }

  const boundMethods = {};
  for (let [name, method] of Object.entries(methods)) {
    boundMethods[name] = wrapMethod(method);
  }
  

  return <TodoContext.Provider value={
    {
      state,
      dispatch,
      actions: boundActions,
      methods: boundMethods
    }
  }>
    {children}
  </TodoContext.Provider>;
}

export const TodoContextConsumer = TodoContext.Consumer;
