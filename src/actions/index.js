import request from 'superagent';
import { browserHistory } from 'react-router';
import Firebase from 'firebase';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const REQUEST_GIFS = 'REQUEST_GIFS';
export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';

const API_URL = 'http://api.giphy.com/v1/gifs/search?q=';
const API_KEY = '&api_key=dc6zaTOxFJmzC';

const config = {
  apiKey: "AIzaSyBJZKukHmTVTIZ92NMkilWQMydup6RMum0",
  authDomain: "reactgifsearch-c23df.firebaseapp.com",
  databaseURL: "https://reactgifsearch-c23df.firebaseio.com",
  storageBucket: "reactgifsearch-c23df.appspot.com",
  messagingSenderId: "642613703310"
};

Firebase.initializeApp(config);

// NOTE: The data returned by superagent request returns a Request object that
//   is not automatically resolved by Redux.  The redux-promise library adds a
//   middleware function, and if it receives a promise as a payload from an
//   action, it will dispatch the resolved value of that promise.
// export function requestGifs(term = null) {
//   const data = request.get(`${API_URL}${term.replace(/\s/g, '+')}${API_KEY}`);
//
//   return {
//     type: REQUEST_GIFS,
//     payload: data
//   };
// }

// NOTE: reduxThunk forces the action creator to hold off on actually dispatching
//   the action object to the reducers until dispatch is called.
//   The .then(response => {}) resolves the promise returned by superagent
export function requestGifs(term = null) {
  return function(dispatch) {
    request.get(`${API_URL}${term.replace(/\s/g, '+')}${API_KEY}`).then(response => {
      dispatch({
        type: REQUEST_GIFS,
        payload: response
      });
    });
  }
}

export function openModal(gif) {
  return {
    type: OPEN_MODAL,
    gif
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}

export function signUpUser(credentials) {
  return function(dispatch) {
    Firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
        browserHistory.push('/favorites');
      })
      .catch(error => {
        console.log(error);
        dispatch(authError(error));
      });
  }
}

export function signInUser(credentials) {
  return function(dispatch) {
    Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser());
        browserHistory.push('/favorites');
      })
      .catch(error => {
        dispatch(authError(error));
      });
  }
}

export function signOutUser() {
  Firebase.auth().signOut();
  browserHistory.push('/');

  return {
    type: SIGN_OUT_USER
  };
}

export function authUser() {
  return {
    type: AUTH_USER
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

// Firebase.auth().onAuthStateChanged() will return a valid user object if the
//   user is signed is.
// If Firebase.auth().onAuthStateChanged() returns null, it means that the Firebase
//   auth info is no longer valid.
export function verifyAuth() {
  return function(dispatch) {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(authUser());
      } else {
        dispatch(signOutUser());
      }
    });
  }
}
