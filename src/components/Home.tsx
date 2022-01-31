import React, { useState, useEffect } from 'react';

import { hslShadeGenerator } from '../utils';


const RecipeSummary = (props: {recipeName: string, recipeCreator: string, recipeLastUpdate: Date, backgroundColor: string}): JSX.Element => {
    return (
        <div className='recipeSummaryContainer' style={{backgroundColor: props.backgroundColor}}>
            <div className='recipeName'>
                <h2>{props.recipeName}</h2>
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
    const [recipes, setRecipes] = useState<Array<JSX.Element>>([]);
    let recipeProps = {recipeName: 'Pizza', recipeCreator:'Amit Komidi', recipeLastUpdate: new Date()};
    const genie = hslShadeGenerator('hsl(191deg 50% 32%)');

    useEffect(() => {
        setRecipes([]);
        let i = 0;
        while (i <= 14 ) {
            setRecipes(currentRecipes => [...currentRecipes, <RecipeSummary {...recipeProps} key={Math.random()} backgroundColor={genie.next().value.toHslString() || 'transparent'}/>])
            i += 1
        }
    }, [])
    
    return (
        <div>
            <div id='allRecipeGrid'>
                {recipes}
            </div>
        </div>
    );
}


export default Home;
  