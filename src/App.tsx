import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import config from './config.json'
import './App.css';

import { useAppSelector } from './app/hooks';
import { useAppDispatch } from './app/hooks';
import { selectAuth } from './slices/authSlice';
import { checkUserConnected } from './logic/authLogic';

import { Counter } from './features/counter/Counter';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { Redirect } from './utils';


function App() {
  document.title = config.general.title || 'Small Words';
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  checkUserConnected(dispatch);

  let appContent: JSX.Element;
  if (auth.isAuthenticated === null) {
    appContent =
      <div>
        <p>Loading...</p>
      </div>
  } else if (!auth.isAuthenticated) {
    appContent =
        <Routes>
          <Route path='/*' element={<Redirect  redirect_to='/login'/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
  } else {
    appContent =
        <div className="App">
          <Counter />
          <Routes>
            <Route path="/*" element={<Home />} />
          </Routes>
        </div>
  }

  return (
    <Router>
      <div id='wholeApp'>
        <Navbar />
        <div id='mainPage'>
            { appContent }
        </div>
      </div>
    </ Router>
  );
}


export default App;
