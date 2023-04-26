import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPosts, fetchPosts} from '../../store/posts.js'
import { getUsers } from '../../store/session.js';
import { useHistory } from 'react-router-dom';
import PostItem from './PostItem.js';
import PostForm from './PostForm.js';

const PostIndex = () => {
    const dispatch = useDispatch();
    const posts = useSelector(getPosts);
    const history = useHistory();
    const users = useSelector(getUsers);
    const currentUserId = useSelector(state => state.session.user.id)

    console.log(users);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return(
        <>
            <ul id='elements-post-index'>
                <PostForm />
                {
                    posts.map(post =>
                        history.location.pathname === '/' ? <PostItem key={`post${post.id}`} post={post} /> : 
                            currentUserId === post.authorId ? <PostItem key={`post${post.id}`} post={post} /> : ''
                    )
                }
            </ul>
        </>
    );
};

export default PostIndex;