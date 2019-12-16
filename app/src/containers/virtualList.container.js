import React, { useContext, useEffect } from 'react'
import VTable from '../components/vTable/vTable.component'
import { usePostsState } from '../services/posts.service'
import { PostsContext, FETCH_POSTS_SUCCESS,INIT_TABULAR_POSTS,UPDATE_TABULAR_POSTS } from '../contexts/posts'

const MyRow = ({ rowIndex, rowIndexes, rowSize, style }) => {
    const { postsState:{tabularPosts} } = usePostsState()

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
      ()=>{
        dispatch({type:INIT_TABULAR_POSTS});
        return()=>{
        }
      }
    ,[postsState.posts])

    var tableStructure=[
        { columnName: 'ID', dataIndex: 'id',orderable:true,ord:"up"},
        { columnName: 'TITLE', dataIndex: 'title',orderable:true,ord:"down" },
        { columnName: 'USER ID', dataIndex: 'userId' }
    ]

    const tableSeachCallback = (e) => {
        var _posts = postsState.posts
        dispatch({type:UPDATE_TABULAR_POSTS,payload: _posts.filter((obj) => obj.title.includes(e.target.value))});
    }



    const tableOrderCallback = (e) => {
      var _posts = postsState.tabularPosts
      //_posts = _posts.sort((first,second) => first[e.target.getAttribute('tableIndex')] - second[e.target.getAttribute('tableIndex')] )

      if(tableStructure.find((col) => col.dataIndex == e.target.getAttribute('tableIndex')).orderable)
      {
        //switch (tableStructure.find((col) => col.dataIndex == e.target.getAttribute('tableIndex')).ord){
        //  case "up":
        //      tableStructure[tableStructure.findIndex((col) => col.dataIndex == e.target.getAttribute('tableIndex'))].ord = "down"
        //      break;
        //  case "down":
        //      tableStructure[tableStructure.findIndex((col) => col.dataIndex == e.target.getAttribute('tableIndex'))].ord = "none"
        //      break;
        //  case "none":
        //      tableStructure[tableStructure.findIndex((col) => col.dataIndex == e.target.getAttribute('tableIndex'))].ord = "up"
        //      break;
        //}

        if(tableStructure.find((col) => col.dataIndex == e.target.getAttribute('tableIndex')).ord == "up"){
           tableStructure = [...tableStructure,tableStructure[tableStructure.findIndex((col) => col.dataIndex == e.target.getAttribute('tableIndex'))].ord = "down"]
        }

        if(tableStructure.find((col) => col.dataIndex == e.target.getAttribute('tableIndex')).ord == "down"){
           tableStructure = [...tableStructure,tableStructure[tableStructure.findIndex((col) => col.dataIndex == e.target.getAttribute('tableIndex'))].ord = "none"]
        }

        if(tableStructure.find((col) => col.dataIndex == e.target.getAttribute('tableIndex')).ord == "none"){
           tableStructure = [...tableStructure,tableStructure[tableStructure.findIndex((col) => col.dataIndex == e.target.getAttribute('tableIndex'))].ord = "up"]
        }
      }


      console.log(  tableStructure[tableStructure.findIndex((col) => col.dataIndex == e.target.getAttribute('tableIndex'))])


      dispatch({type:UPDATE_TABULAR_POSTS,payload: _posts});

    }

    return (
        <div className={"row"}>
            <div className={'offset-1 col-10'}>
                {
                    <VTable
                        tableSeachCallback={tableSeachCallback}
                        tableOrderCallback={tableOrderCallback}
                        tableStructure={tableStructure}

                        bodyHeight={'30vh'}
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
