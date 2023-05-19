import {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getPost, fetchPost, createPost, updatePost} from '../../store/posts';
import './postForm.css';

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
    const [photoUrl, setPhotoUrl] = useState(null);

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
        formData.append('post[content]', content);
        formData.append('post[authorId]', authorId);
        if (photoFile !== null) {
            formData.append('post[photo]', photoFile);
        }

        formType === 'Create Post' ? dispatch(createPost(formData)) :
            dispatch(updatePost(post.id, formData));

        setContent('');
        setPhotoFile(null);
        setPhotoUrl(null);
        let path = '/feed';
        history.push(path);
    };

    const handleFile = ({currentTarget}) => {
        const file = currentTarget.files[0];
        setPhotoFile(file);
        if(file){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => setPhotoUrl(fileReader.result);
        } else {
            setPhotoUrl(null);
        }
    };
    
    if (!post) {
        return null;
    }

    let preview = null;
    if(photoUrl) preview = <img src={photoUrl} id='image' />

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
                <br></br>
                <br></br>
                <label id='label-image-preview'>Image preview</label>
                <br></br>
                <label id='image-preview'>{preview}</label>
            </form>
            {formType === 'Update Post' ? <button onClick={goBack} id="go-back-button" >Go back</button> : '' }
        </>
    )
};

export default PostForm;