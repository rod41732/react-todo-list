import React from 'react';
import { useReducer } from 'react'; 
import * as actions from '../actions/todo';
import * as actionTypes from '../actions/todo.types';

export const TodoContext  = React.createContext({});

const labelsReducer = (state, action) => {
  const {labelId} = action;
  switch (action.type) {
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
      return state.map((label) => {
        if (label.id === labelId) return {
          ...label,
          ...action.label,
        }
        return label;
      });
    default:
      return state;
  }
}

const todosReducer = (state, action) => {
  console.log('action', action);
  const {todoId, text} = action;
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return [
        ...state,
        {
          ...action.todo,
          completed: false,
        }
      ];
    case actionTypes.UPDATE_TODO_TEXT:
      return state.map((todo) => {
        if (todo.id === todoId) return {
          ...todo,
          text,
        }
        return todo;
      });
    case actionTypes.REMOVE_TODO:
      return state.filter((todo) => todo.id != todoId);
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


const fakeData = {
  todos: [{
    id: 1,
    text: "Helloworld!!",
    completed: false,
    label: "programming",
  },{
    id: 2,
    text: "Hey react",
    completed: false,
    label: "general",
  }],
  labels: [{
    id: 1,
    name: 'programming',
  }, {
    id: 2,
    name:" general",
  }, {
    id: 3,
    name: "doge",
  }],
  expanded: {
    mobile: false,
    desktop: false,
  },
  selectedLabel: -1,
};





export const TodoContextProvider = ({children}) => {
  
  const todoReducerPair = useReducer(todosReducer, fakeData.todos);
  const [todos, dispatchTodos] = todoReducerPair;

  const labelReducerPair = useReducer(labelsReducer, fakeData.labels);
  const [labels, dispatchLabels] = labelReducerPair;

  const expandedReducerPair = useReducer(expandedReducer, fakeData.expanded);
  const [expanded, dispatchExpanded] = expandedReducerPair;

  const selectedLabelReducerPair = useReducer(selectedLabelReducer, fakeData.selectedLabel);
  const [selectedLabel, dispatchSelectedLabel] = selectedLabelReducerPair;


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
      labels: fakeData.labels,
      // dispatchLabels,
      ...boundAction,  
    }
  }>
    {children}
  </TodoContext.Provider>;
}

export const TodoContextConsumer = TodoContext.Consumer;
