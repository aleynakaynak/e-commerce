import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import api from '../api/axiosInstance'
import Spinner from '../components/Spinner'
import { fetchRoles } from '../store/actions/clientActions'

const inputClass = 'border border-gray-300 bg-light rounded px-4 py-3 text-sm'
const errorClass = 'text-xs text-danger'

function SignupPage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const roles = useSelector((state) => state.client.roles)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'onChange' })

  useEffect(() => {
    dispatch(fetchRoles())
  }, [dispatch])

  // roller gelince varsayılan olarak müşteri (customer) seçili olsun
  useEffect(() => {
    const customer = roles.find((r) => r.code === 'customer')
    if (customer) setValue('role_id', String(customer.id))
  }, [roles, setValue])

  const selectedRole = roles.find((r) => String(r.id) === watch('role_id'))
  const isStore = selectedRole?.code === 'store'

  const onSubmit = (data) => {
    // backend sadece bu alanları kabul ediyor
    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role_id: Number(data.role_id),
    }
    if (isStore) {
      formData.store = {
        name: data.store_name,
        phone: data.store_phone,
        tax_no: data.tax_no,
        bank_account: data.bank_account,
      }
    }

    setLoading(true)
    api
      .post('/signup', formData)
      .then(() => {
        toast.warning('You need to click link in email to activate your account!')
        history.goBack()
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || 'Kayıt başarısız oldu')
      })
      .finally(() => setLoading(false))
  }

  return (
    <div className="flex justify-center bg-light px-6 py-12">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 bg-white shadow-md rounded p-8 w-full max-w-md">
        <h3 className="text-2xl font-bold text-dark text-center">Sign Up</h3>

        <label className="flex flex-col gap-1 text-sm font-bold text-dark">
          Name
          <input
            className={inputClass}
            {...register('name', {
              required: 'İsim zorunlu',
              minLength: { value: 3, message: 'En az 3 karakter olmalı' },
            })}
          />
          {errors.name && <span className={errorClass}>{errors.name.message}</span>}
        </label>

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
          {errors.email && <span className={errorClass}>{errors.email.message}</span>}
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold text-dark">
          Password
          <input
            type="password"
            className={inputClass}
            {...register('password', {
              required: 'Şifre zorunlu',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                message: 'En az 8 karakter; büyük harf, küçük harf, rakam ve özel karakter içermeli',
              },
            })}
          />
          {errors.password && <span className={errorClass}>{errors.password.message}</span>}
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold text-dark">
          Password (again)
          <input
            type="password"
            className={inputClass}
            {...register('password2', {
              required: 'Şifreyi tekrar gir',
              validate: (value) => value === watch('password') || 'Şifreler eşleşmiyor',
            })}
          />
          {errors.password2 && <span className={errorClass}>{errors.password2.message}</span>}
        </label>

        <label className="flex flex-col gap-1 text-sm font-bold text-dark">
          Role
          <select className={inputClass} {...register('role_id')}>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
        </label>

        {/* mağaza seçilirse ek alanlar */}
        {isStore && (
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1 text-sm font-bold text-dark">
              Store Name
              <input
                className={inputClass}
                {...register('store_name', {
                  required: 'Mağaza adı zorunlu',
                  minLength: { value: 3, message: 'En az 3 karakter olmalı' },
                })}
              />
              {errors.store_name && <span className={errorClass}>{errors.store_name.message}</span>}
            </label>

            <label className="flex flex-col gap-1 text-sm font-bold text-dark">
              Store Phone
              <input
                placeholder="05XXXXXXXXX"
                className={inputClass}
                {...register('store_phone', {
                  required: 'Telefon zorunlu',
                  pattern: { value: /^(\+90|0)?5\d{9}$/, message: 'Geçerli bir Türkiye telefon numarası gir' },
                })}
              />
              {errors.store_phone && <span className={errorClass}>{errors.store_phone.message}</span>}
            </label>

            <label className="flex flex-col gap-1 text-sm font-bold text-dark">
              Store Tax ID
              <input
                placeholder="TXXXXVXXXXXX"
                className={inputClass}
                {...register('tax_no', {
                  required: 'Vergi no zorunlu',
                  pattern: { value: /^T\d{4}V\d{6}$/, message: 'TXXXXVXXXXXX formatında olmalı' },
                })}
              />
              {errors.tax_no && <span className={errorClass}>{errors.tax_no.message}</span>}
            </label>

            <label className="flex flex-col gap-1 text-sm font-bold text-dark">
              Store Bank Account (IBAN)
              <input
                placeholder="TR..."
                className={inputClass}
                {...register('bank_account', {
                  required: 'IBAN zorunlu',
                  pattern: { value: /^TR\d{24}$/, message: 'Geçerli bir IBAN gir (TR + 24 rakam, boşluksuz)' },
                })}
              />
              {errors.bank_account && <span className={errorClass}>{errors.bank_account.message}</span>}
            </label>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex justify-center items-center gap-2 bg-primary text-white font-bold py-3 rounded disabled:opacity-60"
        >
          {loading && <Spinner size="w-4 h-4" />}
          Sign Up
        </button>

        <p className="text-sm text-second text-center">
          Hesabın var mı? <Link to="/login" className="text-primary font-bold">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default SignupPage
