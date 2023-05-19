import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postsActions from '../../store/posts.js'
import { useHistory } from "react-router-dom";
import './postIndex.css';

function PostsButton({post}){
    const dispatch = useDispatch();
    const [showPostsMenu, setShowPostsMenu] = useState(false);
    const history = useHistory();

    const changeRoute = () => {
        let path = `${post.id}/edit`
        history.push(path);
    };

    useEffect(() => {
        if(!showPostsMenu) return;

        const closePostsMenu = () => {
            setShowPostsMenu(false);
        };

        document.addEventListener('click', closePostsMenu);

        return () => document.removeEventListener('click', closePostsMenu);
    }, [showPostsMenu]);

    const remove = (e) => {
        e.preventDefault();
        dispatch(postsActions.deletePost(post.id))
    };

    return(
        <div id="dropdown">
            <button id="dropbtn" >
                <i className="fa-solid fa-ellipsis" id="button-post" />
            </button>
            <div id="dropdown-content">
                <button onClick={changeRoute} id="edit-post-button" >Edit post</button>
                <button onClick={remove} id="remove-post-button" >Delete post</button>
            </div>
        </div>
    )
};

export default PostsButton;