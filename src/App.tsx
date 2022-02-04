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
import Header from './components/Header';
import NavigationBar from './components/NavigationBar'
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
          <Route path='/*' element={<Redirect  redirectTo='/login'/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
  } else {
    appContent =
        <div className="App">
          {/* <Counter /> */}
          <Routes>
            <Route path='/*' element={<Redirect  redirectTo='/'/>} />
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
  }

  return (
    <Router>
      <div id='wholeApp'>
        <Header />
        <div id='mainPage'>
            <NavigationBar />
            { appContent }
        </div>
        <div id='madeBy' className='notDraggable'>
          <p>Made By <a href='https://github.com/orireiter' target='_blank' rel='noreferrer'>Ori Reiter</a></p>
        </div>
      </div>
    </ Router>
  );
}


export default App;
