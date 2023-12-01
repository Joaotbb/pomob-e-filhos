import { useForm } from 'react-hook-form'
import api from '../axios'

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {
    api
      .post('/login', data)
      .then((response) => {
        console.log('Login successful:', response)
        // Handle success here (e.g., redirect, show message)
      })
      .catch((error) => {
        console.error('Login failed:', error)
        // Handle error here (e.g., show error message)
      })
    console.log(data)
  }

  return (
    <>
      <div>Estou no Login</div>

      {/* "handleSubmit" will validate your inputs before invoking "onSubmit"  */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type='email'
          placeholder='email'
          {...register('email')}
        />
        <input
          type='password'
          placeholder='password'
          {...register('password')}
        />
        <button type='submmit'>Submmit</button>
      </form>
    </>
  )
}

export default Login
