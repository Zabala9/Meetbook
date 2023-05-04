import {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getPost, fetchPost, createPost, updatePost} from '../../store/posts';
import './postForm.css';
import csrfFetch from '../../store/csrf';

const PostForm = () => {
    const {postId} = useParams();
    let history = useHistory();
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
    const [photoFile, setPhotoFile] = useState(null);

    useEffect(() => {
        if(post){
            setContent(post.content);
        }
    }, []);

    useEffect(() => {
        if(postId) dispatch(fetchPost(postId));
    }, [dispatch, postId]);

    const goBack = () => {
        history.go(-1);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        Object.assign(formData, {'content': content});
        Object.assign(formData, {'authorId': authorId});
        if (photoFile) {
            Object.assign(formData, {'photo': photoFile});
        }
        // 
        formType === 'Create Post' ? dispatch(createPost(formData)) :
            dispatch(updatePost(formData));
        
        console.log(formData, 'here');

        // const res = await csrfFetch('api/posts', {
        //     method: 'POST',
        //     body: formData
        // });
        // if(res.ok){
        //     const newPost = await res.json();
        //     setContent('');
        //     setPhotoFile(null);
        // }
        // post = {...post, content, authorId};
    };

    const handleFile = ({currentTarget}) => {
        const file = currentTarget.files[0];
        setPhotoFile(file);
    };
    
    if (!post) {
        return null;
    }

    return (
        <>
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
                <br></br>
                <input type='file' id='choose-file' onChange={handleFile} />
            </form>
            {formType === 'Update Post' ? <button onClick={goBack} id="go-back-button" >Go back</button> : '' }
        </>
    )
};

export default PostForm;