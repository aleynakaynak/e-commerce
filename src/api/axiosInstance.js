import axios from 'axios'

const api = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
})

// token'ı header'a ekle / sil (Bearer yok, kartta öyle isteniyor)
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = token
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

export default api
