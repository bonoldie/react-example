import React, { useState } from "react"
import { Link } from 'react-router-dom'
import { Map, TileLayer } from 'react-leaflet';

import usePostsState from "../services/posts.service";

const userMapURL = "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"

const UserDetail = ({ match: { params: { userId } } }) => {
    const [showMap, setShowMap] = useState(false);

    const postsState = usePostsState()

    const user = postsState.users.filter(user => user.id == userId)[0];

    const posts = postsState.posts.filter(post => post.userId == userId);
    console.log(user);
    return (

        <div className={"card col-12 mt-1"}>


            <div className={"card-body"}>
                {
                    user && posts ?
                        <div>
                            <div>
                                <h5 className={"card-title"}>{user.name}</h5>
                                <i className={"fas fa-map-marker-alt fa-2x m-4"} style={{ position: "absolute", top: 0, right: 0,opacity: (showMap) ? 1 : 0.5 }} onClick={()=>{setShowMap(!showMap)}}></i>
                                <h6 className={"card-subtitle mb-2 text-muted"}>{(user.company) ? user.company.name : ""}</h6>

                            </div>

                            {
                                showMap ?
                                    <Map center={/*[user.address.geo.lat,user.address.geo.lng]*/[40.6971494, -74.2598655]} zoom={11}>
                                        <TileLayer
                                            attribution={"asd"}
                                            url={userMapURL}
                                        />
                                    </Map>
                                    : <div></div>
                            }





                            <div>
                                <h5>Posts</h5>
                                <ul className={"list-group list-group-flush"}>
                                    {posts.map(post => <Link to={'/post/' + post.id} ><li key={post.id} className={"list-group-item"}>{post.title}</li></Link>)}
                                </ul>
                            </div>
                        </div>


                        :
                        <div></div>
                }
            </div>
        </div>

    )
}

export default UserDetail