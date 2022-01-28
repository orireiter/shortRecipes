import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../app/hooks';
import { logIn } from '../logic/authLogic';


const Login = (): JSX.Element => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

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
                <button className={(email && password) ? 'buttonEnabled' : 'buttonDisabled'}
                        onClick={() => logIn(dispatch, email, password)}
                        disabled={(email && password) ? false : true}>
                    Login
                </button>
            </div>

            <div className='goOtherAuth'>
                <p>Don't have an account yet? Sign up <Link to='/signup'>here</Link></p>
            </div>
        </div>
    );
}

export default Login;
  