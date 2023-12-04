import React from 'react'
import { useAuth } from '../contexts/AuthContext'

function Users() {
  const {} = useAuth()

  return (
    <div>
      <div>Users Page</div>
    </div>
  )
}

export default Users
