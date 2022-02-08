import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut as logOut, User } from 'firebase/auth';

import { firebaseAuth } from '../thirdParty/fireBase';

export const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password)
}

export const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password)
}

export const signOut = () => {
    return logOut(firebaseAuth)
}

export const userConnectedObserver = (callbackFunction: (arg0: User | null) => void) => {
    onAuthStateChanged(firebaseAuth, callbackFunction)
}