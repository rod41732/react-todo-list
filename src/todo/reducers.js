import * as actionTypes from './actionTypes';
import {combineReducers} from 'redux';

const initialState = {
  todos: [],
  filter: 'SHOW_ALL',
};

function todos(state = [], action) {
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

function filter(state = 'SHOWALL', action) {
  switch (action.type) {
    case actionTypes.SET_COMPLETENESS_FILTER:
      return action.filter;
    default:
      return state;
  }
}

const todoApp = combineReducers({
  todos,
  filter,
});


export default todoApp; // root reducer