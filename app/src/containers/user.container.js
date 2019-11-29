import React, { useContext, useEffect } from 'react'

import Axios from "axios"
import {Route} from "react-router-dom"
import { FETCH_POSTS_USERS_SUCCESS, FETCH_POSTS_USERS_ERROR, PostsContext, FETCH_POSTS_USERS, FETCH_POSTS_ERROR, FETCH_POSTS_SUCCESS } from '../contexts/posts';
import Loading from '../components/loading';
import User from '../components/user';
import UserDetail from '../components/userDetail';

const UserContainer = () => {
    const { postsState, dispatch } = useContext(PostsContext);

    useEffect(() => {
        if (! (postsState.users.length || postsState.posts.length)) {
            dispatch({ type: FETCH_POSTS_USERS });

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
                <div className={"row"}>
                    <Route path={'/user/:userId'} component={UserDetail} />
                </div>
            
            }
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
