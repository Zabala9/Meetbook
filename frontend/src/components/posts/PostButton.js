import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postsActions from '../../store/posts.js'
import { useHistory } from "react-router-dom";
import './post.css';

function PostsButton({post}){
    const dispatch = useDispatch();
    const [showPostsMenu, setShowPostsMenu] = useState(false);
    const history = useHistory();

    const openMenu = () => {
        if(showPostsMenu) return;
        setShowPostsMenu(true);
    };

    const changeRoute = () => {
        let path = '/edit'
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
        <>
            <button onClick={openMenu}>
                <i className="fa-light fa-ellipsis" id="button-post"></i>
            </button>
            { showPostsMenu && (
                <ul className="post-dropdown">
                    <li>
                        <button onClick={changeRoute} id="edit-post-button">Edit post</button>
                    </li>
                    <li>
                        <button onClick={remove} id="remove-post-button" >Delete post</button>
                    </li>
                </ul>
            )}
        </>
    )
};

export default PostsButton;