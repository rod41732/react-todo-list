import React from 'react'
import { withTodoApp } from '../hoc/withTodoApp'
import './sidebar.css';
import classnames from 'classnames';
import { Link } from 'react-router-dom';


const SideBarItem = ({left, right, selected, isLast, target, key, ...otherProps}) => {
  return (
    <Link to={target} className="label-item" key={key} {...otherProps}>
      <div className={
        classnames({
          // "rounded-t-lg": idx == 0,
          // "rounded-b-lg": idx == labels.length-1, 
          "hover:bg-red-400": !selected,
          "bg-red-600": selected,
          "p-2": true,
          "divider": !isLast,
        })
      }>
        <span className="label-name"> {left}</span>
        <span className="todo-count"> {right} </span>
      </div>
    </Link>
  )
}


const Sidebar = ({ todoApp }) => {
  const {
    labels,
    selectedLabel,
    expanded: {mobile},
    selectLabel,
  } = todoApp;
  return <div className={
    classnames({
      "side-bar p-4 bg-red-200": true,
      "show": mobile, 
    })
  }>
    <div className="labels-list">
      { SideBarItem({left: "All Notes", selected: selectedLabel == -1, isLast: false, target: "/", key: 1,
        onClick: () => selectLabel(-1)}) }
      { SideBarItem({left: "Reminders", selected: selectedLabel == -2, isLast: false, target: "/", key: 2,
        onClick: () => selectLabel(-2)}) }
    </div>

    <div className="labels-list">
      <p className="py-2 bg-red-200 shadow-lg"> LISTS </p>
      {
        labels.map((label, idx) => {
          return (
            <SideBarItem left={label.name} right={1} 
              selected={label.id === selectedLabel} isLast={idx != labels.length-1}
              target={"/" + label.name} key={idx}
              onClick={() => selectLabel(label.id)}
            />
          )
        })
      }
    </div>
  </div>
}


export default withTodoApp(Sidebar);