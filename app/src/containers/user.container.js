import React, { useContext, useEffect } from 'react'

import {Route} from "react-router-dom"
import Loading from '../components/loading';
import User from '../components/user';
import UserDetail from '../components/userDetail';
import usePostsState from '../services/posts.service';

const UserContainer = () => {
    const postsState = usePostsState()

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
                                    <User key={user.id} userId={user.id} />)
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
