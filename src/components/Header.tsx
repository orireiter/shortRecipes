import React from 'react';

import { useAppDispatch } from '../app/hooks';
import config from '../config.json'
import { openCloseNavbar } from '../slices/generalSettingsSlice';

export default function Header() {
    let pageTitle = config.general.title || 'Short Recipes';
    const dispatch = useAppDispatch();
    
    return (
        <div id='navbar'>
            <div id='navbarToggle'>
                <span className='material-icons clickable' onClick={() => { dispatch(openCloseNavbar()) }}>
                    menu
                </span>
            </div>
            <div id='currentPageTitle'>
                <h1>{pageTitle}</h1>
            </div>
        </div>
    );
}
