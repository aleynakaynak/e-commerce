import { Switch, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ShopPage from '../pages/ShopPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/LoginPage'
import CartPage from '../pages/CartPage'

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
      </Switch>
    </main>
  )
}

export default PageContent
