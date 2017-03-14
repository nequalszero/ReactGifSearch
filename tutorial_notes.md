# React-101 Encountered Issues
## Part 3: Routing and Auth
`react-router 4.0.0` seems to have issues with `history={browserHistory}`:
```
Warning: React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in. Warning: Failed prop type: The prop `history` is marked as required in `Router`, but its value is `undefined`.
```
By using `import createBrowserHistory from 'history/createBrowserHistory'` and `history={createBrowserHistory()}`, the error goes away but does not properly render `<IndexRoute component={Home} />`.

Downgrading to `react-router 2.8.1` to match the version used in the tutorial solved the issue without the need of the `history` library.

## Part 4: Firebase
### src/actions/index.js
`Firebase.auth().signOut();` is missing from the `signOutUser` function, right before the section on Favoriting gifs.

### src/containers/Favorite.js
In Part 3 of the tutorial, the following code is added to persist login between refreshes:
```javascript
// src/store/configureStore.js
store.dispatch(Actions.verifyAuth());
```
and
```javascript
// src/containers/RequiredAuth.js
componentWillMount() {
  if (!this.props.authenticated) {
    let hasLocalStorageUser = false;

    for (let key in localStorage) {
      if (key.startsWith("firebase:authUser:")) {
        hasLocalStorageUser = true;
      }
    }

    if (!hasLocalStorageUser) {
      browserHistory.push('/login');
    }
  }
```

Upon adding favorites and Firebase in Part 4, refreshing the page while on the `/favorites` url yields an error.  At `http://gifsearch.tighten.co/favorites`, I get text rendered on the page stating `'No input file specified.'`  Running it locally on my machine, I get the following error in my console: `Uncaught TypeError: Cannot read property 'uid' of null` coming from the `fetchFavoritedGifs` action.


```javascript
// src/actions/index.js
export function fetchFavoritedGifs() {
  return function(dispatch) {
    const userUid = Firebase.auth().currentUser.uid;

    Firebase.database().ref(userUid).on('value', snapshot => {
      dispatch({
        type: FETCH_FAVORITED_GIFS,
        payload: snapshot.val()
      })
    });
  }
}
```

This error is due to that Firebase has not yet established a currentUser.  I fixed this by modifying the Favorites container component, modifying the `componentWillMount` method and adding a `componentWillReceiveProps` method, so that the `fetchFavoritedGifs` action does not fire if authentication has not completed.

```javascript
// src/containers/Favorites.js
componentWillMount() {
  if (this.props.authenticated) {
    this.props.actions.fetchFavoritedGifs();
  }
}

componentWillReceiveProps(nextProps) {
  if (!this.props.authenticated && nextProps.authenticated) {
    this.props.actions.fetchFavoritedGifs();
  }
}
```


## Minor Detail
### `src/reducers/auth.js`
There is a residual copy and paste left over from the `gifs` reducer, with the name of the function being exported as `gifs` instead of `auth`; this might be confusing to some people.
