import React from "react";
// import { useDispatch } from "react-redux";

const PostItem = ({post}) => {

    return(
        <li>
            <h3>{post.content}</h3>
        </li>
    );
};

export default PostItem;