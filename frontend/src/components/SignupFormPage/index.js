import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormPage(){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if(sessionUser) return <Redirect to={'/'} />;

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
            <h1>Sign up!</h1>
            <label>It's quick and easy.</label>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error) => <li key={error} >{error}</li>)}
                </ul>
                <label>
                    Name: 
                    <input type='text' value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Lastname: 
                    <input type='text' value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Email: 
                    <input type='text' value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password: 
                    <input type='password' value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Confirm Password: 
                    <input type='password' value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <input type='submit' value='Create new account' />
            </form>
        </>
    )
};

export default SignupFormPage;