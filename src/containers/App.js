import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import GifList from '../components/GifList';
import GifModal from '../components/GifModal';
import SearchBar from '../components/SearchBar';
import '../styles/app.css';

class App extends React.Component {
  render() {
    return(
      <div>
        <SearchBar onTermChange={ this.props.actions.requestGifs } />
        <GifList gifs={ this.props.gifs }
          onGifSelect={ selectedGif => this.props.actions.openModal({selectedGif}) } />
        <GifModal modalIsOpen={ this.props.modalIsOpen }
          selectedGif={ this.props.selectedGif }
          onRequestClose={ () => this.props.actions.closeModal() } />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gifs: state.gifs.data,
    modalIsOpen: state.modal.modalIsOpen,
    selectedGif: state.modal.selectedGif
  };
}

// bindActionCreators takes a single object whose values are action creators (in
//   this case, our Actions object that we imported from src/actions/index.js) and
//   wraps every action creator in a dispatch call so that they can be invoked
//   within the container.
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

// Connect used to link React and Redux, allowing Redux state to be pulled into
//   React as props.  There are two different function calls going on:
//   1. connect(mapStateToProps) is called, and returns another function.
//   2. The second function is then called with App passed in as an argument.
export default connect(mapStateToProps, mapDispatchToProps)(App);
