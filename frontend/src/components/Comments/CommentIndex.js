import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments, fetchComments } from "../../store/comment";
import { useHistory, Redirect } from "react-router-dom";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

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

    // if(history.location.pathname){
    comments = comments.filter((comment) => comment.postId === currentPostIdInt);
    // }

    return(
        <>
            <ul id="elements-comment-index">
                {
                    comments.map(comment =>
                        <CommentItem key={`comment${comment.id}`} comment={comment} />
                    )
                }
                <CommentForm />
            </ul>
        </>
    )
};

export default CommentIndex;