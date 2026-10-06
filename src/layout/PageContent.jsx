import { Switch, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ShopPage from '../pages/ShopPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/LoginPage'
import CartPage from '../pages/CartPage'
import OrderPage from '../pages/OrderPage'
import OrdersPage from '../pages/OrdersPage'
import ContactPage from '../pages/ContactPage'
import TeamPage from '../pages/TeamPage'
import AboutPage from '../pages/AboutPage'
import ProtectedRoute from '../components/ProtectedRoute'

// sayfalar ve route'lar burada tanımlanıyor
function PageContent() {
  return (
    <main className="flex-1">
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId">
          <ProductDetailPage />
        </Route>
        <Route path="/shop/:gender/:categoryName/:categoryId">
          <ShopPage />
        </Route>
        <Route path="/shop">
          <ShopPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/cart">
          <CartPage />
        </Route>
        <Route path="/contact">
          <ContactPage />
        </Route>
        <Route path="/team">
          <TeamPage />
        </Route>
        <Route path="/about">
          <AboutPage />
        </Route>
        {/* giriş gerektiren sayfalar */}
        <ProtectedRoute path="/order">
          <OrderPage />
        </ProtectedRoute>
        <ProtectedRoute path="/orders">
          <OrdersPage />
        </ProtectedRoute>
      </Switch>
    </main>
  )
}

export default PageContent
