import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
const filterTypes = ['SHOW_ALL', 'SHOW_COMPLETE', 'SHOW_TODO'];

const TodoFilter = () => {
  return <div>
    {filter}
    {
      filterTypes.map(ft => {
      return <NavLink to={'/' + ft}> { ft }</NavLink>
      })
    }
  </div>
};

export default TodoFilter;