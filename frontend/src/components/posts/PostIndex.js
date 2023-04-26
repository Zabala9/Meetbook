import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPosts, fetchPosts} from '../../store/posts.js'
import { getUsers } from '../../store/session.js';
import { useHistory, Redirect } from 'react-router-dom';
import PostItem from './PostItem.js';
import PostForm from './PostForm.js';

const PostIndex = () => {
    const dispatch = useDispatch();
    const posts = useSelector(getPosts);
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if(!currentUser) return <Redirect to={'/'} />

    return(
        <>
            <ul id='elements-post-index'>
                <PostForm />
                {
                    posts.map(post =>
                        history.location.pathname === '/' ? <PostItem key={`post${post.id}`} post={post} /> : 
                            history.location.pathname === '/profile' && currentUser.id === post.authorId ? <PostItem key={`post${post.id}`} post={post} /> : ''
                    )
                }
            </ul>
        </>
    );
};

export default PostIndex;