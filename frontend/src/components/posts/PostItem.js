import React, { useEffect } from "react";
import PostsButton from "./PostButton";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers } from '../../store/user.js';
import './postIndex.css';

const PostItem = ({post}) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const allUsers = useSelector(state => state.users);
    const likes = useSelector(state => state.likes);
    const values = Object.values(likes);

    const likesCurrentPost = values.filter((like) => like.postId === post.id);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    let nameOwnerPost;
    if(post.authorId in allUsers){
        let name = allUsers[post.authorId].name;
        let lastName = allUsers[post.authorId].lastname;
        nameOwnerPost = name + ' ' + lastName;
    }

    return(
        // <div id="all-posts">
            <div id="post-li">
                <h2 id="owner-post" >{currentUser.id === post.authorId ? [currentUser.name + " " + currentUser.lastname] : nameOwnerPost}</h2>
                <div id="elements-li">
                    <label id="post-content">{post.content}</label>
                    {post.authorId === currentUser.id ? <PostsButton key={post.id} post={post} /> : undefined}
                </div>
                <div id="container-img">
                    {post.photoUrl !== null ? <img src={post.photoUrl} id="img-post" /> : '' }
                </div>
                <div id="container-likes-comments">
                    {likesCurrentPost.length > 0 ? <Link to={`/${post.id}`} id='link-likes' >{likesCurrentPost.length} like</Link> : undefined}
                    <Link to={`/${post.id}`} id='link-comments' >comments</Link>
                </div>
            </div>
        // </div>
    );
};

export default PostItem;