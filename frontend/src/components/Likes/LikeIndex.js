import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikes, fetchLikes } from "../../store/like";
import { useHistory } from "react-router-dom";
import LikeForm from "./LikeForm";
import './like.css';

const LikeIndex = () => {
    const dispatch = useDispatch();
    let likes = useSelector(getLikes);
    const history = useHistory();
    let path = history.location.pathname;
    let currentPostId = path.slice(1,3);
    let currentPostIdInt = parseInt(currentPostId);

    useEffect(() => {
        dispatch(fetchLikes());
    }, [dispatch]);

    likes = likes.filter((like) => like.postId === currentPostIdInt);
    // let finalLikes = likes;

    let countLikes = 0;
    likes.forEach((like) => {
        countLikes += 1;
    });

    return(
        <>
            <label id="counter-likes">{countLikes === 0 ? '' : countLikes}</label>
            <br></br>
            <LikeForm />
        </>
    );
};

export default LikeIndex;