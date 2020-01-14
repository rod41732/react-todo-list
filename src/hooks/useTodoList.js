import { useReducer } from 'react'; 
import * as actions from '../actions/todo';
import * as actionTypes from '../actions/todo.types';

const labelsReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_LABEL:
      return [
        ...state,
        {
          text: action.text,
          completed: false,
        }
      ];
    case actionTypes.REMOVE_LABEL:
      return state.filter(label => label.name == action.name);
    default:
      return state;
  }
}


const todosReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return [
        ...state,
        {
          ...action.todo,
          completed: false,
        }
      ];
    case actionTypes.REMOVE_TODO:
      return state.filter((_, idx) => idx != action.index);
    case actionTypes.TOGGLE_TODO:
      return state.map((todo, idx) => {
        if (idx == action.index) {
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



const fakeData = {
  todos: [{
    text: "Helloworld!!",
    completed: false,
    label: "programming",
  },{
    text: "Hey react",
    completed: false,
    label: "general",
  }],
  labels: [{
    name: 'programming',
  }, {
    name:" general",
  }, {
    name: "doge",
  }],
};



const useTodoList = () => {
  const [todos, dispatch] = useReducer(todosReducer, fakeData.todos);
  // const [labels, dispatchLabels] = useReducer(labelsReducer, fakeData.labels);
  const wrapAction = (actionCreator) => (...args) => dispatch(actionCreator(...args));
  const wrapFunction = (func) => (...args) => func(...args)(dispatch, todos);

  const boundAction = {}

  for (let actName in actions) {
    const action = actions[actName]
    const tmp = action("foo");
    if (tmp instanceof Function) { // test return type
      boundAction[actName] = wrapFunction(action);
    } else {
      boundAction[actName] = wrapAction(action);
    }
  }
  

  return {
    todos, 
    dispatch,
    selectedLabel: "programming",
    labels: fakeData.labels,
    // dispatchLabels,
    ...boundAction,  
  };
}

export default useTodoList;