import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, fetchPosts } from "../../store/posts";
import { useHistory, Redirect, Link } from "react-router-dom";
import SearchUser from "./searchUser";
import image from '../../assets/logo.jpg';
import ProfileButton from "../Navigation/ProfileButton";
import PostItem from "../posts/PostItem";
import './searchUser.css';

const ProfileVisited = () => {
    const dispatch = useDispatch();
    let posts = useSelector(getPosts);
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user);
    const users = useSelector(state => state.users);
    const path = window.location.pathname;
    const pathCheck = path.slice(1);
    const pathCheckInt = parseInt(pathCheck);

    const changeRoute = () => {
        let newPath = '/';
        history.push(newPath);
    }

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if(!currentUser) return <Redirect to={'/'} />
    if(currentUser.id === pathCheckInt){
        let path = '/profile';
        history.push(path);
    }

    posts = posts.filter((post) => post.authorId === pathCheckInt);

    let links;
    if(currentUser){
        links = (
            <>
                <label id="name-user-visited">{}</label>
                <div id="content-profile-visited">
                    {
                        posts.map((post) =>
                            <>
                                <PostItem key={`post${post.id}`} post={post} />
                            </>
                        )
                    }
                </div>
            </>
        );
    };

    let renderLinks = links;

    return(
        <li id="li-index-profile-visited">
            {renderLinks}
        </li>
    );
};

export default ProfileVisited;