import React from 'react'
import { Switch, Route } from 'react-router-dom'

import './App.css'

import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import SignInSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component'
import Header from './components/header/header.component'

import { auth, createUserProfileDocument } from './firebase/firebase.utils'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      currentUser: null
    }
  }

  //! Subscribe to firebase user
  // but we will also need to close subscription when this unmounts because we don't want any memory leaks
  unsubscribeFromAuth = null
  // we want Firebase to known when someone signs in and signs out - when the auth state has changed
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      // this.setState({
      //   currentUser: user
      // })
      // createUserProfileDocument(user) // we're getting back our doc ref obj

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot((snapShot) => {
          this.setState(
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              }
            }
            // ,
            // () => {
            // console.log(this.state)
            // }
          )
          console.log(this.state)
        })
        // console.log(this.state)
      } else {
        this.setState({ currentUser: userAuth })
      }

      // console.log(this.state.currentUser)
      // console.log(user)
      // whenever any changes ovvur on Firebase related to this App, Firebase will send off a status change that that user has updated and whether they've signed in or out
      // so we don't have to fetch all the time :) - this connection will always be there as long as this component is mounted on the DOM
    })
  }

  componentWillUnmount() {
    // close the subscription
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        {/* make header aware of whether a user is signed in or not */}
        <Header currentUser={this.state.currentUser} />
        {/* Switch, when a path is matched, nothing after that is rendered */}
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route path="/shop" component={ShopPage}></Route>
          <Route path="/signin" component={SignInSignUpPage}></Route>
        </Switch>
      </div>
    )
  }
}

export default App
