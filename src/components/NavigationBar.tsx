import React from 'react';

import { useAppSelector } from '../app/hooks';
import { selectGeneralSettings } from '../slices/generalSettingsSlice';
import { logOut } from '../logic/authLogic';


export default function NavigationBar() {
    const generalSettings = useAppSelector(selectGeneralSettings);

    return (
        <div id='navigationBar' className={(generalSettings.isNavbarOpen) ? 'navOpen' : 'navClosed'}>
            <div>
                navigation options here
            </div>
            <div>
                general operations here
                <p>sign out</p>
            </div>
        </div>
    );
}