import csrfFetch from "./csrf";

export const RECEIVE_LIKES = 'likes/RECEIVE_LIKES';
export const RECEIVE_LIKE = 'likes/RECEIVE_LIKE';
export const REMOVE_LIKE = 'likes/REMOVE_LIKE';

const receiveLike = like => ({
    type: RECEIVE_LIKE,
    like
});

const receiveLikes = likes => ({
    type: RECEIVE_LIKES,
    likes
});

const removeLike = likeId => ({
    type: REMOVE_LIKE,
    likeId
});

export const getLike = (likeId) => state => {
    return state?.likes ? state.likes[likeId]: null;
};

export const getLikes = state => {
    return state?.likes ? Object.values(state.likes) : [];
};

export const fetchLikes = () => async(dispatch) => {
    const res = await csrfFetch(`/api/likes`);
    if(res.ok){
        const likes = await res.json();
        dispatch(receiveLikes(likes));
    }
};

export const fetchLike = (likeId) => async(dispatch) => {
    const res = await csrfFetch(`/api/likes/${likeId}`);
    if(res.ok){
        const like = await res.json();
        dispatch(receiveLike(like));
    }
};

export const createLike = (like) => async(dispatch) => {
    const res = await csrfFetch(`/api/likes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({like})
    });
    if(res.ok){
        const newLike = await res.json();
        dispatch(receiveLike(newLike));
    }
};

export const deleteLike = (likeId) => async(dispatch) => {
    const res = await csrfFetch(`/api/likes/${likeId}`, {
        method: 'DELETE'
    });
    if(res.ok){
        dispatch(removeLike(likeId));
    }
};

const likesReducer = (state ={}, action) => {
    switch(action.type){
        case RECEIVE_LIKES:
            return {...action.likes};
        case RECEIVE_LIKE:
            return {...state, [action.like.id]: action.like};
        case REMOVE_LIKE:
            const newState = {...state};
            delete newState[action.likeId];
            return newState;
        default:
            return state;
    }
};

export default likesReducer;