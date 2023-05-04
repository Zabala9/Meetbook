import React, { useEffect } from "react";
import PostsButton from "./PostButton";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers, fetchUsers } from '../../store/user.js';
import './postIndex.css';

const PostItem = ({post}) => {
    let users = useSelector(getUsers);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const allUsers = useSelector(state => state.users);
    // console.log(post.photoUrl);

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
        <div id="all-posts">
            <li id="post-li">
                <h2 id="owner-post" >{currentUser.id === post.authorId ? [currentUser.name + " " + currentUser.lastname] : nameOwnerPost}</h2>
                <div id="elements-li">
                    <label id="post-content">{post.content}</label>
                    <PostsButton key={post.id} post={post} />
                </div>
                <div id="container-img">
                    {post.photoUrl !== '' ? <img src={post.photoUrl} id="img-post" /> : '' }
                </div>
                <div id="container-likes-comments">
                    <Link to={`/${post.id}`} id='link-comments' >comments</Link>
                </div>
            </li>
        </div>
    );
};

export default PostItem;