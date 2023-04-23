import React from "react";
import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

function Profile(){
    // const sessionUser = useSelector(state => state.session.user);
    // if(sessionUser) return <Redirect to={'/profile'} />;

    return (
        <h1>This is your profile!</h1>
    )
};

export default Profile;