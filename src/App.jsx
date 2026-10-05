import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import Header from './layout/Header'
import PageContent from './layout/PageContent'
import Footer from './layout/Footer'
import { verifyToken } from './store/actions/clientActions'

function App() {
  const dispatch = useDispatch()

  // uygulama açılınca localStorage'da token varsa otomatik giriş
  useEffect(() => {
    dispatch(verifyToken())
  }, [dispatch])

  return (
    <div className="font-montserrat flex flex-col min-h-screen">
      <Header />
      <PageContent />
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App
