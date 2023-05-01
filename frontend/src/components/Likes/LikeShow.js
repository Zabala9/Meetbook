import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikes, fetchLikes } from "../../store/like";
import { useHistory, Redirect, useParams } from "react-router-dom";

const LikeShow = () => {
    const dispatch = useDispatch();
    let likes = useSelector(getLikes);
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchLikes);
    }, [dispatch]);

    return(
        <>
            <ul id="users-likes-post">
                
            </ul>
        </>
    );
};

export default LikeShow;