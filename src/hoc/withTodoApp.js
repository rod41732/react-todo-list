import React, {useContext} from 'react'
import { TodoContext } from "../contexts/todoApp"

export const withTodoApp = (Component) => ({...props}) => { 
  return <Component todoApp={useContext(TodoContext)} {...props}></Component>
}