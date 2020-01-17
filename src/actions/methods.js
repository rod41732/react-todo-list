import * as actions from './actions';

import request from 'superagent';
import * as _ from 'lodash';

const apiRoot = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '/todo-app/api';
console.log("api is at", apiRoot)

export const addTodo = (todo) => {
  return (dispatch) => {
    request.post(`${apiRoot}/todos`)
      .send(todo)
      .then((res) => {
        dispatch(actions.addTodo(todo));
      })
  }
}

export const removeTodo = (todoId) => {
  return (dispatch) => {
    request.delete(`${apiRoot}/todos/${todoId}`)
    .then(() => {
      dispatch(actions.removeTodo(todoId));
    })
    .catch(err => {
      console.error("delete todo error", err);
    })
  }
}

export const updateTodo = (todoId, todo) => {
  return (dispatch) => {
    request.patch(`${apiRoot}/todos/${todoId}`)
    .send(todo)
    .then((res) => {
      dispatch(actions.updateTodo(todoId, JSON.parse(res.text)));
    })
    .catch(console.err);
  }
}

export const updateLabel = (labelId, labelData) => {
  return (dispatch) => {
    request.patch(`${apiRoot}/labels/${labelId}`)
      .send(labelData)
      .then((res) => {
        dispatch(actions.updateLabel(labelId, JSON.parse(res.text)))
      })
      .catch(console.err);
  }
}

export const newList = () => {
  return (dispatch) => {
    request.post(`${apiRoot}/labels`)
      .send({name: "New List"})
      .then((res) => {
        dispatch(actions.addLabel(JSON.parse(res.text)))
      })
      .catch(console.err)
  }
}

export const initData = () => {
  return async (dispatch) => {
    dispatch(actions.initStarted());
    try {
      const todos = JSON.parse((await request.get(`${apiRoot}/todos`)).text);
      const labels = JSON.parse((await request.get(`${apiRoot}/labels`)).text);
      dispatch(actions.initTodos(todos));
      dispatch(actions.initLabels(labels));
      dispatch(actions.initSuccess());
    } catch (err) {
      console.error("error initializing app", err);
      dispatch(actions.initFailed(err));
    }
  }
}