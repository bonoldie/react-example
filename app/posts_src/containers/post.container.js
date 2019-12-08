import React, { Suspense } from 'react'
import Post from '../components/post';
import { Route } from 'react-router-dom'
import Loading from '../components/loading';
import usePostsState from '../services/posts.service';

//import PostDetail from '../components/postDetail';
const PostDetail = React.lazy(() => import('../components/postDetail'))


const PostContainer = () => {
    window.scrollTo(0, 0)
    const postsState = usePostsState()

    return (
        <div>

            <Suspense fallback={<Loading />}>
                <Route path={'/post/:postId'} component={PostDetail} />
            </Suspense>
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
