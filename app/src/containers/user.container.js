import React, { useContext, useEffect } from 'react'
import Post from '../components/post';

import Axios from "axios"
import { FETCH_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR, FETCH_POSTS_USERS_SUCCESS, FETCH_POSTS_USERS_ERROR, PostsContext } from '../contexts/posts';
import Loading from '../components/loading';
import User from '../components/user';

const UserContainer = () => {
    const { postsState, dispatch } = useContext(PostsContext);

    useEffect(() => {
        if (postsState.users.length == 0 || postsState.posts.length == 0) {
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

        return () => {

        };
    }, [])

    return (
        <div>
            {
                    postsState.users.length ?
                    <div className={"row"}>
                        {
                            postsState.users.map(
                                user =>
                                    <User userId={user.id} />)
                        }
                    </div>
                    //<Loading />
                    :

                    <Loading />
            }
        </div>
    )
}

export default UserContainer
