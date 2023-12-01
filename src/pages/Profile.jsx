import React from 'react'
import { useAuth } from '../contexts/AuthContext'

function Profile() {
  const { user, isAuthenticated } = useAuth()
  console.log('user dentro do profile', user)
  console.log('auth dentro do profile', isAuthenticated)

  return <div> {user ? <div>{user.name}</div> : null}</div>
}

export default Profile
