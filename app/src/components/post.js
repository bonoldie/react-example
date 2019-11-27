import React,{useContext} from 'react'

import {PostsContext } from '../contexts/posts';


const Post = ({ postId }) => {
    const { postsState } = useContext(PostsContext);

    const post = postsState.posts.find(post => post.id === postId);

    const postUser = postsState.users.find(user => user.id === post.userId);

    return (
        <div className={" mt-5 col-sm-12 col-md-6 col-lg-4"}>
            <div className={"card"}>
                <div className={"card-body"}>
                    <h5 className={"card-title"}>{post.title}</h5>
                    <h6 className={"card-subtitle mb-2 text-muted"}>{postUser.name}</h6>
                    <p className={"card-text"}>{post.body}</p>
                </div>
            </div>
        </div>
    )
}

export default Post;
