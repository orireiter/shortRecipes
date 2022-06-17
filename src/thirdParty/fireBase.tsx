import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import config from '../config.json';

const firebaseConfig: FirebaseOptions = config.firebase;
const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);
export const firebaseFirestore = getFirestore(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);