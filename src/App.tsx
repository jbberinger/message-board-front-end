import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './styles/App.scss';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/signup/finish' component={Signup} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
