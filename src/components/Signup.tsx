import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';

import { useAppDispatch } from '../app/hooks';
import { createUser } from '../logic/authLogic';
import { isEmailValid, ErrorMessage } from '../utils';


const Signup = (): JSX.Element => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');
    const [isMailValid, setEmailValid] = useState<Boolean>(false);
    const [signupError, setError] = useState<string>('');
    let isValidCreds = (isMailValid && password && password === passwordConfirm && password.length > 5);

    const trySignup = () => {
        createUser(dispatch, email, password)
        // TODO add a 'waiting for email verification' page
        .catch(() => {
            setError('Something went wrong...');
        })
    }

    const listenerSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if ((event.key === 'Enter' || event.key === 'NumpadEnter') && isValidCreds) {
          event.preventDefault();
          trySignup();
        }
    };

    useEffect(() => {
        setEmailValid(false);
        if (isEmailValid(email) ) {
            setEmailValid(true);
        }
    }, [email])


    const dispatch = useAppDispatch();

    return (
        <div className='authContainer'>
            <div className='authForm'>
                <div>
                    <p>User Name</p>
                    <input type='email' value={email} 
                        onChange={event => setEmail(event.target.value)}
                        onKeyDown={(event) => listenerSubmit(event)}
                        />
                </div>
                <div>
                    <p>Password</p>
                    <input type='password' value={password} 
                        onChange={event => setPassword(event.target.value)}
                        onKeyDown={(event) => listenerSubmit(event)}
                        />
                </div>
                <div>
                    <p>Re-enter Password</p>
                    <input type='password' value={passwordConfirm} 
                        onChange={event => setPasswordConfirm(event.target.value)}
                        onKeyDown={(event) => listenerSubmit(event)}
                        />
                </div>
            </div>
            <div className='authSubmit'>
                <button className={ (isValidCreds) ? 'buttonEnabled' : 'buttonDisabled'}
                        onClick={trySignup}
                        disabled={!isValidCreds}>
                    Sign Up
                </button>
            </div>
            <div className='goOtherAuth'>
                <p>Already have an account? Log in <Link to='/login'>here</Link></p>
            </div>

            <Popup open={(signupError) ? true : false}
                   onClose={() => {setError('');}}>
                { (close: Function) => (
                <ErrorMessage errorMessage={signupError} children={
                    <button className='clickable closeErrorButton' onClick={() => {close();}}>OK</button>} />
                )}
            </Popup>
        </div>
    );
}

export default Signup;
  