import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost, fetchPost } from "../../store/posts";
import { useHistory, Redirect, useParams } from "react-router-dom";
import PostsButton from "./PostButton";

const PostShow = () => {
    const {postId} = useParams();
    const dispatch = useDispatch();
    let post = useSelector(getPost(postId));
    let history = useHistory();
    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(fetchPost(postId));
    }, [dispatch]);

    const goBack = () => {
        history.go(-1);
    };

    if(!currentUser) return <Redirect to={'/'} />
    
    return(
        <ul id="post-show">
            <h3>{post.content}</h3>
            <PostsButton key={post.id} post={post} />
            <button onClick={goBack} >Go back</button>
        </ul>
    )
};

export default PostShow;