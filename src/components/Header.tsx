import React from 'react';

import config from '../config.json'
import { useAppSelector } from '../app/hooks';
import { useAppDispatch } from '../app/hooks';
import { openCloseNavbar } from '../slices/generalSettingsSlice';
import { selectAuth } from '../slices/authSlice';

export default function Header() {
    let pageTitle = config.general.title || 'Short Recipes';
    const dispatch = useAppDispatch();
    const auth = useAppSelector(selectAuth);

    return (
        <div id='navbar'>
            {(auth.isAuthenticated) ? 
            <div id='navbarToggle'>
                <span className='material-icons clickable' onClick={() => { dispatch(openCloseNavbar()) }}>
                    menu
                </span>
            </div> : null}
            <div id='currentPageTitle'>
                <h1>{pageTitle}</h1>
            </div>
        </div>
    );
}
