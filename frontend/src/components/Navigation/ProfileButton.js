import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router-dom";
import './Navigation.css';

function ProfileButton(){
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();

    const changeRoute = () => {
        let path = '/profile'
        history.push(path);
    };

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
            <button id="user-button" onClick={openMenu} >
                <i className="fa-solid fa-user fa-xl" />
            </button>
            { showMenu && (
                <ul className="profile-dropdown" >
                    <div id="elements-profile-dropdown">
                        <li>
                            <button onClick={changeRoute} id="profile-button" >Profile</button>
                        </li>
                        <li>
                            <button onClick={logout} id="logout-button" >Log Out</button>
                        </li>
                    </div>
                </ul>
            )}
        </>
    )
};

export default ProfileButton;