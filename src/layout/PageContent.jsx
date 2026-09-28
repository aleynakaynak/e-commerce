import { Switch, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'

// sayfalar ve route'lar burada tanımlanıyor
function PageContent() {
  return (
    <main className="flex-1">
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
    </main>
  )
}

export default PageContent
