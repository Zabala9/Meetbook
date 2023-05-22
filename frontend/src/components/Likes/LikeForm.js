import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createLike, deleteLike } from "../../store/like";
import './like.css';

const LikeForm = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    let path = history.location.pathname;
    let currentPostId = path.slice(1);
    const currentPostIdInt = parseInt(currentPostId);

    const likes = useSelector(state => state.likes);
    const values = Object.values(likes);
    const likesCurrentPost = values.filter((likeValue) => likeValue.postId === currentPostIdInt );
    const currentUserId = useSelector(state => state.session.user.id);

    const authorId = currentUserId;
    const postId = currentPostId;

    let like;

    const handleSubmit = (e) => {
        e.preventDefault();
        like = {...like, postId, authorId};
        if(likesCurrentPost.length === 0){
            dispatch(createLike(like));
        } else {
            const currentUserLikes = likesCurrentPost.filter((value) => value.authorId === currentUserId );
            if(currentUserLikes.length > 0){
                dispatch(deleteLike(currentUserLikes[0].id));
            } else if (currentUserLikes.length === 0){
                dispatch(createLike(like));
            }
        }
    };
    
    return(
        <>
            <div id="container-likes-counter">
                {likesCurrentPost.length > 0 ? <label id="likes-counter">{likesCurrentPost.length}</label> : undefined}
            </div>
            <button onClick={handleSubmit} id="button-like-form">
                <i className="fa-solid fa-thumbs-up" id="icon-like" >
                    <label id="like-label">Like</label>
                </i>
            </button>
        </>
    );
};

export default LikeForm;