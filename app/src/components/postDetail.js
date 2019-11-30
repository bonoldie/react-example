import React,{useContext} from "react"
import { PostsContext } from "../contexts/posts";
import usePostsState from "../services/posts.service";

const PostDetail = ({ match: {params:{postId}} }) => {
    const postsState = usePostsState()

    const post = postsState.posts.filter(post => post.id == postId)[0]
    
    return (
        <div className={"card col-12 mt-1"} >
             <div className={"card-body"}>
            {
                post ? 
                <div>
                    <h5 className={"card-title"}>{post.title}</h5>
                    <p className={"card-text"}>{post.body}</p>
                </div>
                :
                <div></div>
            }
            </div>
        </div>
    
    )
}

export default PostDetail