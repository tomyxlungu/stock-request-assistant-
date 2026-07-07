import { useReducer, type ReactNode } from 'react';
import {
  CurrentRequestContext,
  currentRequestReducer,
  initialCurrentRequestState,
} from './currentRequestState';

export function CurrentRequestProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(currentRequestReducer, initialCurrentRequestState);
  return (
    <CurrentRequestContext.Provider value={{ state, dispatch }}>
      {children}
    </CurrentRequestContext.Provider>
  );
}