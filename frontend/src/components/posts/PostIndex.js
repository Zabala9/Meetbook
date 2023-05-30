import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getPosts, fetchPosts} from '../../store/posts.js'
import { useHistory, Redirect } from 'react-router-dom';
import PostItem from './PostItem.js';
import PostForm from './PostForm.js';
import './postIndex.css';

export let paths = ['/feed'];

const PostIndex = () => {
    paths= ['/feed'];
    const dispatch = useDispatch();
    let posts = useSelector(getPosts);
    const history = useHistory();
    const currentUser = useSelector(state => state.session.user);

    if(history.location.pathname === '/profile'){
        posts = posts.filter((post) => post.authorId === currentUser.id)
        paths = ['/profile'];
    };

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if(!currentUser) return <Redirect to={'/'} />

    console.log(paths);

    return(
        <>
            <div id='conteiner-elements-post-index'>
                <div id='elements-post-index'>
                    {/* {window.location.pathname === '/feed' ? <div id='left-sidebar'>
                        <label>Test</label>
                    </div> : undefined} */}
                    <div id='container-post-index'>
                        <PostForm />
                        {window.location.pathname === '/profile' ? <label id='label-posts'>Posts</label> : undefined}
                        {
                            posts.map(post =>
                                <PostItem key={`post${post.id}`} post={post} />
                            )
                        }
                    </div>
                    {/* {window.location.pathname === '/feed' ? <div id='rigth-sidebar'>
                        <label>Test #2</label>
                    </div> : undefined} */}
                </div>
            </div>
        </>
    );
};

export default PostIndex;