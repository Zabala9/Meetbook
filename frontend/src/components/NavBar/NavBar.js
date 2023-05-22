import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import image from '../../assets/logo.jpg';
import SearchUser from '../Search/searchUser';
import ProfileButton from '../Navigation/ProfileButton';
import './NavBar.css';

function NavBar(){
    const loggedIn = useSelector(state => state.session.user);
    const history = useHistory();

    const redirecting = () => {
        let newPath = '/games';
        history.push(newPath);
    };

    const getLinks = () => {
        if(loggedIn) {
            return(
                <>
                    <div id='user-options' >
                        <div id='container-search-main'>
                            <Link id="link-main" to={'/'} ><img src={image} width={'90px'} height={'85px'} id='img-bar' alt='' ></img></Link>
                            <SearchUser />
                        </div>
                        <button onClick={redirecting} id='button-games'><i className="fa-solid fa-gamepad" id='icon-button-games'></i></button>
                        <ProfileButton user={loggedIn} />
                    </div>
                </>
            );
        }
    };

    return(
        <>
            {getLinks()}
        </>
    );
};

export default NavBar;
