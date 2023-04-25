import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPosts, fetchPosts} from '../../store/posts.js'
import PostItem from './PostItem.js';
import PostForm from './PostForm.js';

const PostIndex = () => {
    const dispatch = useDispatch();
    const posts = useSelector(getPosts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return(
        <>
            <ul>
                <PostForm />
                {
                    posts.map(post => <>
                    <PostItem key={`post${post.id}`} post={post} />
                    </>)
                }
            </ul>
        </>
    );
};

export default PostIndex;