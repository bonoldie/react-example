import React from 'react';
import {Switch,Route} from 'react-router-dom';

import './styles/index.scss';

import PostContainer from './containers/post.container';
import { PostsProvider } from './contexts/posts';
import Navbar from './components/navbar';
import UserContainer from './containers/user.container';
import ListContainer from './containers/list.container';
import VirtualList from './containers/virtualList.container'
import VTable from './components/vTable/vTable.component';
import usePostsState from './services/posts.service';

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

						<Route path="/list">
							<ListContainer />
						</Route>
						<Route path="/vlist">
							<VirtualList />
							
							<VTable 
								header={['ID','TITLE']}
								rowIndexes={['id','title']}

								bodyHeight={'50vh'}
								rowsSize={65}
								rowsCount={100}
								>
							</VTable>
						</Route>
					</Switch>
				</div>
			</PostsProvider>

		</div>
	);
}

export default App;
