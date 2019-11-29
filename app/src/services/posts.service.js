import Axios from "axios";
import { FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR, FETCH_POSTS_USERS_SUCCESS, FETCH_POSTS_USERS_ERROR, FETCH_POSTS } from "../contexts/posts";


export const fetchPosts = (dispatch) => {
    dispatch({ type: FETCH_POSTS });

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
