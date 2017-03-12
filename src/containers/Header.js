import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a href="/" className="navbar-brand">React2Gifs</a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li className="nav-item">
              <a href="/login" className="nav-link">Login</a>
            </li>
            <li className="nav-item">
              <a href="/signup" className="nav-link">Sign Up</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Header);
