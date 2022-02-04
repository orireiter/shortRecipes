import React from 'react';

import Popup from 'reactjs-popup';

import { useAppSelector } from '../app/hooks';
import { useAppDispatch } from '../app/hooks';
import { selectGeneralSettings } from '../slices/generalSettingsSlice';
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

    return (
        <div id='navigationBar' className={(generalSettings.isNavbarOpen) ? 'navOpen' : 'navClosed'}>
            <div>
                navigation options here
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