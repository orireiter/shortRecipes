import React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';

import { useAppSelector } from '../app/hooks';
import { useAppDispatch } from '../app/hooks';
import { selectGeneralSettings, generalSettingsState, closeNavbar } from '../slices/generalSettingsSlice';
import { logOut } from '../logic/authLogic';
import { stringToStringMapType } from '../utils';


function SignOut(props: {generalSettings: generalSettingsState}) {
    const dispatch = useAppDispatch();

    let classNames: stringToStringMapType = { 
        navLogout: 'navLogout'
    }

    if (props.generalSettings.isMobile) {
        for (let o in classNames) {    
            classNames[o] += ` ${classNames[o]}Mobile`
        }
    }

    return (
    <Popup modal nested trigger={
        <div className={`${classNames.navLogout} clickable notDraggable`}>
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

    let classNames: stringToStringMapType = { 
        navOpen: 'navOpen',
        navClosed: 'navClosed',
        navigationLink: 'navigationLink',
        navSettingsButton: 'navSettingsButton'
    }

    if (generalSettings.isMobile) {
        for (let o in classNames) {    
            classNames[o] += ` ${classNames[o]}Mobile`
        }
    }
    
    return (
        <div id='navigationBar' className={(generalSettings.isNavbarOpen) ? classNames.navOpen : classNames.navClosed}>
            <div id='navigationLinks'>
                <Link to='/recipes' className={`${classNames.navigationLink} clickable notDraggable`}
                        onClick={() => dispatch(closeNavbar())}>
                    <span className="material-icons">
                        kitchen
                    </span>
                    <h2>All Recipes</h2>
                </Link>
                <Link to='/recipes/add' className={`${classNames.navigationLink} clickable notDraggable`}
                    onClick={() => dispatch(closeNavbar())}>
                    <span className="material-icons">
                        add
                    </span>
                    <h2>Add Recipe</h2>
                </Link>
            </div>
            <div id='navigationSettings'>
                < SignOut generalSettings={generalSettings}/>
                <span className={`${classNames.navSettingsButton} material-icons clickable notDraggable`}>
                    settings
                </span>
            </div>
        </div>
    );
}