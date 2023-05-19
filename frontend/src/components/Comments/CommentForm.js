import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createComment, fetchComment, getComment, updateComment } from "../../store/comment";
import './commentForm.css';

const CommentForm = () => {
    const {commentId} = useParams();
    const {postId} = useParams();
    let history = useHistory();
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.session.user.id);
    const formType = commentId ? 'Update comment' : 'Create comment';
    let comment = useSelector(getComment(commentId));
    if(formType === 'Create comment'){
        comment = {
            content: '',
            authorId: currentUserId,
            postId: postId
        }
    }

    const [content, setContent] = useState('');
    const [authorId, setAuthorId] = useState(currentUserId);
    const [currentPostId, setCurrentPostId] = useState(postId);

    useEffect(() => {
        if(commentId) dispatch(fetchComment(commentId));
    }, [dispatch, commentId]);

    useEffect(() => {
        if(comment){
            setContent(comment.content);
        }
    }, []);

    const goBack = () => {
        history.go(-1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        comment = {...comment, content, authorId, currentPostId};
        formType === 'Create comment' ? dispatch(createComment(comment)) :
            dispatch(updateComment(comment));
        setContent('');
        let path = `/${postId}`;
        history.push(path);
    };

    return (
        <>
            <form onSubmit={handleSubmit} id="form-comment">
                <label>
                    <input type="text" value={content} id="text-comment"
                        placeholder="Write a comment..."
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </label>
                <button id="button-comment-form"><i className="fa-solid fa-caret-right" id="icon"></i></button>
            </form>
            {formType === 'Update comment' ? <button onClick={goBack} id="go-back-button">Go back</button> : ''}
        </>
    );
};

export default CommentForm;