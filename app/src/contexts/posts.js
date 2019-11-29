import React, { useReducer } from "react"

export const postsInitialState = { loading: false, error: {}, posts: [], users: [] };

// CONTEXT
export const PostsContext = React.createContext(postsInitialState);

// ACTIONS
export const FETCH_POSTS = "FETCH_POSTS"
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS"
export const FETCH_POSTS_ERROR = "FETCH_POSTS_ERROR"

export const FETCH_POSTS_USERS = "FETCH_POSTS_USERS"
export const FETCH_POSTS_USERS_SUCCESS = "FETCH_POSTS_USERS_SUCCESS"
export const FETCH_POSTS_USERS_ERROR = "FETCH_POSTS_USERS_ERROR"

// REDUCER
export const postsReducer = (state, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return { ...state, loading: true };
        case FETCH_POSTS_SUCCESS:
            return { ...state, loading: false, posts: action.payload };
        case FETCH_POSTS_ERROR:
            return { ...state, loading: false, error: action.payload };

        case FETCH_POSTS_USERS:
            return { ...state, loading: true };
        case FETCH_POSTS_USERS_SUCCESS:
            return { ...state, loading: false, users: action.payload };
        case FETCH_POSTS_USERS_ERROR:
            return { ...state, loading: false, error: action.payload };
    }
}

export const PostsProvider = ({ children }) => {
    const [postsState, dispatch] = useReducer(postsReducer, postsInitialState);

    return (
        <PostsContext.Provider value={{ postsState, dispatch }}>
            {children}
        </PostsContext.Provider>
    );
};