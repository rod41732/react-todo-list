import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell as faBellSolid } from '@fortawesome/free-solid-svg-icons';
import { faBell } from "@fortawesome/free-regular-svg-icons"


const colorClasses = ['text-black', 'text-green-600', 'text-orange-600',  'text-red-600'];

export const UrgencyIcon = ({urgency}) => {
  return <div className={colorClasses[urgency]}>
    { urgency === 0 && <FontAwesomeIcon icon={faBell}/> }
    { urgency !== 0 && <FontAwesomeIcon icon={faBellSolid}/> } 
  </div>;
}