import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch } from '../app/hooks';
import { signUp } from '../logic/authLogic';


const Signup = (): JSX.Element => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');

    const dispatch = useAppDispatch();

    return (
        <div className='authContainer'>
            <div className='authForm'>
                <div>
                    <p>User Name</p>
                    <input type='email' value={email} onChange={event => setEmail(event.target.value)}/>
                </div>
                <div>
                    <p>Password</p>
                    <input type='password' value={password} onChange={event => setPassword(event.target.value)}/>
                </div>
                <div>
                    <p>Re-enter Password</p>
                    <input type='password' value={passwordConfirm} onChange={event => setPasswordConfirm(event.target.value)}/>
                </div>
            </div>
            <div className='authSubmit'>
                <button className={(email && password) ? 'buttonEnabled' : 'buttonDisabled'}
                        onClick={() => signUp(dispatch, email, password)}
                        disabled={(email && password && password === passwordConfirm && password.length > 5) ? false : true}>
                    Sign Up
                </button>
            </div>
            <div className='goOtherAuth'>
                <p>Already have an account? Log in <Link to='/login'>here</Link></p>
            </div>
        </div>
    );
}

export default Signup;
  