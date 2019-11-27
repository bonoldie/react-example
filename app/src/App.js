import React from 'react';
import {Switch,Route} from 'react-router-dom';

import './styles/index.scss';

import PostContainer from './containers/post.container';
import { PostsProvider } from './contexts/posts';
import Navbar from './components/navbar';
import UserContainer from './containers/user.container';

const App = () => {

	return (
		<div>
			<Navbar />

			<PostsProvider>
				<div className={"container-fluid"}>
					<Switch>
						{/*	Posts Route */}
						<Route path="/post">
							<PostContainer />
						</Route>	
						
						<Route path="/user">
							<UserContainer />
						</Route>	
						
					</Switch>
				</div>
			</PostsProvider>

		</div>
	);
}

export default App;
