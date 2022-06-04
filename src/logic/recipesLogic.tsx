import { User } from 'firebase/auth';
import {getUser } from './authLogic';
import { saveRecipe, getRecipe as fetchRecipe } from '../data/recipesDal';

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


export const submitRecipe = (recipe: recipe) => {
    let currentUser = getUser();
    
    if (!currentUser) {
        throw new Error('somehow no user');
    }

    const detailedRecipe: detailedRecipe = {...recipe, 
        creationDate: new Date(),
        userId: currentUser.uid,
        userName: currentUser.email,
        isPublic: true
    }

    return saveRecipe(detailedRecipe);
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