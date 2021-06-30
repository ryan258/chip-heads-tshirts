import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyAJQiDleIqnVyX2qYsvpcPkK9HsDyFYYao',
  authDomain: 'chip-heads-db.firebaseapp.com',
  projectId: 'chip-heads-db',
  storageBucket: 'chip-heads-db.appspot.com',
  messagingSenderId: '867883979871',
  appId: '1:867883979871:web:932684084847b72fcef7ea'
}

// copy auth'd user into our own db, api requests are always asynchronous
// - arg0 - userAuth - the object we get back about the user
// - arg1+- then any additional data we might need (comes in the form of an object)
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // we'll get back either a valid obj or null
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`) // get the reference

  const snapShot = await userRef.get() // get a snapshot

  // console.log(snapShot) // we see the exists property, which will tell us if there is any data there

  // if user doesn't exist in our db we'll create the user in the db
  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef // in case we want the user obj to do other things
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

// setup google auth utility
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({
  // trigger google accounts pop up for authentication & sign-in
  prompt: 'select_account'
})
// .signInWithPopup() allows popup to sign in through a variety of services
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
