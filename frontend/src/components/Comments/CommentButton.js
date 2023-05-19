import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as commentsActions from '../../store/comment.js';
import { useHistory } from "react-router-dom";
import './commentIndex.css';

function CommentButton({comment}){
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.session.user.id);
    const [showCommentMenu, setShowCommentMenu] = useState(false);
    const history = useHistory();
    let path = history.location.pathname;
    let currentPostId = path.slice(1);
    let currentPostIdInt = parseInt(currentPostId);

    const openMenu = () => {
        if(showCommentMenu) return;
        setShowCommentMenu(true);
    };

    const changeRoute = () => {
        let path = `/${currentPostIdInt}/comment/${comment.id}/edit`;
        history.push(path);
    };

    useEffect(() => {
        if(!showCommentMenu) return;

        const closeCommentMenu = () => {
            setShowCommentMenu(false);
        };

        document.addEventListener('click', closeCommentMenu);
        return () => document.removeEventListener('click', closeCommentMenu);
    }, [showCommentMenu]);

    const remove = (e) => {
        e.preventDefault();
        dispatch(commentsActions.deleteComment(comment.id));
    };

    return(
        <div id="dropdown-comment" style={{textAlign: 'right'}} >
            <button id="open-menu-comment" onClick={openMenu}>
                <i className="fa-solid fa-ellipsis" id="button-comment" />
            </button>
            {showCommentMenu && (
                <div id="dropdown-content-comment">
                    {comment.authorId === currentUserId ? <button onClick={changeRoute} id="edit-comment-button">Edit comment</button> : ''}
                    {comment.authorId === currentUserId ? <button onClick={remove} id="remove-comment-button">Delete comment</button> : ''}
                </div>
            )}
        </div>
    );
};

export default CommentButton;