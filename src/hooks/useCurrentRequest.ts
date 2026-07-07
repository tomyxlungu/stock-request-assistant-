import { useContext } from 'react';
import { CurrentRequestContext } from '../context/currentRequestState';

export function useCurrentRequest() {
  const context = useContext(CurrentRequestContext);
  if (!context) {
    throw new Error('useCurrentRequest must be used within a CurrentRequestProvider');
  }
  return context;
}
