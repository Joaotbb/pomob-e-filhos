import { createContext, useContext, useState } from 'react'
import api from '../axios'
import { setCookie, destroyCookie } from 'nookies'

const AuthContent = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  // Login function
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

  // Logout function
  const logout = () => {
    console.log('Logging out...')
    destroyCookie(null, 'pombo-token')
    console.log('pombo-token cookie destroyed')
    // Remove o auth header  if is being used
    if (api.defaults.headers.common) {
      delete api.defaults.headers.common['Authorization']
    }

    setUser(null)

    console.log('User logged out - logout function executed on AuthContext')
  }

  // Register function
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

      return {
        success: false,
        message:
          error.response.data.message ||
          'An error occurred during registration.'
      }
    }
  }

  return (
    <AuthContent.Provider value={{ handleLogin, handleRegister, logout }}>
      {children}
    </AuthContent.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContent)
}
