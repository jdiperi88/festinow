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
        return <li><a href="/api/logout">Log Out!</a></li>
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