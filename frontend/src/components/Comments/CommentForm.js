import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createComment, fetchComment, getComment, updateComment } from "../../store/comment";
// import './CommentForm.css';

const CommentForm = () => {
    const {commentId} = useParams();
    let history = useHistory();
    const dispatch = useDispatch();
    let path = history.location.pathname;
    let currentPostId = path.slice(1,3);
    // console.log(currentPostId);
    const currentUserId = useSelector(state => state.session.user.id);
    const formType = commentId ? 'Update comment' : 'Create comment';
    let comment = useSelector(getComment(commentId));
    if(formType === 'Create comment'){
        comment = {
            content: '',
            authorId: currentUserId,
            postId: currentPostId
        }
    }

    const [content, setContent] = useState('');
    const [authorId, setAuthorId] = useState(currentUserId);
    const [postId, setPostId] = useState(currentPostId);

    // useEffect(() => {
    //     if(comment) setContent(comment.content);
    // }, [comment]);

    useEffect(() => {
        if(commentId) dispatch(fetchComment(commentId));
    }, [dispatch, commentId]);

    const goBack = () => {
        history.go(-1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        comment = {...comment, content, authorId, postId};
        formType === 'Create comment' ? dispatch(createComment(comment)) :
            dispatch(updateComment(comment));
    };

    return (
        <>
            <form onSubmit={handleSubmit} id="form-comment">
                <label>
                    <input type="text" value={content} id="text-comment"
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write a comment..."
                        required
                    />
                </label>
                <button id="button-comment-form"><i className="fa-solid fa-caret-right"></i></button>
            </form>
            {formType === 'Update comment' ? <button onClick={goBack} id="go-back-button">Go back</button> : ''}
        </>
    );
};

export default CommentForm;