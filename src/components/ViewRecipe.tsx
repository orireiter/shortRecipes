import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getUser } from '../logic/authLogic';
import { getRecipe, getThumbnailUrl, recipe } from '../logic/recipesLogic';
import { LoadingScreen } from '../utils'


const ViewRecipe = (): JSX.Element => {
    const [content, setContent] = useState<JSX.Element>(<LoadingScreen />);
    const [thumbnailUrl, setThumbnailUrl] = useState<string>();
    const [recipe, setRecipe] = useState<recipe|null>(null);
    let navigate = useNavigate();
    let { recipeId, creatorId } = useParams();
    
    const createRecipeHtml = (recipe: recipe) => {
        let stepsArray = recipe.cookingSteps.map((value) => {
            return (
                <div key={value.num}>
                    <h3>
                        {value.num}.{(value.title) ? ` ${value.title}`: ''}
                    </h3>
                    <p>
                        {value.content}
                    </p>
                </div>
            );
        });

        let editButton = null;
        let viewingUser = getUser()
        if (viewingUser?.uid === recipe.userId && viewingUser?.uid) {
            editButton = (
                <button onClick={() => {
                    navigate(`/recipes/${recipeId}/edit`);
                }}>
                    Edit
                </button>)
        };

        return (
            <div id='recipeView'>
                <div id='recipeHeaderContainer'>
                    <h1 className='recipeName'>
                        {recipe.recipeName}
                    </h1>
                    {editButton}
                </div>
                <div id='recipeViewThumbnailContainer'>
                    <img src={thumbnailUrl} width='100%' alt={recipe.recipeName}></img>
                </div>
                <div>
                    <div>
                        <h2>
                            Ingrdients
                        </h2>
                        <ul>
                            {recipe.ingredients.map((value, index) => {
                                return (
                                    <li key={index}>{value.amount} {value.amountType} of {value.name}{(value.details) ? ` - ${value.details}` : ''}</li>
                                );
                            })}
                        </ul>
                    </div>
                    <div>
                        <h2>
                            Steps
                        </h2>
                        <div id='recipeViewSteps'>
                            {stepsArray.sort((a, b) => Number(a.key) - Number(b.key))}
                        </div>
                    </div>
                    {(recipe.tags ?
                    <div>
                        <h2>
                            Tags
                        </h2>
                        <div>
                            {recipe.tags.map((tag) => '#' + tag).join(', ')}
                        </div>
                    </div> : null)}
                </div>
            </div>
            )
    }

    useEffect(() => {
        if (recipe) {
            const recipeHtml = createRecipeHtml(recipe);
            setContent(recipeHtml);
        }            
    }, [recipe, thumbnailUrl])


    useEffect(() => {
        getRecipe(recipeId || '')
        .then(recipeToSet =>  {
            setRecipe(recipeToSet);
            
            if (creatorId && recipeId) {
                getThumbnailUrl(creatorId, recipeId)
                .then((thumbnailUrlToSet) => {
                    setThumbnailUrl(thumbnailUrlToSet);
                })
            }
        });
    }, [])
    
    return (content);
};

export default ViewRecipe;