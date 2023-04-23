import React from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation() {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if(sessionUser){
        sessionLinks = (
            <>
                <ProfileButton user={sessionUser} />
                <h1>You are Log in!</h1>
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