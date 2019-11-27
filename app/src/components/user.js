import React,{useContext} from 'react'


import { PostsContext } from '../contexts/posts';


const User = ({userId}) => {
    const { postsState, dispatch } = useContext(PostsContext);

    const user = postsState.users.filter(user => user.id == userId)[0];
    return (
        <div>
            {user.name}
        </div>
    )
}

export default User