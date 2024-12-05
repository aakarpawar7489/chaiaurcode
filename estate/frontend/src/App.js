import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Listings from './components/Listings.js';
import Upload from './components/Upload.js';
import Payment from './components/Payment.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/listings" component={Listings} />
        <Route path="/upload" component={Upload} />
        <Route path="/payment" component={Payment} />
      </Switch>
    </Router>
  );
}

export default App;
