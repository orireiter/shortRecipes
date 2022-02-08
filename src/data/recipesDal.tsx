import { doc, getDoc } from "firebase/firestore";

import { firebaseFirestore } from '../thirdParty/fireBase';
import config from '../config.json';


const dbName = config.firebase.dbName;


export const getMe = async () => {
    const docRef = doc(firebaseFirestore, dbName, "tmwUdKa3crrKKZOXiYqB");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
    // doc.data() will be undefined in this case
        console.log("No such document!");
    }

}

