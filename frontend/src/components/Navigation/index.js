import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import ProfileVisited from '../Search/profileVisited';
import './Navigation.css';

function Navigation() {
    const sessionUser = useSelector(state => state.session.user);
    const users = useSelector(state => state.users)
    const history = useHistory();

    if(!sessionUser) return <Redirect to={'/'} />

    let pathProfileVisited = history.location.pathname;
    let newPath = pathProfileVisited.split('/');
    let finalPath;
    if(newPath[1] in users){
        let nameInPath = users[newPath[1]].name + users[newPath[1]].lastname;
        finalPath = '/' + newPath[1] + '/' + nameInPath;
    }


    let renderLinks;
    if(history.location.pathname === finalPath){
        renderLinks = <ProfileVisited />
    }

    return(
        <li id='li-index-navigation'>
            {renderLinks}
        </li>
    );
};

export default Navigation;