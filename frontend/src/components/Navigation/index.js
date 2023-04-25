import React from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import PostIndex from '../posts/PostIndex';
import { Redirect } from "react-router-dom";
import './Navigation.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Navigation() {
    const sessionUser = useSelector(state => state.session.user);

    if(!sessionUser) return <Redirect to={'/'} />

    let sessionLinks;
    if(sessionUser){
        sessionLinks = (
            <>
                <Link to={'/'} >Main</Link>
                <ProfileButton user={sessionUser} />
                <PostIndex user={sessionUser} />
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