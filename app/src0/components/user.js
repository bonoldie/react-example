import React from 'react'
import {Link} from "react-router-dom"
import usePostsState from '../services/posts.service';


const User = ({userId}) => {
    const postsState = usePostsState()

    const user = postsState.users.filter(user => user.id === userId)[0];

    return (
        <div className={"card col-sm-12 col-md-6 col-lg-4 m-2"} >
                
                <div className={"card-body"}>
                <Link to={'/user/'+userId} className={""}><h5 className={"card-title"}>{user.name}</h5></Link>
            <h6 className={"card-subtitle mb-2 text-muted"}>{(user.company) ? user.company.name : ""}</h6>
            </div>
        </div>
    )
}

export default User