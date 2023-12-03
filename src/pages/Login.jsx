import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const { handleLogin, user } = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    const result = await handleLogin(data)
    if (result.success) {
      navigate('/Home')
    } else {
      alert('Login failed. Check your credentials.')
    }
  }

  return (
    <div className='flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-sm space-y-10'>
        <div>
          {/* Logo and Heading */}
          <img
            className='mx-auto h-10 w-auto'
            src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
            alt='Logo'
          />
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Sign in to your account
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-6'
        >
          {/* Email Field */}
          <input
            id='email-address'
            type='email'
            autoComplete='email'
            required
            className='relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-indigo-600'
            placeholder='Email address'
            {...register('email')}
          />
          {/* Password Field */}
          <input
            id='password'
            type='password'
            autoComplete='current-password'
            required
            className='relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-indigo-600'
            placeholder='Password'
            {...register('password')}
          />
          <p className='text-center text-sm leading-6 text-gray-500'>
  Not a member?{' '}
  <Link
    to='/register'
    className='font-semibold text-indigo-600 hover:text-indigo-500'
  >
    Register
  </Link>
</p>

          <div className='text-sm  text-center leading-6'>
            <a
              href='#'
              className='font-semibold text-indigo-600 hover:text-indigo-500'
            >
              Forgot password?
            </a>
          </div>
          {/* Submit Button */}
          <button
            type='submit'
            className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500'
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
