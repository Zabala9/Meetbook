import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPosts, fetchPosts} from '../../store/posts.js'
import PostsButton from './PostButton.js';
import PostItem from './PostItem.js';

const PostIndex = () => {
    const dispatch = useDispatch();
    const posts = useSelector(getPosts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return(
        <>
            <ul>
                {
                    posts.map(post => <>
                    <PostItem key={`post${post.id}`} post={post} />
                    <PostsButton
                        post={post}
                        key={post.id}
                    /> </>)
                }
            </ul>
        </>
    );
};

export default PostIndex;