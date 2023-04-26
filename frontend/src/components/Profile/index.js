import React from "react";
import { useSelector } from "react-redux";
import PostIndex from "../posts/PostIndex";
import './profile.css';

function Profile(){
    const currentNameUser = useSelector(state => state.session.user.name);
    const currentLastnameUser = useSelector(state => state.session.user.lastname);

    return (
        <>
            <label id="name-user">{currentNameUser + " " + currentLastnameUser}</label>
            <div id="content">
                <PostIndex />
            </div>
        </>
    );
};

export default Profile;