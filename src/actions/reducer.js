import * as actionTypes from './actions.types';
import { faTired } from '@fortawesome/free-solid-svg-icons';

const labels = (state, action) => {
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

const todos = (state, action) => {
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
      // console.log("-----------", todoId);
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


const expanded = (expanded, action) => {
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

const selectedLabel = (selected, action) => {
  switch (action.type) {
    case actionTypes.SELECT_LABEL:
      return action.labelId;
    default:
      return selected;
  }
}

const init = (init, action) => {
  // console.log(init);
  switch (action.type) {
  case actionTypes.INIT_START:
    return {...init, inProgress: true, error: null};
  case actionTypes.INIT_FAIL:
    return {...init, inProgress: false, error: action.error};
  case actionTypes.INIT_SUCCESS:
    return {...init, finished: true, error: null};
  default:
    return init;
  }
}

const reducer = (state, action) => ({
  todos: todos(state.todos, action),
  labels: labels(state.labels, action),
  selectedLabel: selectedLabel(state.selectedLabel, action),
  expanded: expanded(state.expanded, action),
  init: init(state.init, action),
});

export default reducer;