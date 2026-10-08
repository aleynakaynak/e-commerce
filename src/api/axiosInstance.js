import axios from 'axios'

// .env.local içinde VITE_API_URL varsa kendi backend'imize, yoksa Workintech API'sine bağlanır
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://workintech-fe-ecommerce.onrender.com',
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
