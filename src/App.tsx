import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import './styles/global.scss';
import './styles/App.scss';
import Home from './components/Home';

const App: React.FC = () => {
  const [apiResponse, setApiResponse] = useState('');

  // fetch('/api')
  //   .then(response => response.text())
  //   .then(text => setApiResponse(text));

  return (
    <BrowserRouter>
      <div className='App'>
        <Home />
        <Route path='/home' component={Home} />
      </div>
    </BrowserRouter>
  );
};

export default App;
