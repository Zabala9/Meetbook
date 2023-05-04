import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPosts, fetchPosts} from '../../store/posts.js'
import { useHistory, Redirect } from 'react-router-dom';
import PostItem from './PostItem.js';
import PostForm from './PostForm.js';

const PostIndex = () => {
    const dispatch = useDispatch();
    let posts = useSelector(getPosts);
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user);

    if(history.location.pathname === '/profile'){
        posts = posts.filter((post) => post.authorId === currentUser.id)
    };

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if(!currentUser) return <Redirect to={'/'} />

    return(
        <>
            <ul id='elements-post-index'>
                <div>
                    <PostForm />
                    {
                        posts.map(post =>
                            <PostItem key={`post${post.id}`} post={post} />
                        )
                    }
                </div>
            </ul>
        </>
    );
};

export default PostIndex;