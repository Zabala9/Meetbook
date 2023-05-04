import csrfFetch from "./csrf";

export const RECEIVE_POSTS = 'posts/RECEIVE_POSTS';
export const RECEIVE_POST = 'posts/RECEIVE_POST';
export const REMOVE_POST = 'posts/REMOVE_POST';

const receivePost = post => ({
    type: RECEIVE_POST,
    post
});

const receivePosts = posts => ({
    type: RECEIVE_POSTS,
    posts
});

const removePost = postId => ({
    type: REMOVE_POST,
    postId
});

export const getPost = (postId) => state => {
    return state?.posts ? state.posts[postId] : null;
};

export const getPosts = state => {
    return state?.posts ? Object.values(state.posts) : [];
};

export const fetchPosts = () => async(dispatch) => {
    const res = await csrfFetch(`/api/posts`);
    if(res.ok){
        const posts = await res.json();
        dispatch(receivePosts(posts));
    }
};

export const fetchPost = (postId) => async(dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}`);
    if(res.ok){
        const post = await res.json();
        dispatch(receivePost(post));
    }
};

export const createPost = (post) => async(dispatch) => {
    const res = await csrfFetch(`/api/posts`, {
        method: 'POST',
        body: post
    });
    if(res.ok){
        const newPost = await res.json();
        dispatch(receivePost(newPost));
    }
};

export const updatePost = (id, post) => async(dispatch) => {
    const res = await csrfFetch(`/api/posts/${id}`, {
        method: 'PATCH',
        body: post
    });
    if(res.ok){
        const newPost = await res.json();
        dispatch(receivePost(newPost));
    }
};

export const deletePost = (postId) => async(dispatch) => {
    const res = await csrfFetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    });
    if(res.ok){
        dispatch(removePost(postId));
    }
};

const postsReducer = (state = {}, action) => {
    switch(action.type){
        case RECEIVE_POSTS:
            return {...action.posts};
        case RECEIVE_POST:
            return {...state, [action.post.id]: action.post };
        case REMOVE_POST:
            const newState = {...state};
            delete newState[action.postId];
            return newState;
        default:
            return state;
    }
};

export default postsReducer;
