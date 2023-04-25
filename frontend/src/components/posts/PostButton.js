import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postsActions from '../../store/posts.js'
import { useHistory } from "react-router-dom";
import './postIndex.css';

function PostsButton({post}){
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.session.user.id);
    const [showPostsMenu, setShowPostsMenu] = useState(false);
    const history = useHistory();

    const openMenu = () => {
        if(showPostsMenu) return;
        setShowPostsMenu(true);
    };

    // const postFormEdit = () => {
    //     return(
    //         <PostFormModal />
    //     );
    // };

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
        <>
            <button id="open-menu" onClick={openMenu}>
                <i className="fa-light fa-ellipsis" id="button-post"></i>
            </button>
            { showPostsMenu && (
                <ul className="post-dropdown">
                    <li id="elements-post-button">
                        {post.authorId === currentUserId ? <button onClick={changeRoute}>Edit post</button> : ''}
                        {/* {post.authorId === currentUserId ? <button onClick={changeRoute} id="edit-post-button">Edit post</button> : ''} */}
                    </li>
                    <li id="elements-post-button">
                        {post.authorId === currentUserId ? <button onClick={remove} id="remove-post-button" >Delete post</button> : ''}
                    </li>
                </ul>
            )}
        </>
    )
};

export default PostsButton;