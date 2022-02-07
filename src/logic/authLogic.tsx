import { AnyAction } from '@reduxjs/toolkit';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut } from 'firebase/auth';
import { Dispatch } from 'react';

import config from '../config.json';
import { authenticate, unAuthenticate } from '../slices/authSlice';
import { closeNavbar, openLoading, closeLoading } from '../slices/generalSettingsSlice';

// todo an auth DAL and init firebase elsewhere to be accessible cross app
const firebaseConfig: FirebaseOptions = config.firebase;
const fireBase = initializeApp(firebaseConfig);
const fireBaseAuth = getAuth(fireBase);


export const checkUserConnected = (dispatch: Dispatch<AnyAction>) => {
    onAuthStateChanged(fireBaseAuth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          // const uid = user.uid;
          // console.log(`user id: ${uid}`);
          dispatch(authenticate());
          // ...
        } else {
            // console.log('no user...')
            dispatch(unAuthenticate());
          // User is signed out
          // ...
        }
    });    
}


export const signUp = (dispatch: Dispatch<AnyAction>, email: string, password: string) => {
    dispatch(openLoading());
    return createUserWithEmailAndPassword(fireBaseAuth, email, password)
    .then(() => dispatch(authenticate()))
    .finally(() => dispatch(closeLoading()));
}

export const logIn = (dispatch: Dispatch<AnyAction>, email: string, password: string) => {
    dispatch(openLoading());
    return signInWithEmailAndPassword(fireBaseAuth, email, password)
    .then(() => {
        dispatch(authenticate());
    })
    .finally(() => dispatch(closeLoading()));
}

export const logOut = (dispatch: Dispatch<AnyAction>) => {
    dispatch(openLoading());
    dispatch(closeNavbar());
    signOut(fireBaseAuth)
    .finally(() => dispatch(closeLoading()));
}