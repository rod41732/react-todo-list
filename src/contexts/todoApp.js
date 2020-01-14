import React from 'react';

export const TodoContext  = React.createContext({});
export const TodoContextProvider = TodoContext.Provider;
export const TodoContextConsumer = TodoContext.Consumer;