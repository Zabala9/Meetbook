import csrfFetch from "./csrf";

export const RECEIVE_COMMENTS = 'comments/RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'comments/RECEIVE_COMMENT';
export const REMOVE_COMMENT = 'comments/REMOVE_COMMENT';

const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
});

const receiveComments = comments => ({
    type: RECEIVE_COMMENTS,
    comments
});

const removeComment = commentId => ({
    type: REMOVE_COMMENT,
    commentId
});

export const getComment = (commentId) => state => {
    return state?.comments ? state.comments[commentId] : null;
};

export const getComments = state => {
    return state.comments ? Object.values(state.comments) : [];
};

export const fetchComments = () => async(dispatch) => {
    const res = await csrfFetch(`/api/comments`);
    if(res.ok){
        const comments = await res.json();
        dispatch(receiveComments(comments));
    }
};

export const fetchComment = (commentId) => async(dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}`);
    if(res.ok){
        const comment = await res.json();
        dispatch(receiveComment(comment));
    }
};

export const createComment = (comment) => async(dispatch) => {
    const res = await csrfFetch(`/api/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({comment})
    });
    if(res.ok){
        const newComment = await res.json();
        dispatch(receiveComment(newComment));
    }
};

export const updateComment = (comment) => async(dispatch) => {
    const res = await csrfFetch(`/api/comments/${comment.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({comment})
    });
    if(res.ok){
        const newComment = await res.json();
        dispatch(receiveComment(newComment));
    }
};

export const deleteComment = (commentId) => async(dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    });
    if(res.ok){
        dispatch(removeComment(commentId));
    }
};

const commentsReducer = (state = {}, action) => {
    switch(action.type){
        case RECEIVE_COMMENTS:
            return {...action.comments};
        case RECEIVE_COMMENT:
            return {...state, [action.comment.id]: action.comment};
        case REMOVE_COMMENT:
            const newState = {...state};
            delete newState[action.commentId];
            return newState;
        default:
            return state;
    }
};

export default commentsReducer;