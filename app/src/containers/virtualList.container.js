import React, { useContext, useEffect } from 'react'
import VTable from '../components/vTable/vTable.component'
import { usePostsState } from '../services/posts.service'
import { PostsContext, FETCH_POSTS_SUCCESS } from '../contexts/posts'

const MyRow = ({ rowIndex, rowIndexes, rowSize, style }) => {
    const { postsState } = usePostsState()

    return (
        <tr key={rowIndex} style={style}>
            {
                (postsState.posts[rowIndex] != null) ?
                    rowIndexes.map((tabIndex) => {
                        return <td style={{ height: rowSize }}><div> {postsState.posts[rowIndex][tabIndex]}</div></td>
                    })
                    :
                    <div></div>
            }
        </tr>
    )
}

const VirtualList = () => {
    const { postsState, dispatch } = useContext(PostsContext);

    const tableSeachCallback = (e) => {
        //dispatch({ type: FETCH_POSTS_SUCCESS, payload: postsState.posts.filter((obj) => obj.title.includes(e.target.value)) })
    }

    const onClickHadler = () => {

    }

    return (
        <div className={"row"}>
            <div className={'offset-1 col-10'}>
                {
                    <VTable
                        tableSeachCallback={tableSeachCallback}
                        tableStructure={[
                            { columnName: 'ID', dataIndex: 'id', onClick: onClickHadler },
                            { columnName: 'TITLE', dataIndex: 'title', onClick: onClickHadler },
                            { columnName: 'USER ID', dataIndex: 'userId', onClick: onClickHadler }
                        ]}

                        bodyHeight={'30vh'}
                        rowComponent={MyRow}
                        rowsSize={50}
                        rowsCount={postsState.posts.length}

                    ></VTable>

                }
            </div>

        </div >
    )
}

export default VirtualList
