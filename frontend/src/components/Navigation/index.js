import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import PostIndex from '../posts/PostIndex';
import { Redirect } from "react-router-dom";
import './Navigation.css';
import { Link, useHistory } from 'react-router-dom';
import image from '../../assets/logo.jpg';

function Navigation() {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();

    const changeRoute = () => {
        let path = '/';
        history.push(path);
        window.location.reload(false);
    }

    if(!sessionUser) return <Redirect to={'/'} />

    let sessionLinks;
    let profileLinks;
    if(sessionUser){
        sessionLinks = (
            <>
                <div id='user-options' >
                    <Link id="link-main" to={'/'} onClick={changeRoute} ><img src={image} width={'90px'} height={'85px'} ></img></Link>
                    <ProfileButton user={sessionUser} />
                </div>
                <PostIndex user={sessionUser} />
            </>
        );
        profileLinks = (
            <>
                <div id='user-options' >
                    <Link id="link-main" to={'/'} onClick={changeRoute} ><img src={image} width={'90px'} height={'85px'} ></img></Link>
                    <ProfileButton user={sessionUser} />
                </div>
                <label id="name-user">{sessionUser.name + " " + sessionUser.lastname}</label>
            </>
        )
    };

    return(
        <ul>
            <li>
                {history.location.pathname === '/' ? sessionLinks : 
                    history.location.pathname === '/profile' ? profileLinks : ''}
            </li>
        </ul>
    );
};

export default Navigation;