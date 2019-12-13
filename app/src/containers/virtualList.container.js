import React, { useState, useEffect } from 'react'
import usePostsState from '../services/posts.service'
import _ from 'lodash'

const Row = ({ index, style, indexes }) => {
    const postsState = usePostsState()

    var rowContent = postsState.posts[index]

    return (
        <tr key={index} style={{ position: style.position, top: style.top }}>
            {
                indexes.map((tabIndex) => {
                    return <td><div style={{ height: 30 }}> {rowContent[tabIndex]}</div></td>

                })
            }
        </tr>
    )
}

const TabularBodyList = ({ height, itemsCount, itemSize, row, indexes }) => {
    var rows = []

    _.times(itemsCount, (itemIndex) => { rows.push(<Row index={itemIndex} indexes={indexes} style={{ height: itemSize, position: "absolute", top: itemIndex * itemSize }} />) })

    const [displayedRows, setDisplayedRows] = useState(rows)

    const handleScroll = (e) => {
        var boxHeight = e.target.getBoundingClientRect().height

        var displayableElements = Math.round(boxHeight / itemSize + 1);

        var currentElementIndex = Math.round(e.target.scrollTop / itemSize);

        if(currentElementIndex > 0)
            currentElementIndex--
        
        var _displayedElements = []

        _.times(displayableElements, (itemIndex) => { _displayedElements.push(rows[currentElementIndex + itemIndex]) })

        setDisplayedRows(_displayedElements);
    }

    if(rows.length != 0 && displayedRows.length == 0){
        setDisplayedRows(rows)
    }

    return (
        <tbody onScroll={handleScroll} id={'scroll-body'}>
            <div style={{height:itemsCount*itemSize}}/>
            {
                [displayedRows]
            }
        </tbody>


    )
}

const VirtualList = () => {
    const postsState = usePostsState()

    return (
        <div className={"row"}>
            <div className={'offset-1 col-10'}>
                <table className={"table table-hover scroll-table"}>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>TITLE</td>
                            <td>USERID</td>
                        </tr>
                    </thead>

                    <TabularBodyList
                        height={400}
                        itemsCount={postsState.posts.length}
                        itemSize={64}
                        row={Row}
                        indexes={['id', 'title', 'userId']}
                    >
                    </TabularBodyList>
                    {/*<List height={400}
                            itemCount={postsState.posts.length}
                            itemSize={60}
                        >{Row}</List> */}
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
