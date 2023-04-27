import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost, fetchPost } from "../../store/posts";
import { useHistory, Redirect, useParams } from "react-router-dom";
import PostsButton from "./PostButton";
import './postShow.css';

const PostShow = () => {
    const {postId} = useParams();
    const dispatch = useDispatch();
    const post = useSelector(getPost(postId));
    let history = useHistory();
    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(fetchPost(postId));
    }, [dispatch, postId]);

    const goBack = () => {
        history.go(-1);
    };

    if(!currentUser) return <Redirect to={'/'} />

    if (!post) {
        return null;
    }
    
    return(
        <div id="container-post-show">
            <ul id="post-show">
                <div id="container-content">
                    <h3 id="content">{post.content}</h3>
                    <label id="post-button"><PostsButton key={post.id} post={post} /></label>
                </div>
                <br></br>
                <button onClick={goBack} id="go-back-button" >Go back</button>
            </ul>
        </div>
    )
};

export default PostShow;