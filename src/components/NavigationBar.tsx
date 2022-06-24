import React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';

import { useAppSelector } from '../app/hooks';
import { useAppDispatch } from '../app/hooks';
import { selectGeneralSettings, closeNavbar } from '../slices/generalSettingsSlice';
import { logOut } from '../logic/authLogic';


function SignOut() {
    const dispatch = useAppDispatch();

    return (
    <Popup modal nested trigger={
        <div id='navLogout' className='clickable notDraggable'>
            <span className='material-icons'>
                logout
            </span>
            <p>Log Out</p>
        </div>
        }>
            { (close: Function) => (
                <div id='logoutPopup'>
                    <div>
                        <h2>Are you sure you want to log out?</h2>
                    </div>
                    <div id='logoutPopupButtons'>
                        <button className='clickable' onClick={() => {close(); dispatch(logOut);}}>
                            YES
                        </button>
                        <button className='clickable' onClick={() => {close();}}>
                            NO
                        </button>
                    </div>
                </div>
            )}
    </Popup>
    );
}


export default function NavigationBar() {
    const generalSettings = useAppSelector(selectGeneralSettings);
    const dispatch = useAppDispatch();
    
    return (
        <div id='navigationBar' className={(generalSettings.isNavbarOpen) ? 'navOpen' : 'navClosed'}>
            <div id='navigationLinks'>
                <Link to='/recipes' className='navigationLink clickable notDraggable'
                        onClick={() => dispatch(closeNavbar())}>
                    <span className="material-icons">
                        kitchen
                    </span>
                    <h2>All Recipes</h2>
                </Link>
                <Link to='/recipes/add' className='navigationLink clickable notDraggable'
                    onClick={() => dispatch(closeNavbar())}>
                    <span className="material-icons">
                        add
                    </span>
                    <h2>Add Recipe</h2>
                </Link>
            </div>
            <div id='navigationSettings'>
                < SignOut/>
                <span id='navSettingsButton' className='material-icons clickable notDraggable'>
                    settings
                </span>
            </div>
        </div>
    );
}