import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
// import Profile from '../Profile/index';
import { Redirect, useHistory } from "react-router-dom";

function ProfileButton(){
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();

    const changeRoute = () => {
        let path = '/profile'
        history.push(path);
    };

    // const changeRouteLogout = () => {
    //     let pathLogout = '/';
    //     history.push(pathLogout);
    // };

    const openMenu = () => {
        if(showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if(!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
            <button onClick={openMenu} >
                <i className="fa-solid fa-user" />
            </button>
            { showMenu && (
                <ul className="profile-dropdown" >
                    <li>
                        <button onClick={changeRoute} id="profile-button" >Profile</button>
                    </li>
                    <li>
                        <button onClick={logout} id="logout-button" >Log Out</button>
                    </li>
                </ul>
            )}
        </>
    )
};

export default ProfileButton;