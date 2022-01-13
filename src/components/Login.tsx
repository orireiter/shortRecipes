import { useState } from 'react';

import { useAppDispatch } from '../app/hooks';
import { logIn } from '../logic/authLogic';


const Login = (): JSX.Element => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const dispatch = useAppDispatch();

    return (
        <div>
            <div>
                <h1>Login</h1>
            </div>
            <div>
                <div>
                    <p>Email</p>
                    <input type='email' value={email} onChange={event => setEmail(event.target.value)}/>
                </div>
                <div>
                    <p>Password</p>
                    <input type='password' value={password} onChange={event => setPassword(event.target.value)}/>
                </div>
            </div>
            <div>
                <button onClick={() => logIn(dispatch, email, password)}
                        disabled={(email && password) ? false : true}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;
  