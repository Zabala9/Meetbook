import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import { useHistory } from "react-router-dom";
import './Navigation.css';

function ProfileButton(){
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user);
    // console.log(userName);

    const changeRoute = () => {
        let path = '/profile'
        history.push(path);
        window.location.reload(false);
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
                        <li id="li-button">
                            <button onClick={changeRoute} id="profile-button" >Profile</button>
                        </li>
                        <li id="li-button">
                            <button onClick={logout} id="logout-button" ><i className="fa-solid fa-person-through-window"></i> Log out</button>
                        </li>
                    </div>
                </ul>
            )}
        </>
    )
};

export default ProfileButton;