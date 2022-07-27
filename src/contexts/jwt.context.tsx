import React, { createContext, useEffect, useRef } from 'react'

import { setAccessToken } from '../services/axios'

import { useAuth } from './auth.context'

const JwtContext = createContext({})

interface IProps {
  children: any
}

const JwtContextProvider: React.FC<IProps> = props => {
  const { setToken, onLogout } = useAuth()
  
  useEffect(() => {
    setAccessToken({
      onLogout: () => {
        onLogout()
      },
    })
  }, [onLogout, setToken])

  return <JwtContext.Provider value={{}}>{props?.children}</JwtContext.Provider>
}

export default JwtContextProvider
