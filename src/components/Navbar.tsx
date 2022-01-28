import React from 'react';
import config from '../config.json'

export default function Navbar() {
    let pageTitle = config.general.title || 'Short Recipes';

    return (
        <div id='navbar'>
            <div id='currentPageTitle'>
                <h1>{pageTitle}</h1>
            </div>
        </div>
    );
}
