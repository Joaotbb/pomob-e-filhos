import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const navigate = useNavigate()
  const { handleRegister } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    const result = await handleRegister(data)
    console.log(data, 'foi esta data')
    if (result.success) {
      setShowSuccessMessage(true)
      setTimeout(() => {
        navigate('/Home')
      }, 2000) // Redirect to Home Page after 2 secs
    } else {
      alert(result.message || 'Failed on Register :(.')
    }
  }

  //TODO: name and adress and being sent as NULL, MIGHT NEED TO CHECK WHY

  return (
    <div className='flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
      {showSuccessMessage ? (
        <div
          className='p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800'
          role='alert'
        >
          Reegister Done! Redirecting...
        </div>
      ) : (
        <div className='w-full max-w-sm space-y-10'>
          <div>
            <img
              className='mx-auto h-10 w-auto'
              src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
              alt='Logo'
            />
            <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
              Register your account
            </h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-2'
          >
            <input
              id='name'
              type='text'
              className='registerinput'
              placeholder='Name'
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p className='errorinput'>{errors.name.message}</p>
            )}

            <input
              id='address'
              type='text'
              className='registerinput'
              placeholder='Address'
              {...register('address', { required: 'Address is required' })}
            />
            {errors.address && (
              <p className='errorinput'>{errors.address.message}</p>
            )}

            <input
              id='email'
              type='email'
              className='registerinput'
              placeholder='Email address'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email && (
              <p className='errorinput'>{errors.email.message}</p>
            )}

            <input
              id='password'
              type='password'
              className='registerinput'
              placeholder='Password'
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && (
              <p className='errorinput'>{errors.password.message}</p>
            )}

            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500'
            >
              Register
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Register
