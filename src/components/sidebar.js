import React, { useContext } from 'react'
import { withTodoApp } from '../hoc/withTodoApp'
import './sidebar.css';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { updateLabel } from '../actions/todo';
import { useLabel } from '../contexts/useLabel';
import { TodoContext } from '../contexts/todoApp';


const SideBarItem = ({left, right, selected, isLast, target, pkey, ...otherProps}) => {
  return (
    <div className="label-item" key={pkey} {...otherProps}>
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
    </div>
  )
}

const LabelSelector = ({labelId, isLast, ...otherProps}) => {
  const {selectLabel, selectedLabel} = useContext(TodoContext);
  const {label, reminderCount} = useLabel(labelId);
  return <SideBarItem onClick={() => selectLabel(labelId)}
    left={label.name} right={reminderCount}
    selected={selectedLabel === labelId}
    isLast={isLast} pkey={labelId} {...otherProps}
  />
}


const Sidebar = ({ todoApp }) => {
  const {
    labels,
    selectedLabel,
    expanded: {mobile},
    selectLabel,
    updateLabel,
  } = todoApp;
  return <div className={
    classnames({
      "side-bar p-4 bg-red-200": true,
      "show": mobile, 
    })
  }>
    <div className="labels-list">
      <LabelSelector key={0} labelId={-1} isLast={false}/>
      <LabelSelector key={1} labelId={-2} isLast={true}/>
    </div>

    <div className="labels-list">
      <p className="py-2 bg-red-200 shadow-lg"> LISTS </p>
      {
        labels.map((label, idx) => {
          return <LabelSelector key={idx} labelId={label.id} isLast={idx === labels.length}/>
        })
      }
    </div>
  </div>
}

export default withTodoApp(Sidebar);