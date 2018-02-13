import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';

const App = () => {
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
};

export default App;