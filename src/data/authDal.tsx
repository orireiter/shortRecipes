import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut as logOut, 
    sendEmailVerification, User, } from 'firebase/auth';

import { firebaseAuth } from '../thirdParty/fireBase';

export const signUpSendVerificationMail = async (email: string, password: string) => {
    const userCred = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    return sendEmailVerification(userCred.user)
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

export const getCurrentUser = () => {
    return firebaseAuth.currentUser
}