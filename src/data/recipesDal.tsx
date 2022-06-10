import { doc, collection, getDoc, getDocs, addDoc, query, where, orderBy, startAfter, limit, DocumentReference } from "firebase/firestore";

import { firebaseFirestore } from '../thirdParty/fireBase';
import { detailedRecipe } from '../logic/recipesLogic';
import config from '../config.json';


const dbName = config.firebase.dbName;
const collectionRef = collection(firebaseFirestore, dbName);


export const getRecipe = (recipeId: string) => {
    const docRef = doc(firebaseFirestore, dbName, recipeId);
    return getDoc(docRef);
}


export const getPublicRecipes = (retrieveAtATime: number=25, startAfterThisDoc: DocumentReference|null=null, queryString: string|null=null) => {
    let publicRecipeQuery = query(collectionRef, where('isPublic', '==', true), orderBy('creationDate', 'desc'), limit(retrieveAtATime));
    if (startAfterThisDoc) {
        publicRecipeQuery = query(publicRecipeQuery, startAfter(startAfterThisDoc))
    }

    if (queryString) {
        publicRecipeQuery = query(publicRecipeQuery, where('tags', 'array-contains-any', [queryString]))
    }
    return getDocs(publicRecipeQuery);
}

export const saveRecipe = (recipe: detailedRecipe) => {
    return addDoc(collectionRef, recipe);
}