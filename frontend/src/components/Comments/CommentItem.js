import React, {useEffect} from "react";
import CommentButton from "./CommentButton";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { fetchUsers } from '../../store/user.js';
import { getPost } from "../../store/posts";
import './commentIndex.css';

const CommentItem = ({comment}) => {
    const dispatch = useDispatch();
    const {postId} = useParams();
    const currentUser = useSelector(state => state.session.user);
    const allUsers = useSelector(state => state.users);
    const currentPost = useSelector(state => state.posts[postId]);

    console.log(comment);

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(getPost(postId));
    }, [dispatch]);

    let nameOwnerComment;
    if(comment.authorId in allUsers){
        let name = allUsers[comment.authorId].name;
        let lastName = allUsers[comment.authorId].lastname;
        nameOwnerComment = name + ' ' + lastName;
    }

    return(
        <div id="all-comments">
            <li id="comment-li">
                <label id="owner-comment">{currentUser.id === comment.authorId ? [currentUser.name + " " + currentUser.lastname] : nameOwnerComment}</label>
                <div id="elements-li">
                    <label id="comment-content">{comment.content}</label>
                    {currentPost.authorId === comment.authorId || 
                        currentPost.authorId === currentUser.id && currentPost.id === comment.postId ||
                        comment.authorId === currentUser.id ? <CommentButton key={comment.id} comment={comment} /> : undefined }
                </div>
            </li>
        </div>
    );
};

export default CommentItem;