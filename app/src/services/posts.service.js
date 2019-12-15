import { useContext } from 'react'

import Axios from "axios";
import { FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR, FETCH_POSTS_USERS_SUCCESS, FETCH_POSTS_USERS_ERROR, FETCH_POSTS, PostsContext } from "../contexts/posts";

export const usePosts = ({ postsState, dispatch }) => {
    
    if ((postsState.posts.length == 0) && !postsState.loading) {
        dispatch({ type: FETCH_POSTS })

        Axios.get("https://jsonplaceholder.typicode.com/posts")
            .then(
                (res) => {
                    dispatch({ type: FETCH_POSTS_SUCCESS, payload: res.data });
                }
            )
            .catch(
                (err) => {
                    dispatch({ type: FETCH_POSTS_ERROR, payload: err.data });
                }
            )
    }
    if ((postsState.users.length == 0) && !postsState.loading) {
        Axios.get("https://jsonplaceholder.typicode.com/users")
            .then(
                (res) => {
                    dispatch({ type: FETCH_POSTS_USERS_SUCCESS, payload: res.data });
                }
            )
            .catch(
                (err) => {
                    dispatch({ type: FETCH_POSTS_USERS_ERROR, payload: err.data });
                }
            )
    }
}

export const usePostsState = () => {
    const { postsState } = useContext(PostsContext);

    return { postsState };
}

export default { usePosts, usePostsState }