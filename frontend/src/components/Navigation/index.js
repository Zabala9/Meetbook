import React from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import PostIndex from '../posts/PostIndex';
import { Redirect } from "react-router-dom";
import './Navigation.css';

function Navigation() {
    const sessionUser = useSelector(state => state.session.user);

    if(!sessionUser) return <Redirect to={'/'} />

    let sessionLinks;
    if(sessionUser){
        sessionLinks = (
            <>
                <ProfileButton user={sessionUser} />
                <PostIndex user={sessionUser} />
                {/* <h1>You are Log in!</h1> */}
            </>
        );
    }

    return(
        <ul>
            <li>
                {sessionLinks}
            </li>
        </ul>
    );
};

export default Navigation;