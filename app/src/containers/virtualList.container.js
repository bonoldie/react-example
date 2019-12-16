import React, { useContext, useEffect } from 'react'
import VTable, { SORT_ASC, SORT_DESC, SORT_NONE, sortTableData } from '../components/vTable/vTable.component'
import { usePostsState } from '../services/posts.service'
import { PostsContext, FETCH_POSTS_SUCCESS, INIT_TABULAR_POSTS, UPDATE_TABULAR_POSTS } from '../contexts/posts'

const MyRow = ({ rowIndex, rowIndexes, rowSize, style }) => {
    const { postsState: { tabularPosts } } = usePostsState()

    return (
        <tr key={rowIndex} style={style}>
            {
                (tabularPosts[rowIndex] != null) ?
                    rowIndexes.map((tabIndex) => {
                        return <td style={{ height: rowSize }}><div> {tabularPosts[rowIndex][tabIndex]}</div></td>
                    })
                    :
                    <div></div>
            }
        </tr>
    )
}

const VirtualList = () => {
    const { postsState, dispatch } = useContext(PostsContext);

    useEffect(
        () => {
            dispatch({ type: INIT_TABULAR_POSTS });
            return () => {
            }
        }
        , [postsState.posts])

    var tableStructure = [
        { columnName: 'ID', dataIndex: 'id', sortable: true, dataType: Number()},
        { columnName: 'TITLE', dataIndex: 'title', sortable: true, dataType: String()},
        { columnName: 'USER ID', dataIndex: 'userId'}//, sortable: true, dataType: Number() }
    ]

    const tableSeachCallback = (e) => {
        var _posts = postsState.posts
        dispatch({ type: UPDATE_TABULAR_POSTS, payload: _posts.filter((obj) => obj.title.includes(e.target.value)) });
    }

    const tableSortCallback = (column) => {
        var _posts = postsState.tabularPosts
        _posts = sortTableData(_posts,column) 

        dispatch({ type: UPDATE_TABULAR_POSTS, payload: _posts });
    }

    return (
        <div className={"row"}>
            <div className={'offset-1 col-10'}>
                {
                    <VTable
                        tableSeachCallback={tableSeachCallback}
                        tableSortCallback={tableSortCallback}
                        tableStructure={tableStructure}

                        bodyHeight={'50vh'}
                        rowComponent={MyRow}
                        rowsSize={50}
                        rowsCount={postsState.tabularPosts.length}

                    ></VTable>

                }
            </div>

        </div >
    )
}

export default VirtualList
