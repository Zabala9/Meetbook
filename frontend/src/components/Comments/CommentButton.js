import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import * as commentsActions from '../../store/comment.js';
import { useHistory } from "react-router-dom";
import CommentForm from "./CommentForm.js";

function CommentButton({comment}){
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.session.user.id);
    const [showCommentMenu, setShowCommentMenu] = useState(false);
    const history = useHistory();

    const openMenu = () => {
        if(showCommentMenu) return;
        setShowCommentMenu(true);
    };

    // const changeRoute = () => {
    //     let path = `${comment.id}/edit`;
    //     history.push(path);
    // };

    const callingCommentForm = () => {
        return(
            <CommentForm />
        );
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
        <>
            <button id="open-menu" onClick={openMenu}>
                <i className="fa-solid fa-ellipsis" id="button-comment" />
            </button>
            {showCommentMenu && (
                <ul id="comment-dropdown">
                    <div>
                        <li id="elements-comment-button">
                            {comment.authorId === currentUserId ? <button onClick={callingCommentForm} id="edit-comment-button">Edit comment</button> : ''}
                        </li>
                        <li>
                            {comment.authorId === currentUserId ? <button onClick={remove} id="remove-comment-button">Delete comment</button> : ''}
                        </li>
                    </div>
                </ul>
            )}
        </>
    );
};

export default CommentButton;