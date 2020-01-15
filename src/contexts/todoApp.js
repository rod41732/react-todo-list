import React from 'react';
import { useReducer, useState } from 'react'; 
import * as actions from '../actions/todo';
import * as actionTypes from '../actions/todo.types';
import fake from '../mock/fakedata.json';
import request from 'superagent';
import {apiRoot} from '../actions/todo';

export const TodoContext  = React.createContext({});

const labelsReducer = (state, action) => {
  const {labelId} = action;
  switch (action.type) {
    case actionTypes.INIT_LABEL:
      return action.labels;
    case actionTypes.ADD_LABEL:
      return [
        ...state,
        {
          ...action.label,
        }
      ];
    case actionTypes.REMOVE_LABEL:
      return state.filter(label => label.id !== labelId);
    case actionTypes.UPDATE_LABEL:
      const newlabels = state.map((label) => {
        if (label.id === labelId) {
          const res = {
            ...label,
            ...action.label,
          };
          return res;
        }
        return label;
      });
      return newlabels;
    default:
      return state;
  }
}

const todosReducer = (state, action) => {
  const {todoId} = action;
  switch (action.type) {
    case actionTypes.INIT_TODO:
      return action.todos;
    case actionTypes.ADD_TODO:
      return [
        ...state,
        {
          ...action.todo,
          completed: false,
        }
      ];
    case actionTypes.UPDATE_TODO:

    return state.map((todo) => {
        if (todo.id === todoId) return {
          ...todo,
          ...action.todo,
        }
        return todo;
      });
    case actionTypes.REMOVE_TODO:
      return state.filter((todo) => todo.id !== todoId);
    case actionTypes.TOGGLE_TODO:
      return state.map((todo) => {
        if (todo.id == todoId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        } else {
          return todo;
        }
      });
    default:
      return state;
  }
}


const expandedReducer = (expanded, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_NAVBAR:
      const copyState = {...expanded}
      const key = window.innerWidth <= 768 ? 'mobile' : 'desktop';
      copyState[key] = !copyState[key];
      return copyState;
    default:
      return expanded;
  }
}

const selectedLabelReducer = (selected, action) => {
  switch (action.type) {
    case actionTypes.SELECT_LABEL:
      return action.labelId;
    default:
      return selected;
  }
}


const initialState = {
  expanded: {
    desktop: false,
    mobile: false,
  },
  selectedLabel: -1,
}




export const TodoContextProvider = ({children}) => {

  const [init, setInit] = useState({hasInit: false, initing: false});

  const todoReducerPair = useReducer(todosReducer, []);
  const [todos, dispatchTodos] = todoReducerPair;

  const labelReducerPair = useReducer(labelsReducer, []);
  const [labels, dispatchLabels] = labelReducerPair;

  const expandedReducerPair = useReducer(expandedReducer, initialState.expanded);
  const [expanded, dispatchExpanded] = expandedReducerPair;

  const selectedLabelReducerPair = useReducer(selectedLabelReducer, initialState.selectedLabel);
  const [selectedLabel, dispatchSelectedLabel] = selectedLabelReducerPair;

  const { hasInit, initing} = init;
  if (!hasInit && !initing) {
    (async () => {
      setInit({
        hasInit: false,
        initing: true,
      })
      try {
        const todos = JSON.parse((await request.get(`${apiRoot}/todos`)).text);
        const labels = JSON.parse((await request.get(`${apiRoot}/labels`)).text);
        dispatchTodos(actions.initTodos(todos));
        dispatchLabels(actions.initLabels(labels));
        setInit({
          hasInit: true,
          initing: true,
        })
      } catch (err) {
        console.log("error initializing app", err);
        setInit({
          hasInit: false,
          initing: false,
        })
      }

    })()
  }

  const reducers = [todoReducerPair, labelReducerPair, expandedReducerPair, selectedLabelReducerPair];

  const wrapActionCreator = (actionCreator) => (...args) => {
    const dispatchers = reducers.map(r => r[1]);
    dispatchers.forEach (dispatcher => {
      dispatcher(actionCreator(...args));
    })
  };
  const wrapFunction = (func) => (...args) => {
    reducers.forEach(reducer => {
      const [state, dispatch] = reducer;
      func(...args)(dispatch, state);
    });
  }

  const boundAction = {}

  for (let actName in actions) {
    const action = actions[actName]
    if (!(action instanceof Function)) // skip other exports
      continue;
    const tmp = action("<test action>");
    if (tmp instanceof Function) { // test return type
      boundAction[actName] = wrapFunction(action);
    } else {
      boundAction[actName] = wrapActionCreator(action);
    }
  }
  

  return <TodoContext.Provider value={
    {
      todos, 
      dispatchTodos,
      labels,
      dispatchLabels,
      expanded,
      dispatchExpanded,
      selectedLabel,
      dispatchSelectedLabel,
      labels,
      // dispatchLabels,
      ...boundAction,  
    }
  }>
    {children}
  </TodoContext.Provider>;
}

export const TodoContextConsumer = TodoContext.Consumer;
