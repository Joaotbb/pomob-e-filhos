import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { parseCookies } from 'nookies'
import Navbar from './Navbar'
import Footer from './Footer'

function ProtectedLayout() {
  const { isAuthenticated, user, isLoading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const validateToken = () => {
      const cookies = parseCookies()
      const token = cookies['pombo-token']

      //TODO: verificar se o token e valido
      // TODO: salva o token nos api.headers
      if (!token) {
        navigate('/')
      }
    }
    validateToken()
  }, [])

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  )
}

export default ProtectedLayout
