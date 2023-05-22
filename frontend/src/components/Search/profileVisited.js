import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, fetchPosts } from "../../store/posts";
import { useHistory, Redirect } from "react-router-dom";
import PostItem from "../posts/PostItem";
import './searchUser.css';

const ProfileVisited = () => {
    const dispatch = useDispatch();
    let posts = useSelector(getPosts);
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user);
    const profileUserVisited = useSelector(state => state.users);
    const path = window.location.pathname;
    const pathCheck = path.slice(1);
    const pathCheckInt = parseInt(pathCheck);

    const infoUserVisited = profileUserVisited[pathCheckInt]

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
                <label id="name-user-visited">{infoUserVisited.name + ' ' + infoUserVisited.lastname}</label>
                <div id="content-profile-visited">
                    <label id="posts-label">Posts</label>
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