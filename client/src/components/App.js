import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import '../styles/main.css';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';

class App extends Component {

  componentDidMount () {
    this.props.fetchUser();
  }

  render () {
    return (
      <div>
        <Router>
          <div>
            <Header />  
            <Route exact path="/" component={Landing} />
            <Route exact path="/dash" component={Dashboard} />
          </div>
        </Router>
      </div>
    );
  }
};

export default connect(null, actions)(App);