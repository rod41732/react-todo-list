import React from 'react'
import { withTodoApp } from '../hoc/withTodoApp'
import './sidebar.css';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
const labels = [

]

const Sidebar = ({todoApp}) => {
  const {labels = ["Foo", "bar", "baz", "1", "2", "Foo", "bar", "baz", "1", "2","Foo", "bar", "baz", "1", "2"]} = todoApp;
  
  return <div className="side-bar p-4 bg-red-200">
    <div>
      <div className="px-2 py-2 bg-white rounded-t-lg divider"> All notes </div>
      <div className="px-2 py-2 bg-white rounded-b-lg divider"> Reminders  </div>
    </div>

    <div className="labels-list">
      <p className="py-2 bg-red-200 shadow-lg"> LISTS </p>
      <div>
        {
          labels.map((listName, idx) => {
            return <Link to={"/labels/" + listName}>
              <div className={
                classnames({
                  // "rounded-t-lg": idx == 0,
                  // "rounded-b-lg": idx == labels.length-1, 
                  "px-2 py-2 hover:bg-red-400": true,
                  "divider": idx != labels.length-1,
                })
              }> {listName} </div>
            </Link>
          })
        }
      </div>
    </div>
  </div>
}


export default withTodoApp(Sidebar);