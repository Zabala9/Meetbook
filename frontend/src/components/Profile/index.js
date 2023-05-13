import React from "react";
import { useSelector } from "react-redux";
import PostIndex from "../posts/PostIndex";
import { Redirect } from "react-router-dom";
import './profile.css';

function Profile(){
    const sessionUser = useSelector(state => state.session.user);

    if(!sessionUser) return <Redirect to={'/'} />

    return (
        <div id="content">
            <PostIndex user={sessionUser} />
        </div>
    );
};

export default Profile;