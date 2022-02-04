import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';

import { useAppDispatch } from '../app/hooks';
import { logIn } from '../logic/authLogic';
import { isEmailValid, ErrorMessage } from '../utils';


const Login = (): JSX.Element => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isMailValid, setEmailValid] = useState<Boolean>(false);
    const [loginError, setError] = useState<string>('');
    let isValidCreds = (isMailValid && password && password.length > 5);

    const tryLogin = () => {
        logIn(dispatch, email, password)
        .catch((err) => {
            setError('Wrong email or password...');
        })
    }

    const listenerSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if ((event.key === 'Enter' || event.key === 'NumpadEnter') && isValidCreds) {
          event.preventDefault();
          tryLogin();
        }
    };
    
    useEffect(() => {
        setEmailValid(false);
        if (isEmailValid(email) ) {
            setEmailValid(true);
        }
    }, [email])

    // TODO add event listener to allow submitting with enter

    const dispatch = useAppDispatch();

    return (
        <div className='authContainer'>
            <div className='authForm'>
                <div>
                    <p>Email</p>
                    <input type='email' value={email} 
                        onChange={(event) => setEmail(event.target.value)}
                        onKeyDown={(event) => listenerSubmit(event)}
                        />
                </div>
                <div>
                    <p>Password</p>
                    <input type='password' value={password} 
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event) => listenerSubmit(event)}
                        />
                </div>
            </div>
            <div className='authSubmit'>
                <button className={isValidCreds ? 'buttonEnabled' : 'buttonDisabled'}
                        onClick={tryLogin}
                        disabled={!isValidCreds}>
                    Login
                </button>
            </div>

            <div className='goOtherAuth'>
                <p>Don't have an account yet? Sign up <Link to='/signup'>here</Link></p>
            </div>
            <Popup open={(loginError) ? true : false}
                   onClose={() => {setError('');}}>
                { (close: Function) => (
                <ErrorMessage errorMessage={loginError} children={
                    <button className='clickable closeErrorButton' onClick={() => {close();}}>OK</button>} />
                )}
            </Popup>
        </div>
    );
}

export default Login;
  