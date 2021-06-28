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
