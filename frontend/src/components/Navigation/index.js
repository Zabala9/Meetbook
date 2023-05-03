import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import PostIndex from '../posts/PostIndex';
import { Redirect } from "react-router-dom";
import { Link, useHistory } from 'react-router-dom';
import SearchUser from '../Search/searchUser';
import image from '../../assets/logo.jpg';
import './Navigation.css';
import ProfileVisited from '../Search/profileVisited';
import numbers from './numbers';

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
                    <div id='container-search-main'>
                        <Link id="link-main" to={'/'} onClick={changeRoute} ><img src={image} width={'90px'} height={'85px'} ></img></Link>
                        <SearchUser />
                    </div>
                    {/* <button id='button-games'><i className="fa-solid fa-gamepad" id='icon-button-games'></i></button> */}
                    <ProfileButton user={sessionUser} />
                </div>
                <PostIndex user={sessionUser} />
            </>
        );
        profileLinks = (
            <>
                <div id='user-options' >
                    <div id='container-search-main'>
                        <Link id="link-main" to={'/'} onClick={changeRoute} ><img src={image} width={'90px'} height={'85px'} ></img></Link>
                        <SearchUser />
                    </div>
                    {/* <button id='button-games'><i className="fa-solid fa-gamepad" id='icon-button-games'></i></button> */}
                    <ProfileButton user={sessionUser} />
                </div>
                <label id="name-user">{sessionUser.name + " " + sessionUser.lastname}</label>
                <div id="content">
                    <PostIndex user={sessionUser} />
                </div>
            </>
        )
    };

    let pathNumber = history.location.pathname;
    let renderLinks;
    if(history.location.pathname === '/profile'){
        renderLinks = profileLinks;
    } else if(history.location.pathname === '/'){
        renderLinks = sessionLinks;
    } else if(pathNumber.slice(1) in numbers){
        renderLinks = <ProfileVisited />
        // window.location.reload(false);
    } else {
        renderLinks = sessionLinks;
    }

    return(
        <li id='li-index-navigation'>
            {renderLinks}
        </li>
    );
};

export default Navigation;