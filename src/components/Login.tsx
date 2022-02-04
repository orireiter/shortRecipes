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

    const tryLogin = () => {
        logIn(dispatch, email, password)
        .catch((err) => {
            setError('Wrong email or password...');
        })
    }

    
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
                    <input type='email' value={email} onChange={event => setEmail(event.target.value)}/>
                </div>
                <div>
                    <p>Password</p>
                    <input type='password' value={password} onChange={event => setPassword(event.target.value)}/>
                </div>
            </div>
            <div className='authSubmit'>
                <button className={(isMailValid && password && password.length > 5) ? 'buttonEnabled' : 'buttonDisabled'}
                        onClick={tryLogin}
                        disabled={(isMailValid && password && password.length > 5) ? false : true}>
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
  