import { createStore, compose, applyMiddleware } from 'redux';

// ReduxPromise middleware is not useful for resolving promises in a conditional
//   way => reduxThunk more useful
// import ReduxPromise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import rootReducer from '../reducers';
import * as Actions from '../actions';

// Redux's compose method is used for using multiple function transformations to
//   enhance a store: in this case, Redux's applyMiddleware along with the code
//   to enable Redux DevTools.
export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(reduxThunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers.
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  // Handles page refreshes, along with code in RequireAuth container checking
  //   for presence of a user in local storage.  Using the line below on its own
  //   without checking localStorage will result in authenticated being set to
  //   false before Firebase can return its response.
  // By checking localStorage for a "firebase:authUser:" key, we can optionally
  //   prevent a redirect to the login page while waiting for the result of
  //   onAuthStateChanged to update our state.
  store.dispatch(Actions.verifyAuth());

  return store;
}
