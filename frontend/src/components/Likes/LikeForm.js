import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createLike, deleteLike, fetchLike, getLike } from "../../store/like";
import './like.css';

const LikeForm = () => {
    const {likeId} = useParams();
    let history = useHistory();
    const dispatch = useDispatch();
    let path = history.location.pathname;
    let currentPostId = path.slice(1);
    const currentPostIdInt = parseInt(currentPostId);

    const likes = useSelector(state => state.likes);
    const values = Object.values(likes);
    
    const currentUserId = useSelector(state => state.session.user.id);
    let formType = likeId ? 'Delete like' : 'Create like';
    let like = useSelector(getLike(likeId));
    if(formType === 'Create like'){
        like = {
            postId: currentPostId,
            authorId: currentUserId
        }
    }

    const authorId = currentUserId;
    const postId = currentPostId;

    useEffect(() => {
        if(likeId) dispatch(fetchLike(likeId));
    }, [dispatch, likeId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        like = {...like, postId, authorId};
        console.log(values.length);
        if(values.length === 0){
            dispatch(createLike(like));
        } else {
            values.forEach((value) => {
                if(value.authorId === currentUserId && currentPostIdInt === value.postId){
                    dispatch(deleteLike(value.id))
                } else {
                    dispatch(createLike(like));
                }
            });
        }
    };

    return(
        <>
            <button onClick={handleSubmit} id="button-like-form">
                <i className="fa-solid fa-thumbs-up" id="icon-like" >
                    <label id="like-label">Like</label>
                </i>
            </button>
        </>
    );
};

export default LikeForm;