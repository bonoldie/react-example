import React from 'react'

import { Link } from 'react-router-dom'
import { PostsReducer } from '../contexts/posts'

const Navbar = () => {
    return (
        <nav className={"navbar navbar-expand-lg navbar-dark indigo"}>

            <Link to="/post" className={"navbar-brand text-white"}>Posts</Link>


            <button className={"navbar-toggler"} type="button" data-toggle="collapse" data-target="#hamburgerNav"
                aria-controls="hamburgerNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className={"navbar-toggler-icon"}></span>
            </button>

            <div className={"collapse navbar-collapse"} id="hamburgerNav">

                <ul className={"navbar-nav mr-auto"}>
                    <li className={"nav-item"}>
                        <Link to="/user" className={"nav-link"}>Users</Link>
                    </li>

                    <li className={"nav-item"}>
                        <Link to="/list" className={"nav-link"}>List</Link>
                    </li>      
                </ul>

                {/* <form className={"form-inline"}>
                    <div className={"md-form my-0"}>
                        <input className={"form-control mr-sm-2"} type="text" placeholder="Search" aria-label="Search" />
                    </div>
                </form>*/}

            </div>


        </nav>
    )
}

export default Navbar
