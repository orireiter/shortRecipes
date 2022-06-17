import { useState } from 'react';
import { User } from 'firebase/auth';
import { Link } from 'react-router-dom';

import { getUser } from './authLogic';
import { hslShadeGenerator } from '../utils';
import { saveRecipe, getRecipe as fetchRecipe, getPublicRecipes } from '../data/recipesDal';
import { uploadFile, getFileUrl } from '../data/storageDal';


// JSX


const RecipeSummary = (props: {recipeName: string, recipeCreator: string, recipeLastUpdate: Date, backgroundColor: string, recipeId: string, creatorId: string}): JSX.Element => {
    const [thumbnailUrl, setThumbnailUrl] = useState<string|undefined>(undefined);
    getFileUrl(`/thumbnails/public/${props.creatorId}`, props.recipeId, 'png')
    .then((fileUrl) => {
        setThumbnailUrl(fileUrl);
    })


    return (
        <div className='recipeSummaryContainer' style={{backgroundColor: props.backgroundColor}}>
            <div className='recipeName' dir='auto'>
                <Link to={`${props.recipeId}`} className='clickable notDraggable'>{props.recipeName}</Link>
            </div>
            <div className='recipeThumbnail'>
                <img src={thumbnailUrl} alt={props.recipeName}/>
            </div>
            <div className='recipeAuthor'>
                <p>By: {props.recipeCreator}</p>
            </div>
            <div className='recipeLastUpdate'>
                <p>Last Update: {props.recipeLastUpdate.toLocaleDateString()}</p>
            </div>
        </div>
    );
}


// types

export type ingredient = {
    name: string,
    amountType: string,
    details?: string,
    amount: number
}

export type cookingStep = {
    num: number,
    title?: string,
    content: string
}

export type recipe = {
    recipeName: string,
    ingredients: Array<ingredient>,
    cookingSteps: Array<cookingStep>,
    tags?: Array<string>
}

export type detailedRecipe = recipe & {
    creationDate: Date,
    isPublic: boolean,
    userId: User['uid'],
    userName: User['email']
}


// validations

const isValidIngredient = (ingredient: ingredient) => {
    if (!ingredient.name || !ingredient.amountType || ingredient.amount <= 0) {
        throw new Error();
    }

}

const isValidCookingStep = (step: cookingStep) => {
    if (!step.num || !step.content) {
        throw new Error();
    }
} 


export const isValidRecipe = (recipe: recipe) => {
    if (!recipe.recipeName) {
        return false;
    } 
     
    try {
        recipe.ingredients.forEach((ingredient: ingredient) => {
            isValidIngredient(ingredient);
        });

        recipe.cookingSteps.forEach((step: cookingStep) => {
            isValidCookingStep(step);
        });
    } catch {
        return false;
    }

    return true;
}


// logic


const createDetailedRecipe = async (recipe: recipe, currentUser: User) => {
    recipe.tags = recipe.tags || [];
    const tagsPromises = recipe.tags.map((tag) => tag.toLowerCase());
    recipe.tags = await Promise.all(tagsPromises);

    const extraTagsPromises = recipe.recipeName.split(' ').map((word) => word.toLowerCase());
    const extraTags = await Promise.all(extraTagsPromises);
    recipe.tags = recipe.tags.concat(extraTags);    

    const detailedRecipe: detailedRecipe = {...recipe, 
        creationDate: new Date(),
        userId: currentUser.uid,
        userName: currentUser.email,
        isPublic: true
    }

    return detailedRecipe;
}


export const submitRecipe = async (recipe: recipe, file: File|null|undefined) => {
    let currentUser = getUser();
    
    if (!currentUser) {
        throw new Error('somehow no user');
    }

    const detailedRecipe = await createDetailedRecipe(recipe, currentUser);

    const docData = await saveRecipe(detailedRecipe);
    if (file) {
        const pathToFile = `thumbnails/public/${currentUser.uid}`
        uploadFile(pathToFile, docData.id, 'png', file);
    }
}


export const getRecipe = async (recipeId: string) => {
    const snapshot = await fetchRecipe(recipeId);

    let snapshotData = snapshot.data();
    if (!snapshotData) {
        throw new Error('No such recipe...')
    }
    let recipeData: recipe = {
        recipeName: snapshotData.recipeName,
        ingredients: snapshotData.ingredients,
        cookingSteps: snapshotData.cookingSteps
    }

    if (snapshotData.tags) {
        recipeData.tags = snapshotData.tags
    }
    return recipeData
}


export async function *getAllPublicRecipesPaginated(queryString: string|null=null) {
    const genie = hslShadeGenerator('hsl(191deg 60% 38%)');
    let lastVisible = null; 
    let recipeArray: Array<JSX.Element> = [];
    
    while (true) {
        let querySnapshot = await getPublicRecipes(25, lastVisible, queryString);
        if (querySnapshot.empty) {
            return recipeArray;
        }

        querySnapshot.forEach((recipeDoc) => {
            let isRecipeExistAlready = recipeArray.find(recipe => recipe.key === recipeDoc.id);
            if (isRecipeExistAlready) {
                return
            };

            let recipeData = recipeDoc.data();
            let recipeSummary = <RecipeSummary recipeName={recipeData.recipeName} recipeCreator={recipeData.userName} recipeLastUpdate={recipeData.creationDate.toDate()} recipeId={recipeDoc.id} creatorId={recipeData.userId} key={recipeDoc.id} backgroundColor={genie.next().value.toHslString() || 'transparent'}/>
            recipeArray.push(recipeSummary);
            lastVisible = recipeDoc;
        });
        
        yield recipeArray
    }

    return recipeArray;
}