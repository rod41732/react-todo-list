import React, { useContext } from 'react'
import { withTodoApp } from '../hoc/withTodoApp'
import './sidebar.css';
import classnames from 'classnames';
import { useLabel } from '../contexts/useLabel';
import { TodoContext } from '../contexts/todoApp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const SideBarItem = ({left, right, selected, isLast, target, pkey, ...otherProps}) => {
  return (
    <div className="label-item" key={pkey} {...otherProps}>
      <div className={
        classnames({
          // "rounded-t-lg": idx === 0,
          // "rounded-b-lg": idx === labels.length-1, 
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
  const {actions:{selectLabel, selectedLabel}} = useContext(TodoContext);
  const {label, reminderCount} = useLabel(labelId);
  return <SideBarItem onClick={() => selectLabel(labelId)}
    left={label.name} right={reminderCount}
    selected={selectedLabel === labelId}
    isLast={isLast} pkey={labelId} {...otherProps}
  />
}


const Sidebar = ({ todoApp }) => {
  const {
    state: {
      labels,
      expanded: {mobile},
    },
    methods: {newList}
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
      <div className="header">
        <p className="p-2"> LISTS </p>
        <button className="p-2" onClick={newList}> <FontAwesomeIcon icon={faPlus}/></button>
      </div>
      {
        labels.map((label, idx) => {
          return <LabelSelector key={idx} labelId={label.id} isLast={idx === labels.length}/>
        })
      }
    </div>
  </div>
}

export default withTodoApp(Sidebar);