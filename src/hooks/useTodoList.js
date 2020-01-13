import { useReducer } from 'react'; 
import * as actions from '../actions/todo';
import * as actionTypes from '../actions/todo.types';

const todosReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
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







const useTodoList = () => {
  const [todos, dispatch] = useReducer(todosReducer, []);
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
    ...boundAction,  
  };
}

export default useTodoList;