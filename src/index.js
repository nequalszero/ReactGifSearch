import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/SearchBar';
import GifList from './components/GifList';

// For making HTTP requests
import request from 'superagent';

import './styles/app.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gifs: []
    };
  }

  handleTermChange = (term) => {
    // If we are searching for multiple terms, they will probably be separated by a space;
    // however, if we are passing them to the Giphy API, they will need to be separated by a + character.
    const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=dc6zaTOxFJmzC`;

    request.get(url, (err, res) => {
      this.setState({ gifs: res.body.data });
    });
  }

  render() {
    return (
      <div>
        <SearchBar onTermChange={term => this.handleTermChange(term)} />
        <GifList gifs={this.state.gifs} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
