import { actionType, alertState } from '../config/state'
import { alertReducer } from '../helpers/dataReducer'
import React, { ReactNode, useContext, useReducer, useState } from 'react'
import Reducer from '../utils/reducer'

interface AppContextData {
  fcmToken: string | undefined
  setFCMToken: (e: string | undefined) => void

  alert: any
  openAlert: (e: any) => void
  closeAlert: (e: any) => void
}

const AppContext = React.createContext<AppContextData | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [alert, dispatchAlert] = useReducer(alertReducer, alertState)
  const [fcmToken, setFCMToken] = useState<string>()

  const openAlert = (action: any) => {
    return new Reducer(alert, dispatchAlert).dispatch({
      ...action,
      type: actionType.OPEN,
    })
  }

  const closeAlert = (a: any) => {
    if (typeof alert.callback === 'function') {
      alert.callback({ isConfirm: a.isConfirm })
    }
    dispatchAlert({ type: actionType.CLOSE })
  }

  return (
    <AppContext.Provider
      value={{
        fcmToken,
        setFCMToken,
        alert,
        openAlert,
        closeAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}