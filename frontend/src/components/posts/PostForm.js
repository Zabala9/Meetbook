import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getPost, fetchPost, createPost, updatePost} from '../../store/posts';

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

    const [content, setContent] = useState(post.content);
    const [authorId, setAuthorId] = useState(currentUserId);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if(postId) dispatch(fetchPost(postId));
    }, [dispatch, postId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post = {...post, content, authorId};
        formType === 'Create Post' ? dispatch(createPost(post)) :
            dispatch(updatePost(post));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{formType}</h2>
            <label>
                <input type='text' value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder='What is on your mind?'
                    required
                />
            </label>
            <input id='create-post' type='submit' value='Post' />
        </form>
    )
};

export default PostForm;