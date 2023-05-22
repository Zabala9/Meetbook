import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikes, fetchLikes } from "../../store/like";
import { useHistory, Link } from "react-router-dom";
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

    const likesCounter = likes.filter((like) => like.postId === currentPostIdInt);
    console.log(likesCounter, 'counter')

    let countLikes = 0;
    likesCounter.forEach((like) => {
        countLikes += 1;
    });

    return(
        <>
            <Link  id="counter-likes">{countLikes === 0 ? '' : countLikes}</Link>
            <br></br>
            <LikeForm />
        </>
    );
};

export default LikeIndex;