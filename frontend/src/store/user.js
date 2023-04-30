import csrfFetch from "./csrf";

const RECEIVE_USERS = 'users/RECEIVE_USERS';

const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
});

export const getUsers = state => {
    return state?.users ? Object.values(state.users) : [];
};

export const fetchUsers = () => async(dispatch) => {
    const res = await csrfFetch(`/api/users`);
    if(res.ok){
        const users = await res.json();
        dispatch(receiveUsers(users));
    }
};

const usersReducer = (state = {}, action) => {
    switch(action.type){
        case RECEIVE_USERS:
            return {...action.users};
        default:
            return state;
    }
};

export default usersReducer;