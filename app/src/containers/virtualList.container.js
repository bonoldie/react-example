
import React, { useState, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server'
import usePostsState from '../services/posts.service'

import { FixedSizeList as List } from "react-window"

const Row = ({ index, style }) => {
    const postsState = usePostsState()

    var rowContent = postsState.posts[index]

    return (
        <tr key={index} style={style}>
            <td>{rowContent.id}</td>
            <td>{rowContent.title}</td>
            <td>{rowContent.userId}</td>
            {
        //    {
        //        Object.keys(rowContent).forEach((key)=>{
        //            return(<td>
        //                {rowContent[key]}
        //            </td>)
            //    })
            //}
            }
        </tr>

    )

}

const VirtualList = () => {
    const postsState = usePostsState()

    return (
        <div className={"row"}>
            <div className={'offset-1 col-10'}>
                <table className={"table table-hover table-fixed"}>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>TITLE</td>
                            <td>USERID</td>
                        </tr>
                    </thead>
                    <tbody>
                    <List     height={400}
        itemCount={postsState.posts.length}
        itemSize={60}
        >{Row}</List>
                    </tbody>
                </table>


                {/*
                <div className={'table-scrollable-body table-fixed '} onScroll={scrollTable} id={'table-scrollable-body'}>
                    <table className={"table table-hover table-fixed"} >
                        <tbody id={'table-body'}>

                            {
                                (postsState.posts.length > 0) ?
                                    generateRows(0, 20) :
                                    <tr></tr>
                            }
                        </tbody>
                    </table>
                </div>
                    */}
                        { /*
                            (postsState.posts.length > 0) ?
                            <Table tableKeys={['ID','TITLE','BODY','USERID']} tableContent={postsState.posts} />
                            :
                            <div></div>
                        */}

            </div>

        </div >
    )
}

export default VirtualList
