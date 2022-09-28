import React, { useReducer, createContext, useContext, PropsWithChildren, Reducer } from 'react';

type TActive = 'HOUSEHOLD' | 'MENUS' | 'MEALS' | 'INGREDIENTS' | 'SETTINGS';
type TState = Record<'active', TActive> | undefined;

const NAV = ['HOUSEHOLD', 'MENUS', 'MEALS', 'INGREDIENTS', 'SETTINGS'];

const initialViewState: TState = {
  active: NAV[Math.floor(NAV.length / 2)] as TActive,
};

const activeViewReducer: Reducer<TState, { type: TActive }> = (state, action) => {
  for (const view of NAV) {
    if (action.type === view) {
      return { active: view };
    }
    return state;
  }
};

export const ActiveViewContext = createContext(initialViewState);

export const useActiveContext = () => {
  const context = useContext(ActiveViewContext);
  if (!context) {
    throw new Error('useActiveContext must be used within a ActiveContextProvider');
  }
  return context;
};

export const ActiveViewProvider = (props: PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(activeViewReducer, initialViewState);
  console.log(state);
  return <ActiveViewContext.Provider value={{ state, dispatch }} {...props} />;
};
