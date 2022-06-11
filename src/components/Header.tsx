import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import config from '../config.json'
import { useAppSelector } from '../app/hooks';
import { useAppDispatch } from '../app/hooks';
import { openCloseNavbar } from '../slices/generalSettingsSlice';
import { selectAuth } from '../slices/authSlice';

export default function Header() {
    const [searchTerm, setSearchTerm] = useState('');
    let pageTitle = config.general.title || 'Short Recipes';
    const dispatch = useAppDispatch();
    const auth = useAppSelector(selectAuth);
    const navigate = useNavigate();

    const goToSearch = () => {
        let goTo = 'recipes';
        if (searchTerm) {
            goTo += `?query=${searchTerm}`;
        }
        navigate(goTo, {replace: true});
    }

    return (
        <div id='navbarContainer' className='notDraggable'>
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
            <div id='navbarSearch'>
                {(auth.isAuthenticated) ? 
                <div id='searchContainer'>
                    <div id='searchBox'>
                        <span className='material-icons clickable' style={{color: '#757575'}} onClick={() => goToSearch()}>
                            search
                        </span>
                        <input type="text" placeholder='search' value={searchTerm} 
                            onChange={(event) => setSearchTerm(event.target.value)}
                            onKeyPress={(event) => {
                            if (event.key === 'Enter') {
                                goToSearch();
                            }}}/>
                        <span className='material-icons clickable' style={{color: '#757575'}} onClick={() => {
                                setSearchTerm('');
                            }}>
                            close
                        </span>
                    </div>
                </div> : null}
            </div>
        </div>
    );
}
