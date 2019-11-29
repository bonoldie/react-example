import React from 'react'

import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark indigo">

            <Link to="/post" class="navbar-brand text-white">Posts</Link>


            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#hamburgerNav"
                aria-controls="hamburgerNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="hamburgerNav">

                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <Link to="/user" class="nav-link">Users</Link>
                    </li>   
                </ul>

                {/* <form class="form-inline">
                    <div class="md-form my-0">
                        <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                    </div>
                </form>*/}

            </div>


        </nav>
    )
}

export default Navbar
