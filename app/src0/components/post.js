import React from 'react'
import {Link} from 'react-router-dom'
import usePostsState from '../services/posts.service';


const Post = ({ postId }) => {
    const postsState = usePostsState()

    const post = postsState.posts.find(post => post.id === postId);

    const postUser = postsState.users.find(user => user.id === post.userId);

    return (
        <div className={" mt-5 col-sm-12 col-md-6 col-lg-4"}>
            <div className={"card"}>
                <div className={"card-body"}>
                <Link to={"/post/"+post.id}><h5 className={"card-title"}>{post.title}</h5></Link>
                    <Link to={"/user/"+post.userId}><h6 className={"card-subtitle mb-2 text-muted"}>{postUser.name}</h6></Link>
                </div>
            </div>
        </div>
    )
}

export default Post;
