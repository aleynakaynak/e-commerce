import api, { setAuthToken } from '../../api/axiosInstance'

export const setUser = (user) => ({ type: 'SET_USER', payload: user })
export const setRoles = (roles) => ({ type: 'SET_ROLES', payload: roles })
export const setTheme = (theme) => ({ type: 'SET_THEME', payload: theme })
export const setLanguage = (language) => ({ type: 'SET_LANGUAGE', payload: language })

// roller sadece store'da yoksa çekiliyor
export const fetchRoles = () => (dispatch, getState) => {
  if (getState().client.roles.length > 0) return
  api
    .get('/roles')
    .then((res) => dispatch(setRoles(res.data)))
    .catch((err) => console.log(err))
}

// login: başarılıysa user store'a, remember işaretliyse token localStorage'a
export const loginUser = (formData, rememberMe) => (dispatch) => {
  return api.post('/login', formData).then((res) => {
    const { token, ...user } = res.data
    dispatch(setUser(user))
    setAuthToken(token)
    if (rememberMe) {
      localStorage.setItem('token', token)
    }
  })
}

// uygulama açılınca token varsa doğrula (auto login)
export const verifyToken = () => (dispatch) => {
  const token = localStorage.getItem('token')
  if (!token) return

  setAuthToken(token)
  api
    .get('/verify')
    .then((res) => {
      const { token: newToken, ...user } = res.data
      dispatch(setUser(user))
      localStorage.setItem('token', newToken)
      setAuthToken(newToken)
    })
    .catch(() => {
      localStorage.removeItem('token')
      setAuthToken(null)
    })
}

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token')
  setAuthToken(null)
  dispatch(setUser({}))
}
