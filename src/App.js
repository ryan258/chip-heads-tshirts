import React from 'react'
import { Switch, Route } from 'react-router-dom'

import './App.css'
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component.jsx'

function App() {
  return (
    <div>
      {/* Switch, when a path is matched, nothing after that is rendered */}
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route path="/shop" component={ShopPage}></Route>
      </Switch>
    </div>
  )
}

export default App
