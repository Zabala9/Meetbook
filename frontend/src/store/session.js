import csrfFetch from "./csrf.js";

const CURRENT_USER = 'session/currentUser';
const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

const currentUser = (user) => ({
    type: CURRENT_USER,
    user
});

const removeCurrentUser = (user) => ({
    type: REMOVE_CURRENT_USER,
    user
});

const storeCSRFToken = (response) => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
}

const storeCurrentUser = (user) => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser");
}

export const login = ({email, password}) => async(dispatch) => {
    const res = await csrfFetch(`/api/session`, {
        method: 'POST',
        body: JSON.stringify({email, password})
    });
    const data = await res.json();
    storeCurrentUser(data.user);
    dispatch(currentUser(data.user));
    return res;
};

export const restoreSession = () => async(dispatch) => {
    const res = await csrfFetch(`/api/session`);
    storeCSRFToken(res);
    const data = await res.json();
    storeCurrentUser(data.user);
    dispatch(currentUser(data.user));
    return res;
};

const initialState = {user: JSON.parse(sessionStorage.getItem("currentUser"))};

const sessionReducer = (state = initialState, action) => {
    switch(action.type){
        case CURRENT_USER:
            return {...state, user: action.user};
        case REMOVE_CURRENT_USER:
            return {...state, user: null}
        default:
            return state;
    }
};

export default sessionReducer;