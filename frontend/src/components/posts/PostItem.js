import React from "react";
import PostsButton from "./PostButton";
import { useSelector } from "react-redux";
import './postIndex.css';

const PostItem = ({post}) => {
    const currentUser = useSelector(state => state.session.user);

    return(
        <div id="all-posts">
            <li id="post-li">
                <h2 id="owner-post" >{currentUser.id === post.authorId ? [currentUser.name + " " + currentUser.lastname] : ''}</h2>
                <div id="elements-li">
                    <h3 id="post-content">{post.content}</h3>
                    <PostsButton key={post.id} post={post} />
                </div>
            </li>
        </div>
    );
};

export default PostItem;