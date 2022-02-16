import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';

import { signUpSendVerificationMail, signIn, signOut, userConnectedObserver, getCurrentUser } from '../data/authDal';
import { authenticate, unAuthenticate } from '../slices/authSlice';
import { closeNavbar, openLoading, closeLoading } from '../slices/generalSettingsSlice';



export const checkUserConnected = (dispatch: Dispatch<AnyAction>) => {
    userConnectedObserver((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
            dispatch(authenticate());
        } else {
            dispatch(unAuthenticate());
        }
    });    
}


export const createUser = (dispatch: Dispatch<AnyAction>, email: string, password: string) => {
    dispatch(openLoading());
    return signUpSendVerificationMail(email, password)
    .then(() => dispatch(authenticate()))
    .finally(() => dispatch(closeLoading()));
}


export const logIn = (dispatch: Dispatch<AnyAction>, email: string, password: string) => {
    dispatch(openLoading());
    return signIn(email, password)
    .then(() => {
        dispatch(authenticate());
    })
    .finally(() => dispatch(closeLoading()));
}


export const logOut = (dispatch: Dispatch<AnyAction>) => {
    dispatch(openLoading());
    dispatch(closeNavbar());
    signOut()
    .finally(() => dispatch(closeLoading()));
}

export const getUser = () => {
    return getCurrentUser();
}