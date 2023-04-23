import React, {useState} from "react";
import * as sessionActions from '../../store/session';
import { useDispatch } from "react-redux";
import './signForm.css';

function SignupForm(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({name, lastname, email, password}))
                .catch(async (res) => {
                let data;
                try{
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if(data?.errors) {
                    setErrors(data.errors);
                } else if(data){
                    setErrors([data]);
                } else {
                    setErrors([res.statusText]);
                }
            });
        }
        return setErrors(['The Confirm Password must be the same as the Password.']);
    };

    return (
        <>
            <div id="main-text">
                <h1>Sign up!</h1>
                <label>It's quick and easy.</label>
            </div>
            <form onSubmit={handleSubmit}>
                <div id="names">
                    <ul>
                        {errors.map((error) => <li key={error} >{error}</li>)}
                    </ul>
                    <label id="name">
                        <input type='text' value={name}
                            onChange={(e) => setName(e.target.value)} placeholder="name"
                            required
                        />
                    </label>
                    <label id="lastname">
                        <input type='text' value={lastname}
                            onChange={(e) => setLastname(e.target.value)} placeholder="lastname"
                            required
                        />
                    </label>
                </div>
                <div id="email">
                    <label id="email-sign">
                        <input type='text' value={email}
                            onChange={(e) => setEmail(e.target.value)} placeholder="email"
                            required
                        />
                    </label>
                </div>
                <div id="passwords-label">
                    <label id="password-sign">
                        <input type='password' value={password}
                            onChange={(e) => setPassword(e.target.value)} placeholder="password"
                            required
                        />
                    </label>
                    <label id="confirm-password">
                        <input type='password' value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} placeholder="confirm password"
                            required
                        />
                    </label>
                </div>
                <input id="sign-up" type='submit' value='Sign Up' />
            </form>
        </>
    );
};

export default SignupForm;