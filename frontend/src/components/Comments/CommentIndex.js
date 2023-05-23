import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments, fetchComments } from "../../store/comment";
import { useHistory } from "react-router-dom";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import './commentIndex.css';

const CommentIndex = () => {
    const dispatch = useDispatch();
    let comments = useSelector(getComments);
    const history = useHistory();
    let path = history.location.pathname;
    let currentPostId = path.slice(1);
    let currentPostIdInt = parseInt(currentPostId);
    
    useEffect(() => {
        dispatch(fetchComments());
    }, [dispatch]);

    comments = comments.filter((comment) => comment.postId === currentPostIdInt);

    return(
        <>
            <ul id="elements-comment-index">
                <div id="container-comment-form">
                    <CommentForm />
                </div>
                <div id="container-label-all-comments">
                    <label id="label-comments">All Comments</label>
                </div>
                {
                    comments.map(comment =>
                        <CommentItem key={`comment${comment.id}`} comment={comment} />
                    )
                }
            </ul>
        </>
    )
};

export default CommentIndex;