import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getPost, fetchPost, createPost, updatePost} from '../../store/posts';
import './postForm.css';

const PostForm = () => {
    const {postId} = useParams();
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.session.user.id);
    const formType = postId ? 'Update Post' : 'Create Post';
    let post = useSelector(getPost(postId));
    if(formType === 'Create Post'){
        post = {
            content: '',
            authorId: currentUserId
        }
    }

    const [content, setContent] = useState('');
    const [authorId, setAuthorId] = useState(currentUserId);

    useEffect(() => {
        if (post) {
            setContent(post.content);
        }
    }, [post]);

    useEffect(() => {
        if(postId) dispatch(fetchPost(postId));
    }, [dispatch, postId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post = {...post, content, authorId};
        formType === 'Create Post' ? dispatch(createPost(post)) :
            dispatch(updatePost(post));
    };
    
    if (!post) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit} id='form-post'>
            <h2 id='form-type'>{formType === 'Update Post' ? 'Update Post' : ''}</h2>
            <label >
                <input type='text' value={content} id='text-post'
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    required
                />
            </label>
            <button id='button-post-form' >{formType === 'Create Post' ? 'Post' : 'Edit Post'}</button>
        </form>
    )
};

export default PostForm;