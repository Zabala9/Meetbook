import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchLikes } from "../../store/like";
import LikeForm from "./LikeForm";
import './like.css';

const LikeIndex = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLikes());
    }, [dispatch]);

    return(
        <>
            <LikeForm />
        </>
    );
};

export default LikeIndex;