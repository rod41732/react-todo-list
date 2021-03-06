import React from 'react';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faChevronDown, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { withTodoApp } from '../hoc/withTodoApp';
const Navbar = ({todoApp}) => {
  const {actions: {toggleNavbar}} = todoApp;

  return (
    <div className="nav-bar bg-red-500 clearfix"> 
      <div className="nav-item px-4 float-left hamburger" onClick={toggleNavbar}>
        <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
      </div>
      <div className="nav-item pl-4 float-left">TODO APP</div>
      <div className="nav-item nav-right px-8 float-right">
        <Link to={`${process.env.PUBLIC_URL}/`}>
          <div className="px-4">Menu 1 </div>
        </Link>
        <Link to={`${process.env.PUBLIC_URL}/account`}>
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faUserCircle} />
          </div>
          <div className="px-4">John Doe</div>
          <FontAwesomeIcon icon={faChevronDown}/>
        </Link>
      </div>
    </div>
  )
}

export default withTodoApp(Navbar);