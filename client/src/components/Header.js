import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  
  renderContent () {
    switch(this.props.auth) {
      case null:
        return;
      case false:
        return (
          <div>
            <li><a href="/auth/google">Login With Google</a></li>
            <li><a href="/auth/facebook">Login With FaceBook</a></li>
          </div>
        )
      default:
        return (
          <div>
            { this.renderUserName(this.props.auth) }
            <li><a href="/api/logout">Log Out!</a></li>
          </div>
        )
    }
  }

  renderUserName (user) {
    if(user.google) {
      return <p>Logged in as: {user.google.name} </p>
    } else {
      return <p>Logged in as: {user.facebook.name} </p>
    }
  }
  
  render () {
    return (
      <div>
        <h2>Header component</h2>
        { this.renderContent() }
      </div>
    );
  }
};

const mapStateToProps = ({ auth }) => {
  return { auth };
}

export default connect(mapStateToProps)(Header);