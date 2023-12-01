import { createContext, useContext, useState } from 'react'
import axios from '../axios'

const AuthContent = createContext({
  user: null,
  setUser: () => {},
  csrfToken: () => {}
})

export const AuthProvider = ({ children }) => {
  console.log('dentro do context')

  return (
    <AuthContent.Provider value={{  }}>
      {children}
    </AuthContent.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContent)
}
