import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { loginUser } from '../store/actions/clientActions'

const inputClass = 'border border-gray-300 bg-light rounded px-4 py-3 text-sm'

function LoginPage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    setLoading(true)
    dispatch(loginUser({ email: data.email, password: data.password }, data.rememberMe))
      .then(() => {
        // önceki sayfa varsa oraya, yoksa ana sayfaya
        if (history.length > 2) {
          history.goBack()
        } else {
          history.push('/')
        }
      })
      .catch(() => {
        toast.error('Email ya da şifre hatalı')
        setLoading(false)
      })
  }

  return (
    <div className="flex justify-center bg-light px-6 py-12">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 bg-white shadow-md rounded p-8 w-full max-w-md">
        <h3 className="text-2xl font-bold text-dark text-center">Login</h3>

        <label className="flex flex-col gap-1 text-sm font-bold text-dark">
          Email
          <input
            type="email"
            className={inputClass}
            {...register('email', {
              required: 'Email zorunlu',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Geçerli bir email gir' },
            })}
          />
          {errors.email && <span className="text-xs text-danger">{errors.email.message}</span>}
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold text-dark">
          Password
          <input type="password" className={inputClass} {...register('password', { required: true })} />
        </label>

        <label className="flex items-center gap-2 text-sm text-second">
          <input type="checkbox" {...register('rememberMe')} />
          Remember me
        </label>

        <button
          type="submit"
          disabled={loading}
          className="flex justify-center items-center gap-2 bg-primary text-white font-bold py-3 rounded disabled:opacity-60"
        >
          {loading && <Spinner size="w-4 h-4" />}
          Login
        </button>

        <p className="text-sm text-second text-center">
          Hesabın yok mu? <Link to="/signup" className="text-primary font-bold">Sign Up</Link>
        </p>
      </form>
    </div>
  )
}

export default LoginPage
