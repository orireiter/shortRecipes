import Popup from 'reactjs-popup';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef, Ref } from 'react';

// first importing types
import { ingredient, cookingStep, recipe, isValidRecipe, getRecipe} from '../logic/recipesLogic';

// then functions
import { getUser } from '../logic/authLogic';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { submitRecipe } from '../logic/recipesLogic';
import { selectGeneralSettings, openLoading, closeLoading } from '../slices/generalSettingsSlice';
import { editObjectInArrayAndSetState, removeObjectFromArrayAndSetState, ErrorMessage } from '../utils';


const ingredientTemplate: ingredient = {name: '', amount: 0, amountType: ''};
const cookingStepTemplate: cookingStep = {num: 1, content: '', title: ''};


const IngredientsForm = (props: {
        ingredientArray: Array<ingredient>, 
        setIngredients: React.Dispatch<React.SetStateAction<ingredient[]>>
    }): JSX.Element => {    
    const ingredientsLength  = props.ingredientArray.length;


    const suppliedIngredients: Array<JSX.Element> = props.ingredientArray.map((ingredient, index) => {
        return (
            <div className='ingredientContainer' key={index}>
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
            <div id='addIngredientButtonContainer'>
                <span className="material-icons clickable"
                    onClick={() => props.setIngredients([...props.ingredientArray, ingredientTemplate])}>
                    add_circle
                </span>
            </div>
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
            <div className='ingredientContainer' key={index}>
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
                    <p>Description:</p>
                    <textarea value={cookingStep.content} placeholder='Mix the flour with butter'
                        onChange={(event) => {
                            editObjectInArrayAndSetState(index, props.cookingStepsArray, 'content', event.target.value, props.setCookingSteps);
                        }}/>
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
            <div id='addIngredientButtonContainer'>
                <span className="material-icons clickable"
                    onClick={() => props.setCookingSteps([...props.cookingStepsArray, {...cookingStepTemplate, num: stepsLength + 1}])}>
                    add_circle
                </span>
            </div>
        </div>  
    );
}


const TagForm = (props: { tagArray: string[], 
    setTagArray: React.Dispatch<React.SetStateAction<string[]>>}
    ): JSX.Element => {
    const [tag, setTag] = useState<string>('');
    const tagsLength = props.tagArray.length;
    
    const suppliedTags: Array<JSX.Element> = props.tagArray.map((tag, index) => {
        return (
            <div key={index} style={{display: 'flex'}}>
                <p className='clickable'
                 onClick={() => removeObjectFromArrayAndSetState(index, props.tagArray, props.setTagArray)}>
                    {tag.startsWith('#') ? null : '#'}{tag}
                </p>
                {(tagsLength === index + 1) ? 
                null : <p>,&nbsp;&nbsp;</p>}
            </div>
        );
    });
    
    return (
        <div>
            <div>
                Tags:
            </div>
            <div style={{display: 'flex'}}>
                {suppliedTags}
            </div>
            <div>
                <input value={tag}
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            if (!props.tagArray.includes(tag)) {
                                let tagToSave = tag;
                                props.setTagArray([...props.tagArray, tagToSave]);
                            }
                            setTag('');
                        }
                    }}
                    onChange={(event) => {
                        setTag(event.target.value);
                    }}/>
            </div>
        </div>
    );
}


const ImageDropZone = (props: {setFileIfValid: Function, fileInputDivRef: React.RefObject<HTMLInputElement>}) => {
    const generalSettings = useAppSelector(selectGeneralSettings);
    let content = null;
    
    if (generalSettings.isMobile) {
        content = (
        <span className="material-icons clickable notDraggable"
            onClick={() => {
                props.fileInputDivRef.current?.click();
            }}>
            photo_camera
        </span>);
    } else {
        content = (
        <div id='addRecipeImageDrop' className='clickable notDraggable'
            onDrop={(event) => {
                event.preventDefault();
                props.setFileIfValid(event.dataTransfer.files.item(0))}} 
            onDragOver={(event) => {event.preventDefault();}}
            onClick={() => {
                props.fileInputDivRef.current?.click();
            }}>
            <p>Click or Drop an Image Here...</p>
        </div>);
    }

    return content
}


