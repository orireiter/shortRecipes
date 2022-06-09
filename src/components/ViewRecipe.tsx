import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getRecipe } from '../logic/recipesLogic';
import { LoadingScreen } from '../utils'


const ViewRecipe = (): JSX.Element => {
    const [content, setContent] = useState<JSX.Element>(<LoadingScreen />);
    let params = useParams();
    
    useEffect(() => {
        getRecipe(params.recipeId || '')
        .then(recipe =>  {
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
            setContent(
                <div id='recipeView'>
                    <div>
                        <h1 className='recipeName'>
                            {recipe.recipeName}
                        </h1>
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
                                {recipe.tags.join(', ')}
                            </div>
                        </div> : null)}
                    </div>
                </div>
                )
        });
        
        
    }, [])
    
    return (content);
};

export default ViewRecipe;