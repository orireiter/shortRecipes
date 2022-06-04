import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getAllPublicRecipes } from '../data/recipesDal';
import { hslShadeGenerator } from '../utils';


const RecipeSummary = (props: {recipeName: string, recipeCreator: string, recipeLastUpdate: Date, backgroundColor: string, recipeId: string}): JSX.Element => {
    return (
        <div className='recipeSummaryContainer' style={{backgroundColor: props.backgroundColor}}>
            <div className='recipeName'>
                <Link to={`${props.recipeId}`} className='clickable notDraggable'>{props.recipeName}</Link>
            </div>
            <div className='recipeThumbnail'>
                <img src='https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max' alt='pizza'/>
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


const Home = (): JSX.Element => {
    const genie = hslShadeGenerator('hsl(191deg 60% 38%)');
    const [recipeArray, setRecipes] = useState<Array<JSX.Element>>([]);

    useEffect(() => {
        /* TODO instead create a nextRecipes generator, that takes the last recipe and is called each time, 
        retrieving only some when scrolling to bottom*/
        getAllPublicRecipes()
        .then((querySnapshot) => {
            let tempArray: Array<JSX.Element> = [];
            querySnapshot.forEach((recipeDoc) => {
                let isRecipeExistAlready = recipeArray.find(recipe => recipe.key === recipeDoc.id);
                if (isRecipeExistAlready) {
                    return
                };

                let recipeData = recipeDoc.data();
                let recipeSummary = <RecipeSummary recipeName={recipeData.recipeName} recipeCreator={recipeData.userName} recipeLastUpdate={recipeData.creationDate.toDate()} recipeId={recipeDoc.id} key={recipeDoc.id} backgroundColor={genie.next().value.toHslString() || 'transparent'}/>
                tempArray.push(recipeSummary);
            });
            setRecipes([...recipeArray, ...tempArray]);
        });
    }, []);

    return (
        <div>
            <div id='allRecipeGrid'>
                {recipeArray}
            </div>
        </div>
    );
}


export default Home;
  