import React from 'react';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <div className="nav-bar bg-red-500 clearfix"> 
      <div className="nav-item px-8 float-left">TODO APP</div>
      <div className="nav-item nav-right px-8 float-right">
        <Link to="/">
          <div className="px-4">Menu 1 </div>
        </Link>
        <Link to="/account">
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

export default Navbar;