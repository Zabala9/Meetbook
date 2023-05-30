import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SignupFormModal from '../LoginFormModal';
import './LoginForm.css';

function LoginFormPage(){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if(sessionUser) return <Redirect to={'/feed'} />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({email, password}))
            .catch(async (res) => {
                let data;
                try{
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if(data?.errors){
                    setErrors(data.errors);
                } else if(data){
                    setErrors([data]);
                } else {
                    setErrors([res.statusText]);
                }
            });
    };

    const handleSubmitGuest = (e) => {
        e.preventDefault();
        const email = 'andresvaron88@gmail.com';
        const password = 'password';
        return dispatch(sessionActions.login({email, password}))
            .catch(async (res) => {
                let data;
                try{
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if(data?.errors){
                    setErrors(data.errors);
                } else if(data){
                    setErrors([data]);
                } else {
                    setErrors([res.statusText]);
                }
            });
    };

    return (
        <>
            <div id='general'>
                <div id='left'>
                    <form onSubmit={handleSubmitGuest}>
                        <h1>Meetbook</h1>
                        <label>Connect with friends and the</label>
                        <br></br>
                        <label>world around you on Meetbook.</label>
                        <br />
                        <br />
                        <label>You can try our website without Log In</label>
                        <br></br>
                        <label>clicking here </label>
                        <input id='form-left' type='submit' value={'demo User'} />
                    </form>
                </div>
                <div id='rigth'>
                    <form onSubmit={handleSubmit}>
                        <ul>
                            {errors.map(error => <li key={error} >{error}</li>)}
                        </ul>
                        <label id='email'>
                            <input type='text' value={email}
                                onChange={(e) => setEmail(e.target.value)} placeholder='Email'
                                required
                            /> 
                        </label>
                        <label id='password'>
                            <input type='password' value={password}
                                onChange={(e) => setPassword(e.target.value)} placeholder='Password'
                                required
                            />
                        </label>
                        <input type='submit' value='Log In' id='login-button' />
                    </form>
                    <SignupFormModal />
                </div>
            </div>
        </>
    )
};

export default LoginFormPage;