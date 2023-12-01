import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { parseCookies } from 'nookies'

function ProtectedLayout() {
  const { isAuthenticated, user, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const validateToken = () => {
      const cookies = parseCookies()
      const token = cookies['pombo-token']

      //TODO: todo verificar se o token e valido
      // TODO: salva o token nos api.headers 
      if (!token) {
        navigate('/')
      }
    }
    validateToken()
  }, [])

  return (
    <>
      <Outlet />
    </>
  )
}

export default ProtectedLayout
