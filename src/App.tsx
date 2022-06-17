import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import Popup from 'reactjs-popup';

import config from './config.json'
import './App.css';

import { useAppSelector } from './app/hooks';
import { useAppDispatch } from './app/hooks';
import { selectAuth } from './slices/authSlice';
import { selectGeneralSettings } from './slices/generalSettingsSlice'
import { checkUserConnected } from './logic/authLogic';

import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Header from './components/Header';
import NavigationBar from './components/NavigationBar'
import AddRecipe from './components/AddRecipe';
import ViewRecipe from './components/ViewRecipe';
import { Redirect, LoadingScreen } from './utils';


function App() {
  document.title = config.general.title;
  const dispatch = useAppDispatch();
  const auth = useAppSelector(selectAuth);
  const generalSettings = useAppSelector(selectGeneralSettings);

  checkUserConnected(dispatch);

  let appContent: JSX.Element | null;
  if (auth.isAuthenticated === null) {
    appContent = null;
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
            <Route path='/*' element={<Redirect  redirectTo='/recipes'/>} />
            <Route path='/recipes' element={<Home />} />
            <Route path='/recipes/add' element={<AddRecipe />} />
            <Route path='users/:creatorId/recipes/:recipeId' element={<ViewRecipe />} />
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
            <Popup open={(generalSettings.isLoading === true || auth.isAuthenticated === null)} closeOnEscape={false} closeOnDocumentClick={false}>
              <LoadingScreen />
            </Popup>
        </div>
        <div id='madeBy' className='notDraggable'>
          <p>Made By <a href='https://github.com/orireiter' target='_blank' rel='noreferrer'>Ori Reiter</a></p>
        </div>
      </div>
    </ Router>
  );
}


export default App;
