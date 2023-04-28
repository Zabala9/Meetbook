import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createLike, deleteLike, fetchLike, getLike } from "../../store/like";

const LikeForm = () => {
    const {likeId} = useParams();
    let history = useHistory();
    const dispatch = useDispatch();
    let path = history.location.pathname;
    let currentPostId = path.slice(1,3);

    const currentUserId = useSelector(state => state.session.user.id);
    const formType = likeId ? 'Delete like' : 'Create like';
    let like = useSelector(getLike(likeId));
    if(formType === 'Create like'){
        like = {
            postId: currentPostId,
            authorId: currentUserId
        }
    }

    const [authorId, setAuthorId] = useState(currentUserId);
    const [postId, setPostId] = useState(currentPostId);

    useEffect(() => {
        if(likeId) dispatch(fetchLike(likeId));
    }, [dispatch, likeId]);

    const goBack = () => {
        history.go(-1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        like = {...like, postId, authorId};
        formType === 'Create like' ? dispatch(createLike(like)) :
            dispatch(deleteLike(like));
    };

    return(
        <>
            <button onClick={handleSubmit} id="button-like-form"><i className="fa-solid fa-thumbs-up" id="icon-like"></i></button>
        </>
    );
};

export default LikeForm;