import React from 'react'
import AddTodo from './addTodo';
import TodoList from './todoList';
import TodoFilter from './todoFilter'

const TodoApp = ({match: { params }}) => {
  console.log(params);

  return (<>
    <AddTodo/>
    <TodoList filter={params.filter}/>
    <TodoFilter/>
  </>);
} 

export default TodoApp;