import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';

import { changeIsMobileState, generalSettingsState } from "../slices/generalSettingsSlice";
import { isOnMobile } from '../utils';

export const changeIsMobileStateIfNeeded = (dispatch: Dispatch<AnyAction>, generalSettings: generalSettingsState) => {
    if (isOnMobile(navigator) === generalSettings.isMobile) {
        return
    }

    dispatch(changeIsMobileState());
}
