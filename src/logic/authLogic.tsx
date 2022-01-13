import { AnyAction } from "@reduxjs/toolkit";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut } from "firebase/auth";
import { Dispatch } from "react";

import config from '../config.json'
import { authenticate, unAuthenticate } from '../slices/authSlice'

const firebaseConfig: FirebaseOptions = config.auth.firebase;
const fireBase = initializeApp(firebaseConfig);
const fireBaseAuth = getAuth(fireBase);


export const checkUserConnected = (dispatch: Dispatch<AnyAction>) => {
    onAuthStateChanged(fireBaseAuth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(`user id: ${uid}`);
          dispatch(authenticate());
          // ...
        } else {
            console.log('no user...')
            dispatch(unAuthenticate());
          // User is signed out
          // ...
        }
    });    
}


export const signUp = (dispatch: Dispatch<AnyAction>, email: string, password: string) => {
    createUserWithEmailAndPassword(fireBaseAuth, email, password)
    .then(() => dispatch(authenticate()))
}

export const logIn = (dispatch: Dispatch<AnyAction>, email: string, password: string) => {
    signInWithEmailAndPassword(fireBaseAuth, email, password)
    .then(() => dispatch(authenticate()))
}

export const logOut = () => {
    signOut(fireBaseAuth);
}