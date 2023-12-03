import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import GuestLayout from './components/GuestLayout'
import ProtectedLayout from './components/ProtectedLayout'

import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  },
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      {
        path: '/home',
        element: <Home />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>
)
