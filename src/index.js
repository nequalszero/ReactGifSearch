import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Home from './containers/Home';
import Signup from './containers/Signup';
import Login from './containers/Login';
import Favorites from './containers/Favorites';
import RequireAuth from './containers/RequireAuth';

// import createBrowserHistory from 'history/createBrowserHistory' // browserHistory was removed from react-router in later versions
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

// Use IndexRoute to render Home component whenever visiting "/" path.
//   Doesn't require a path property but is still considered a child component
//   of App.
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="signup" component={Signup} />
        <Route path="login" component={Login} />
        <Route path="favorites" component={RequireAuth(Favorites)} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
