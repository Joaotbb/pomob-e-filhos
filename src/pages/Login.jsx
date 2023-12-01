import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

function Login() {
  const { handleLogin, user } = useAuth()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    const result = await handleLogin(data)
    console.log('Result', result)
    if (result.success) {
      navigate('/profile')
    } else {
      alert('NO LOGIN FOR SOME REASON')
    }
    // salva o token nos api.headers 
  }

  return (
    <>
      {user ? <div>{user.name}</div> : null}
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
