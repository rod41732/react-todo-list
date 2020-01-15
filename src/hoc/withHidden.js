import React from 'react';
import className from 'classnames';


// Note: need this assume that `hidden` class does the job of hiding element !
const withHidden = (Component) => ({hidden, className: oldClass, ...otherProps}) => (
  <Component className={
    classNames({
      oldClass: true,
      hidden,
    })
  } {...otherProps}/>
);

export default withHidden;