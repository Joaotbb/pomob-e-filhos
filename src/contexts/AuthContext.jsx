import { createContext, useContext, useState } from 'react'
import api from '../axios'
import { setCookie } from 'nookies'

const AuthContent = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const handleLogin = async (data) => {
    try {
      const response = await api.post('/login', data)
      const userData = response.data.user
      const token = response.data.token

      setCookie(null, 'pombo-token', token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      })
      setUser(userData)

      return { success: true }
    } catch (error) {
      console.error('Login error:', error)

      return { success: false }
    }
  }

  const handleRegister = async (data) => {
    try {
      const response = await api.post('/register', data)
      const userData = response.data.user
      const token = response.data.token

      setCookie(null, 'pombo-token', token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/'
      })
      setUser(userData)

      return { success: true }
    } catch (error) {
      console.error('Registration error:', error)

      return { success: false, message: error.response.data.message || 'An error occurred during registration.' }
    }
  }

  return (
    <AuthContent.Provider value={{ handleLogin, handleRegister }}>
      {children}
    </AuthContent.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContent)
}
