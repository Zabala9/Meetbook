import React, {useEffect} from "react";
import CommentButton from "./CommentButton";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from '../../store/user.js';
import './commentIndex.css';

const CommentItem = ({comment}) => {
    // let users = useSelector(getUsers);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const allUsers = useSelector(state => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
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
                <h2 id="owner-comment">{currentUser.id === comment.authorId ? [currentUser.name + " " + currentUser.lastname] : nameOwnerComment}</h2>
                <div id="elements-li">
                    <label id="comment-content">{comment.content}</label>
                    <CommentButton key={comment.id} comment={comment} />
                </div>
            </li>
        </div>
    );
};

export default CommentItem;