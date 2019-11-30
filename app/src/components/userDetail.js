import React,{useContext} from "react"
import {Link} from 'react-router-dom'
import { PostsContext } from "../contexts/posts";

const UserDetail = ({ match: {params:{userId}} }) => {
    const { postsState, dispatch } = useContext(PostsContext);

    const user = postsState.users.filter(user => user.id == userId)[0];
   
    const posts = postsState.posts.filter(post => post.userId == userId);

    return (
        <div className={"card col-12 mt-1"}>
             <div className={"card-body"}>
            {
                user ? 
                <div>
                    <h5 className={"card-title"}>{user.name}</h5>
                    <h6 className={"card-subtitle mb-2 text-muted"}>{(user.company) ? user.company.name : ""}</h6>
                </div>
                :
                <div></div>
            }
            {
                posts.length > 0 ?
                <div>
                    <h5>Posts</h5>
                    <ul className={"list-group list-group-flush"}>
                        {posts.map(post => <Link to={'/post/'+post.id} ><li key={post.id} className={"list-group-item"}>{post.title}</li></Link> )} 
                    </ul>
                </div>
                :
                <div></div>
            }
            </div>
        </div>
    
    )
}

export default UserDetail