import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getRecipe } from '../data/recipesDal';


const ViewRecipe = (): JSX.Element => {
    const [content, setContent] = useState<JSX.Element>(<div>
        <p>ori gever</p>
    </div>);
    let params = useParams();
    
    useEffect(() => {
        getRecipe(params.recipeId || '')
        .then((recipeDoc) => {
            setContent(
                <div>
                    <p>{JSON.stringify(recipeDoc.data())}</p>
                </div>);
        })
        .catch(() => {})
        
    }, [])
    
    return (content);
};

export default ViewRecipe;