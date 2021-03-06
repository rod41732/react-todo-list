import * as actions from './actions';

import request from 'superagent';
import * as _ from 'lodash';
import {apiRoot} from './config';

console.log("api is at", apiRoot)

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

export const deleteTodosByLabel = (labelId) => {

}

export const removeLabel = (labelId) => {
  return (dispatch) => {
    request.delete(`${apiRoot}/labels/${labelId}`)
    .then(() => {
      dispatch(actions.removeLabel(labelId));
    })
    .catch(console.error)
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

export const checkStatus = () => {

}

export const login = (username, password) => {
  return async (dispatch) => {
    request.agent().post(`${apiRoot}/auth/login`)
      .send({username, password})
      .then(res => {
        console.log(res);
        const {id } = JSON.parse(res.text);
        dispatch(actions.login(id));
      })
      .catch(console.error)
  }
}