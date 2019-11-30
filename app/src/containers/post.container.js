import React, { useContext, useEffect } from 'react'
import Post from '../components/post';

import {Route} from 'react-router-dom'

import Loading from '../components/loading';
import PostDetail from '../components/postDetail';
import usePostsState from '../services/posts.service';

const PostContainer = () => {

    const postsState = usePostsState()

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
                                    <Post key={post.id} postId={post.id} />)
                                
                        }
                    </div>

                    :

                    <Loading />
            }
        </div>
    )
}

export default PostContainer
