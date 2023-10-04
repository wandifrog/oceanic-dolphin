import { AppDispatchContext, AppStateContext } from 'contexts/App.context';
import { useContext } from 'react';

function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) throw new Error('useAppState must be used within a AppProvider');
  return context;
}

function useAppDispatch() {
  const context = useContext(AppDispatchContext);
  if (context === undefined) throw new Error('useAppDispatch must be used within a AppProvider');
  return context;
}

function useApp(): [AppState, AppDispatch] {
  return [useAppState(), useAppDispatch()];
}

export default useApp;
