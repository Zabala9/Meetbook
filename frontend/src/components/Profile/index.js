import React from "react";
import { useSelector } from "react-redux";
import PostIndex from "../posts/PostIndex";
import './profile.css';

function Profile(){
    const sessionUser = useSelector(state => state.session.user);

    return (
        <>
            <div id="content">
                <PostIndex user={sessionUser} />
            </div>
        </>
    );
};

export default Profile;