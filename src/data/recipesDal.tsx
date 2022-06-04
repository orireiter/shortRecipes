import { doc, collection, getDoc, getDocs, addDoc, query, where, orderBy } from "firebase/firestore";

import { firebaseFirestore } from '../thirdParty/fireBase';
import { detailedRecipe } from '../logic/recipesLogic';
import config from '../config.json';


const dbName = config.firebase.dbName;
const collectionRef = collection(firebaseFirestore, dbName);


export const getRecipe = (recipeId: string) => {
    const docRef = doc(firebaseFirestore, dbName, recipeId);
    return getDoc(docRef);
}


export const getAllPublicRecipes = () => {
    const allRecipeQuery = query(collectionRef, where('isPublic', '==', true), orderBy('creationDate', 'desc'));
    return getDocs(allRecipeQuery);
}

export const saveRecipe = (recipe: detailedRecipe) => {
    return addDoc(collectionRef, recipe);
}