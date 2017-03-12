import request from 'superagent';
import { browserHistory } from 'react-router';

export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const REQUEST_GIFS = 'REQUEST_GIFS';
export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';

const API_URL = 'http://api.giphy.com/v1/gifs/search?q=';
const API_KEY = '&api_key=dc6zaTOxFJmzC';

// The data returned by superagent request returns a Request object that is not
//   automatically resolved by Redux.  The redux-promise library adds a
//   middleware function, and if it receives a promise as a payload from an
//   action, it will dispatch the resolved value of that promise.
export function requestGifs(term = null) {
  const data = request.get(`${API_URL}${term.replace(/\s/g, '+')}${API_KEY}`);

  return {
    type: REQUEST_GIFS,
    payload: data
  };
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

export function signInUser() {
  browserHistory.push('/favorites');

  return {
    type: SIGN_IN_USER
  };
}

export function signOutUser() {
  browserHistory.push('/');

  return {
    type: SIGN_OUT_USER
  };
}
