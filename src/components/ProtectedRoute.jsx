import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Spinner from './Spinner'

// giriş yapmamış kullanıcıyı login sayfasına yönlendirir
function ProtectedRoute({ children, ...rest }) {
  const user = useSelector((state) => state.client.user)
  const token = localStorage.getItem('token')

  return (
    <Route {...rest}>
      {user.email ? (
        children
      ) : token ? (
        // token var ama doğrulama (verify) henüz bitmedi
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </Route>
  )
}

export default ProtectedRoute
