import React from "react";
import './postIndex.css';
import PostsButton from "./PostButton";
import './postIndex.css';

const PostItem = ({post}) => {

    return(
        <div id="all-posts">
            <li id="post-li">
                <div id="elements-li">
                    <h3 id="post-content">{post.content}</h3>
                    <PostsButton key={post.id} post={post} />
                </div>
            </li>
        </div>
    );
};

export default PostItem;