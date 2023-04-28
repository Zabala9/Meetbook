import React from "react";
import PostsButton from "./PostButton";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './postIndex.css';
import LikeIndex from "../Likes/LikeIndex";
import CommentForm from "../Comments/CommentForm";

const PostItem = ({post}) => {
    const currentUser = useSelector(state => state.session.user);

    return(
        <div id="all-posts">
            <li id="post-li">
                <h2 id="owner-post" >{currentUser.id === post.authorId ? [currentUser.name + " " + currentUser.lastname] : ''}</h2>
                <div id="elements-li">
                    <label id="post-content">{post.content}</label>
                    <PostsButton key={post.id} post={post} />
                </div>
                <div id="container-likes-comments">
                    <label><LikeIndex /></label>
                    <Link to={`/${post.id}`} id='link-comments' >comments</Link>
                </div>
                {/* <div>
                    <CommentForm />
                </div> */}
            </li>
        </div>
    );
};

export default PostItem;