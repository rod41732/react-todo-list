import React from 'react'
import { withTodoApp } from '../hoc/withTodoApp'
import './sidebar.css';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
const labels = [

]

const Sidebar = ({ todoApp }) => {
  const {
    labels,
    selectedLabel,
  } = todoApp;
  return <div className="side-bar p-4 bg-red-200">
    <div>
      <div className="px-2 py-2 bg-white rounded-t-lg divider"> All notes </div>
      <div className="px-2 py-2 bg-white rounded-b-lg divider"> Reminders  </div>
    </div>

    <div className="labels-list">
      <p className="py-2 bg-red-200 shadow-lg"> LISTS </p>
      {
        labels.map((label, idx) => {
          return (
            <Link to={"/labels/" + label.name} className="label-item" key={idx}>
              <div className={
                classnames({
                  // "rounded-t-lg": idx == 0,
                  // "rounded-b-lg": idx == labels.length-1, 
                  "bg-red-600": selectedLabel == label.name,
                  "hover:bg-red-400 p-2": true,
                  "divider": idx != labels.length - 1,
                })
              }>
                <span className="label-name">{label.name} </span>
                <span className="todo-count"> 1 </span>
              </div>
            </Link>
          )
        })
      }
    </div>
  </div>
}


export default withTodoApp(Sidebar);