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

import { Counter } from './features/counter/Counter';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home'


function App() {
  document.title = config.general.title || 'Small Words';

  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);

  checkUserConnected(dispatch);
  if (auth.isAuthenticated === null) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path='/*' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="App">
        <Counter />
      </div>
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
}



export default App;
