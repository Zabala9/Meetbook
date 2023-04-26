import React from "react";
import PostsButton from "./PostButton";
import { useSelector } from "react-redux";
import './postIndex.css';

const PostItem = ({post}) => {
    const currentNameUser = useSelector(state => state.session.user.name);
    const currentLastnameUser = useSelector(state => state.session.user.lastname);
    const currentUserId = useSelector(state => state.session.user.id);

    return(
        <div id="all-posts">
            <li id="post-li">
                <h2 id="owner-post" >{currentUserId === post.authorId ? [currentNameUser + " " + currentLastnameUser] : ''}</h2>
                <div id="elements-li">
                    <h3 id="post-content">{post.content}</h3>
                    <PostsButton key={post.id} post={post} />
                </div>
            </li>
        </div>
    );
};

export default PostItem;