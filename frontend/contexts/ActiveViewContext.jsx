import React, { useReducer } from 'react';

export const ActiveViewContext = React.createContext();

const initialState = {
  active: '',
};

const activeReducer = (state, action) => {
  switch (action.type) {
    case 'MENUS':
      return { active: 'MENUS' };
    case 'MEALS':
      return { active: 'MEALS' };
    case 'PROFILE':
      return { active: 'PROFILE' };
    case 'SETTINGS':
      return { active: 'SETTINGS' };
    default:
      return { active: '' };
  }
};

export function ActiveViewProvider({ children }) {
  const [state, dispatch] = useReducer(activeReducer, initialState);

  return (
    <ActiveViewContext.Provider value={{ state, dispatch }}>
      {children}
    </ActiveViewContext.Provider>
  );
}
