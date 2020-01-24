import React, { useContext, useEffect, useState } from 'react'
import { withTodoApp } from '../hoc/withTodoApp'
import './sidebar.css';
import classnames from 'classnames';
import { useLabel } from '../contexts/useLabel';
import { TodoContext } from '../contexts/todoApp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

const SideBarItem = ({left, right, selected, isLast, target, pkey, isEditing, onDelete, ...otherProps}) => {
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
        <div>
          { isEditing && <button onClick={onDelete} className="px-2 text-red-600"> <FontAwesomeIcon icon={faTimesCircle}/></button> }
          <span className="label-name"> {left}</span>
        </div>
        <span className="todo-count"> {right} </span>
      </div>
    </div>
  )
}

const LabelSelector = ({labelId, isLast, ...otherProps}) => {
  const {actions:{selectLabel}, state: {selectedLabel}} = useContext(TodoContext);
  const {label, reminderCount} = useLabel(labelId);
  return <SideBarItem onClick={() => selectLabel(labelId)}
    left={label.name} right={reminderCount}
    selected={selectedLabel === labelId}
    isLast={isLast} pkey={labelId} {...otherProps}
  />
}

Modal.setAppElement("#root");

const customStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "unset",
    bottom: "unset",
    minWidth: "300px",
    // width: "50%",
    // height: "50%"
    // minWidth: "0",
    // minHeight: "0",
    transform: "translate(-50%, -50%)"
  }
}


const Sidebar = ({ todoApp }) => {
  const {
    state: {
      labels,
      expanded: {mobile},
    },
    methods: {newList, removeLabel},
    actions: {selectLabel},
  } = todoApp;

  const [deleteId, setDeleteId] = useState(-1);
  const [isOpen, setOpen] = useState(false);
  const [isEditing, setEditing] = useState(false);
  
  const onCancelDelete = () => {
    setOpen(false);
  }

  const onConfirmDelete = () => {
    setOpen(false);
    selectLabel(-1);
    removeLabel(deleteId);
  };

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

    <Modal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={() => {
        setDeleteId(-1);
        setOpen(false);
      }}
    >
      <h1 className="font-semibold pb-4"> Move todo # {deleteId} to trash ? </h1>
      <div> You can restore it from trash (Kapp) </div>
      <button className="float-right uppercase font-bold mx-4 py-4" onClick={onCancelDelete}> No </button>
      <button className="float-right uppercase font-bold mx-4 py-4 text-red-400" onClick={onConfirmDelete}> Move to trash </button>
    </Modal>
    
    <div className="labels-list">
      <div className="header">
        <p className="p-2"> LISTS </p>
        <div>
          <button className="p-2" onClick={() => setEditing(!isEditing)}> <FontAwesomeIcon icon={faEdit}/></button>
          <button className="p-2" onClick={newList}> <FontAwesomeIcon icon={faPlus}/></button>
        </div>
      </div>
      {
        labels.map((label, idx) => {
          return <LabelSelector isEditing={isEditing} onDelete={() => {
            setOpen(true);
            setDeleteId(label._id);
          }} key={idx} labelId={label._id} isLast={idx === labels.length}/>
        })
      }
    </div>
  </div>
}

export default withTodoApp(Sidebar);