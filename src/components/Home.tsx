import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getAllPublicRecipesPaginated } from '../logic/recipesLogic';


const Home = (): JSX.Element => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [recipeArray, setRecipes] = useState<Array<JSX.Element>>([]);

    useEffect(() => {
        let queryString;
        if (searchParams.get('query')) {
            // todo make it update
            queryString = searchParams.get('query')?.toLowerCase();
        }

        const publicRecipesGenerator  = getAllPublicRecipesPaginated(queryString);
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    publicRecipesGenerator.next()
                    .then((val) => {
                        setRecipes([...val.value]);
                        if (val.done) {
                            observer.disconnect();
                        }
                    })
                }}
          )
        
        const bottomCheck = document.getElementById('bottomDiv')
        if (bottomCheck) {
            observer.observe(bottomCheck);
        }
      
        return () => { observer.disconnect() }
    }, []);

    return (
        <div>
            <div id='allRecipeGrid'>
                {recipeArray}
            </div>
            <div id='bottomDiv' style={{height: '1px'}}>
            </div>
        </div>
    );
}


export default Home;
  