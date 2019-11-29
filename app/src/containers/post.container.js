import React, { useContext, useEffect } from 'react'
import Post from '../components/post';

import {Route} from 'react-router-dom'

import Axios from "axios"
import { FETCH_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_ERROR, FETCH_POSTS_USERS_SUCCESS, FETCH_POSTS_USERS_ERROR, PostsContext } from '../contexts/posts';
import Loading from '../components/loading';
import PostDetail from '../components/postDetail';
import { fetchPosts } from '../services/posts.service';

const PostContainer = () => {
    const { postsState, dispatch } = useContext(PostsContext);

    useEffect(() => {
        if (!postsState.posts.length) {
            fetchPosts(dispatch)
        }

        return () => {

        };
    }, [])

    return (
        <div>
            <div className={"row"}>
                <Route path={'/post/:postId'} component={PostDetail} />
            </div>
            {
                postsState.posts.length &&
                    postsState.users.length ?
                    <div className={"row"}>
                        {
                            postsState.posts.map(
                                post =>
                                    <Post postId={post.id} />)
                                
                        }
                    </div>

                    :

                    <Loading />
            }
        </div>
    )
}

export default PostContainer