const ImageDrop = (props: { fileToUpload: File|null|undefined, 
    setFileToUpload: React.Dispatch<React.SetStateAction<File|null|undefined>>}
    ): JSX.Element|null => {
    const fileInputDiv = useRef<HTMLInputElement>(null);
    
    function isFileValid(fileToCheck: File|null|undefined) {
        if (!fileToCheck) {
            return false;
        }
        if (!['image/png', 'image/jpeg'].includes(fileToCheck.type)) {
            return false;
        }
        return true;
    }

    function setFileIfValid(fileToSet: File|null|undefined) {
        if (isFileValid(fileToSet)) {
            props.setFileToUpload(fileToSet);
        }
    }

    const imageHtml = (props.fileToUpload) ? (
        <div id="addRecipeImagePreview">
            <span className="material-icons clickable" id='clearRecipeImage'
                onClick={() => props.setFileToUpload(null)}>
                close
            </span>
            <img src={URL.createObjectURL(props.fileToUpload)} alt="recipe preview" height={'100%'}></img>
        </div>) 
        : (
        <div id='addRecipeImageContainer'>
            <ImageDropZone setFileIfValid={setFileIfValid} fileInputDivRef={fileInputDiv}/>
            <div id='classicFileSelect' style={{display: 'none'}}>
                <input ref={fileInputDiv} id='uploadInputButton' accept="image/png, image/jpeg" type='file' 
                        onChange={(event) => setFileIfValid(event.target.files?.item(0))}></input>
            </div>
        </div>);
 
    return (imageHtml);
    }



const AddRecipe = (): JSX.Element => {
    const [dishName, setName] = useState<string>('');
    const [ingredientArray, setIngredients] = useState<Array<ingredient>>([ingredientTemplate]);
    const [cookingStepsArray, setCookingSteps] = useState<Array<cookingStep>>([cookingStepTemplate]);
    const [tagArray, setTagArray] = useState<Array<string>>([]);
    const [isRecipeValid, setRecipeValid] = useState<boolean>(false);
    const [fileToUpload, setFileToUpload] = useState<File|null>();
    const [invalidRecipeError, setInvalidRecipeError] = useState<string>('');
    let { recipeId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    let recipeReference = useRef<recipe>();
    const user = getUser();

    useEffect(() => {
        if (recipeId) {
            getRecipe(recipeId)
            .then((recipe) => {
                if (recipe.userId !== user?.uid) {
                    navigate('/recipes/add');
                    return;
                };

                setName(recipe.recipeName);
                setIngredients(recipe.ingredients);
                setCookingSteps(recipe.cookingSteps)
                setTagArray(recipe.tags || []);

            })
            .catch(() => {});
        };

        return (() => {recipeReference.current = undefined});
    }, []);

    useEffect(() => {
        recipeReference.current = {
            recipeName: dishName,
            ingredients: ingredientArray,
            cookingSteps: cookingStepsArray,
            tags: tagArray
        };
        setRecipeValid((recipeReference.current && isValidRecipe(recipeReference.current)) ? true : false)
    }, [dishName, ingredientArray, cookingStepsArray]);

    async function saveRecipe() {
        dispatch(openLoading());
        try {
            if (!recipeReference.current || !isValidRecipe(recipeReference.current)) {
                setInvalidRecipeError('Missing or invalid details!');
                return;
            };
    
            const recipeData = await submitRecipe(recipeReference.current, fileToUpload, recipeId);
            navigate(`/users/${user?.uid}/recipes/${recipeData.id}`);
        } catch {} finally {
            dispatch(closeLoading());
        };
    };

    // TODO toggle if recipe is private or public
    return (
        <div id='newRecipeContainer'>
            <div className='header'>
                <h2>Add a New Recipe</h2>
            </div>
            <div id='recipeForm'>
                <div id='addRecipeNameContainer' className={(fileToUpload) ? 'mobileImage' : ''}>
                    <div id='addRecipeName'>
                        <p>Dish Name:</p>
                        <input type='text' value={dishName} placeholder='pizza'
                            onChange={(event) => setName(event.target.value)}/>
                    </div>
                    <ImageDrop fileToUpload={fileToUpload} setFileToUpload={setFileToUpload}/>
                </div>
                <IngredientsForm ingredientArray={ingredientArray} setIngredients={setIngredients}/>
                <CookingStepsForm cookingStepsArray={cookingStepsArray} setCookingSteps={setCookingSteps}/>
                <TagForm tagArray={tagArray} setTagArray={setTagArray}/>
                {/* <div>
                    <p>Attach a Video:</p>
                    <input type='text' />
                </div> */}
                <div id='submitRecipe'>
                <button className={(isRecipeValid) ? 'clickable' : ''}
                    onClick={saveRecipe}>Save Recipe</button>
            </div>
            </div>
            <Popup open={(invalidRecipeError) ? true : false}
                   onClose={() => {setInvalidRecipeError('');}}>
                { (close: Function) => (
                <ErrorMessage errorMessage={invalidRecipeError} children={
                    <button className='clickable closeErrorButton' onClick={() => {close();}}>OK</button>} />
                )}
            </Popup>
        </div>
    );
}

export default AddRecipe