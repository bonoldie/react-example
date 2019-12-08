import React, { Suspense } from 'react'

import { Route } from "react-router-dom"
import Loading from '../components/loading';
import User from '../components/user';
import usePostsState from '../services/posts.service';

// import UserDetail from '../components/userDetail';
const UserDetail = React.lazy(() => import('../components/userDetail'))

const UserContainer = () => {
    window.scrollTo(0, 0)

    const postsState = usePostsState()

    return (
        <div>
            {

                <Suspense fallback={<Loading />}>
                    <Route path={'/user/:userId'} component={UserDetail} />
                </Suspense>

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
                    :

                    <Loading />
            }
        </div >
    )
}

export default UserContainer
