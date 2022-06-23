import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import config from '../config.json'
import { useAppSelector } from '../app/hooks';
import { useAppDispatch } from '../app/hooks';
import { stringToStringMapType } from '../utils';
import { openCloseNavbar } from '../slices/generalSettingsSlice';
import { selectAuth, authState } from '../slices/authSlice';
import { selectGeneralSettings, generalSettingsState } from '../slices/generalSettingsSlice';



const NavBarSearch = (props: {auth: authState, generalSettings: generalSettingsState}) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [isShowSearchBar, setIsShowSearchBar] = useState(false);

    const goToSearch = () => {
        let goTo = 'recipes';
        if (searchTerm) {
            goTo += `?query=${searchTerm}`;
        }
        navigate(goTo, {replace: true});
    }


    let classNames: stringToStringMapType = { 
        navbarSearch: 'navbarSearch'
    }

    let content = null
    if (!props.auth.isAuthenticated) {
    } else if (props.generalSettings.isMobile) {
        for (let o in classNames) {    
            classNames[o] += ` ${classNames[o]}Mobile`
        }

        content = (
                (isShowSearchBar) ? 
                        <div id='searchContainer'>
                            <div id='mobileSearchBox'>
                                <input type="text" placeholder='search' value={searchTerm} 
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    onBlur={() => {setIsShowSearchBar(!isShowSearchBar)}}
                                    autoFocus={true}
                                    onKeyPress={(event) => {
                                    if (event.key === 'Enter') {
                                        goToSearch();
                                        setIsShowSearchBar(!isShowSearchBar)
                                    }}}/>
                                <span className='material-icons clickable' style={{color: '#757575'}} onClick={() => {
                                        setSearchTerm('');
                                        setIsShowSearchBar(!isShowSearchBar);
                                    }}>
                                    close
                                </span>
                            </div>
                        </div>
                    : (
                            <span className='material-icons clickable' 
                            onClick={() => {
                                setIsShowSearchBar(!isShowSearchBar);
                            }}>
                                search
                            </span>
                        )
        );
    } else {
        content = (
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
        </div>);
    }
    return (
        <div className={classNames.navbarSearch}>
            {content}
        </div>
    );
}


const NavBar = (props: {auth: authState, generalSettings: generalSettingsState}) => {
    const dispatch = useAppDispatch();
    let pageTitle = config.general.title || 'Short Recipes';

    let classNames: stringToStringMapType = { 
        navbar: 'navbar',
        currentPageTitle: 'currentPageTitle',
        navbarToggle: 'navbarToggle'
    }

    if (props.generalSettings.isMobile) {
        for (let o in classNames) {    
            classNames[o] += ` ${classNames[o]}Mobile`
        }
    }
    

    return (
        <div className={classNames.navbar}>
            {(props.auth.isAuthenticated) ? 
            <div className={classNames.navbarToggle}>
                <span className='material-icons clickable' onClick={() => { dispatch(openCloseNavbar()) }}>
                    menu
                </span>
            </div> : null}
            <div className={classNames.currentPageTitle}>
                <h1>{pageTitle}</h1>
            </div>
        </div>
    );

}

export default function Header() {
    const auth = useAppSelector(selectAuth);
    const generalSettings = useAppSelector(selectGeneralSettings);

    return (
        <div id='navbarContainer' className='notDraggable'>
            <NavBar auth={auth} generalSettings={generalSettings}/>
            <NavBarSearch auth={auth} generalSettings={generalSettings}/>
        </div>
    );
}
