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

    const about = () => {
        let path = '/about';
        history.push(path);
    };

    return (
        <div id="dropdown-profile" style={{textAlign: 'right'}}>
            <button id="user-button" onClick={openMenu} >
                <i className="fa-solid fa-user fa-xl" />
            </button>
            { showMenu && (
                <div id="elements-profile-dropdown">
                    <button onClick={changeRoute} id="profile-button" >Profile</button>
                    <button onClick={about} id="about-button"><i className="fa-solid fa-circle-info"></i> About us</button>
                    <button onClick={logout} id="logout-button" ><i className="fa-solid fa-person-through-window"></i> Log out</button>
                </div>
            )}
        </div>
    )
};

export default ProfileButton;