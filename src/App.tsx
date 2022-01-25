import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import config from './config.json'
import './App.css';

import { useAppSelector } from './app/hooks';
import { useAppDispatch } from './app/hooks';
import { selectAuth } from './slices/authSlice';
import { checkUserConnected } from './logic/authLogic';
import { Redirect } from './utils';

import { Counter } from './features/counter/Counter';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home'


function App() {
  document.title = config.general.title || 'Small Words';
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  checkUserConnected(dispatch);

  console.log(window.location.pathname)
  // todo add use of url to decide upper bar name
  
  let appContent: JSX.Element;
  if (auth.isAuthenticated === null) {
    appContent =
      <div>
        <p>Loading...</p>
      </div>
  } else if (!auth.isAuthenticated) {
    appContent =
      <Router>
        <Routes>
          <Route path='/*' element={<Redirect  redirect_to='/login'/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
  } else {
    appContent =
      <Router>
        <div className="App">
          <Counter />
        </div>
        <Routes>
          <Route path="/*" element={<Home />} />
        </Routes>
      </Router>
  }

  return (
    <div id='wholeApp'>
        {appContent}
    </div>
  );
}


export default App;
