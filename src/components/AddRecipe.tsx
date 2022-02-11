import React, { useState, useEffect, useRef } from 'react';

// first importing types
import { ingredient, cookingStep, recipe, isValidRecipe } from '../logic/recipesLogic';

// then functions
import { getMe } from '../data/recipesDal';
import { editObjectInArrayAndSetState, removeObjectFromArrayAndSetState } from '../utils';


const ingredientTemplate: ingredient = {name: '', amount: 0, amountType: ''};
const cookingStepTemplate: cookingStep = {num: 1, content: ''};


const IngredientsForm = (props: {
        ingredientArray: Array<ingredient>, 
        setIngredients: React.Dispatch<React.SetStateAction<ingredient[]>>
    }): JSX.Element => {    
    const ingredientsLength  = props.ingredientArray.length;


    const suppliedIngredients: Array<JSX.Element> = props.ingredientArray.map((ingredient, index) => {
        return (
            <div key={index} style={{display: 'flex'}}>
                <div>
                    <p>{index + 1}.</p>
                </div>
                <div>
                    <p>Name: <input type='text' value={ingredient.name} placeholder='tomato sauce'
                        onChange={(event) => {
                            editObjectInArrayAndSetState(index, props.ingredientArray, 'name', event.target.value, props.setIngredients);
                        }}/>
                    </p>
                </div>
                <div>
                    <p>Amount: <input type='text' value={ingredient.amount} placeholder='0.3'
                        onChange={(event) => {
                            let newNum = Number(event.target.value);
                            if (isNaN(newNum)) {
                                return
                            }

                            editObjectInArrayAndSetState(index, props.ingredientArray, 'amount', newNum, props.setIngredients);
                        }}/>
                    </p>
                </div>
                <div>
                    <p>Amount Type: <input type='text' value={ingredient.amountType} placeholder='kg'
                        onChange={(event) => {
                            editObjectInArrayAndSetState(index, props.ingredientArray, 'amountType', event.target.value, props.setIngredients);
                        }}/>
                    </p>
                </div>
                <div>
                    <p>Details (optional): <input type='text' value={ingredient.details} placeholder='either canned or fresh'
                        onChange={(event) => {
                            editObjectInArrayAndSetState(index, props.ingredientArray, 'details', event.target.value, props.setIngredients);
                        }}/>
                    </p>
                </div>
                {(ingredientsLength > 1) ? 
                <span className="material-icons clickable" 
                    onClick={() => removeObjectFromArrayAndSetState(index, props.ingredientArray, props.setIngredients)}>
                    remove_circle
                </span> : null}
            </div>
        );
    });

    return (
        <div>
            <div>
                <p>Ingredients:</p>
            </div>
            <div>
                {suppliedIngredients}
            </div>
            <span className="material-icons clickable"
                onClick={() => props.setIngredients([...props.ingredientArray, ingredientTemplate])}>
                add_circle
            </span>
        </div>  
    );
}


const CookingStepsForm = (props: {
        cookingStepsArray: Array<cookingStep>, 
        setCookingSteps: React.Dispatch<React.SetStateAction<cookingStep[]>>
    }) : JSX.Element => {    
    const stepsLength  = props.cookingStepsArray.length;


    const suppliedSteps: Array<JSX.Element> = props.cookingStepsArray.map((cookingStep, index) => {
        return (
            <div key={index} style={{display: 'flex'}}>
                <div>
                    <p>{index + 1}.</p>
                </div>
                <div>
                    <p>Title (optional): <input type='text' value={cookingStep.title} placeholder='Making the Dough'
                        onChange={(event) => {
                            editObjectInArrayAndSetState(index, props.cookingStepsArray, 'title', event.target.value, props.setCookingSteps);
                        }}/>
                    </p>
                </div>
                <div>
                    <p>Description: <textarea value={cookingStep.content} placeholder='Mix the flour with butter'
                        onChange={(event) => {
                            editObjectInArrayAndSetState(index, props.cookingStepsArray, 'content', event.target.value, props.setCookingSteps);
                        }}/>
                    </p>
                </div>
                {(stepsLength > 1) ? 
                <span className="material-icons clickable" 
                    onClick={() => removeObjectFromArrayAndSetState(index, props.cookingStepsArray, props.setCookingSteps)}>
                    remove_circle
                </span> : null}
            </div>
        );
    });

    return (
        <div>
            <div>
                <p>Cooking Steps:</p>
            </div>
            <div>
                {suppliedSteps}
            </div>
            <span className="material-icons clickable"
                onClick={() => props.setCookingSteps([...props.cookingStepsArray, {...cookingStepTemplate, num: stepsLength + 1}])}>
                add_circle
            </span>
        </div>  
    );
}


const TagForm = (props: { tagArray: string[], 
    setTagArray: React.Dispatch<React.SetStateAction<string[]>>}
    ): JSX.Element => {
    
    return (
        <div>
            <div>
                Tags:
            </div>
            <div>
                <p>#ori_reiter</p>
            </div>
        </div>
    );
}



const AddRecipe = (): JSX.Element => {
    const [dishName, setName] = useState<string>('');
    const [ingredientArray, setIngredients] = useState<Array<ingredient>>([ingredientTemplate]);
    const [cookingStepsArray, setCookingSteps] = useState<Array<cookingStep>>([cookingStepTemplate]);
    const [tagArray, setTagArray] = useState<Array<string>>([]);
    const [isRecipeValid, setRecipeValid] = useState<boolean>(false)
    let recipeReference = useRef<recipe>();



    useEffect(() => {
        // getMe(); 
        return (() => {recipeReference.current = undefined});
    }, []);
    useEffect(() => {
        recipeReference.current = {
            recipeName: dishName,
            ingredients: ingredientArray,
            cookingSteps: cookingStepsArray
        };
        setRecipeValid((recipeReference.current && isValidRecipe(recipeReference.current)) ? true : false)
    }, [dishName, ingredientArray, cookingStepsArray]);


    return (
        <div id='newRecipeContainer'>
            <div className='header'>
                <h2>Add a New Recipe</h2>
            </div>
            <div id='recipeForm'>
                <div id='addRecipeName'>
                    <p>Dish Name:</p>
                    <input type='text' value={dishName} placeholder='pizza'
                        onChange={(event) => setName(event.target.value)}/>
                </div>
                <IngredientsForm ingredientArray={ingredientArray} setIngredients={setIngredients}/>
                <CookingStepsForm cookingStepsArray={cookingStepsArray} setCookingSteps={setCookingSteps}/>
                <TagForm tagArray={tagArray} setTagArray={setTagArray}/>
                {/* <div>
                    <p>Tags:</p>
                    <input type='text' />
                </div>
                <div>
                    <p>Attach a Video:</p>
                    <input type='text' />
                </div> */}
            </div>
            <div id='submitRecipe'>
                <button className={(isRecipeValid) ? 'clickable' : ''}
                    disabled={!isRecipeValid}
                    onClick={() => {
                    if (!recipeReference.current || !isValidRecipe(recipeReference.current)) {
                        return
                    }

                    console.log(recipeReference.current);
                    }}>Save Recipe</button>
            </div>
        </div>
    );
}

export default AddRecipe