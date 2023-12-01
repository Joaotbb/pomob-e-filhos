import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { parseCookies } from 'nookies'

function GuestLayout() {
  const navigate = useNavigate()

  useEffect(() => {
    const validateToken = () => {
      const cookies = parseCookies()
      const token = cookies['pombo-token']

      if (token) {
        navigate('/Home')
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

export default GuestLayout
