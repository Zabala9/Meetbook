import React from "react";
import CommentButton from "./CommentButton";
import { useSelector } from "react-redux";

const CommentItem = ({comment}) => {
    const currentUser = useSelector(state => state.session.user);

    return(
        <div id="all-comments">
            <li id="comment-li">
                <h2 id="owner-comment">{currentUser.id === comment.authorId ? [currentUser.name + " " + currentUser.lastname] : ''}</h2>
                <div id="elements-li">
                    <label id="comment-content">{comment.content}</label>
                    <CommentButton key={comment.id} comment={comment} />
                </div>
            </li>
        </div>
    );
};

export default CommentItem;