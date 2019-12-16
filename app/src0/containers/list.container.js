import React, { useState, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server'

import usePostsState from '../services/posts.service'
import TableRow from '../components/table/tableRow.component'
import Table from '../components/table/table.component'

const ListContainer = () => {
    const postsState = usePostsState()

    const generateRow = (post, key) => {

        return (<tr className={'table-scrollable-content'} key={key}>
            <td><div>{post.id}</div></td>
            <td><div>{post.title}</div></td>
            <td><div>{post.userId}</div></td>
        </tr>)
    }


    const bottomBound = (container, lastElement) => {
        var size = container.getBoundingClientRect().top + container.getBoundingClientRect().height - lastElement.getBoundingClientRect().top + lastElement.getBoundingClientRect().height + 100
        return (
            <tr id={"bottom-bound-table-content"} height={size}></tr>
        )
    }

    
    const generateRows = (index, count = 10) => {
        var rows = []

        for (let i = index; i < index + count; i++) {
            rows.push(postsState.posts[i])
        }

        return (
            rows.map((post, key) => {
                return TableRow(post,key)//generateRow(post, key)
            })
        )
    }

    var postsIndex = 80;
    var scrollCounter = 0;

    var displayedPosts = [];


    const scrollTable = (e) => {
        var scrollableContainer = document.getElementById('table-scrollable-body')
        var scrollableElements = document.getElementsByClassName('table-scrollable-content')

        var isScrolled = false

        /**
         * SCROLL CHECKING
         */
        if (scrollableContainer.scrollTop < 1) {
            if (scrollCounter > 0)
                scrollCounter = 0
            scrollCounter--
        } else if (scrollableContainer.scrollTop > 1) {
            if (scrollCounter < 0)
                scrollCounter = 0
            scrollCounter++
        }

        // Scroll every 2 units
        if (scrollCounter > 1) {
            console.log("DOWN")

            if (postsIndex < postsState.posts.length - 1) {
                document.getElementById('table-body').removeChild(scrollableElements[0])
                postsIndex++

                isScrolled = true
            }
        } else if (scrollCounter < -1) {
            console.log("UP")

            if (postsIndex > 0) {
                postsIndex--
                var nodeString = ReactDOMServer.renderToString(generateRow(postsState.posts[postsIndex]))
                document.getElementById('table-body').insertAdjacentHTML('afterbegin', nodeString)

                isScrolled = true
            }
        }

        if (isScrolled) {
            scrollCounter = 0
            

            var firstElement = document.getElementsByClassName('table-scrollable-content')[0]

            // Remove all children and append the new first one
            var scrollableTableBody = document.getElementById('table-body')
            while (scrollableTableBody.firstChild) {
                scrollableTableBody.removeChild(scrollableTableBody.firstChild)
            }
            scrollableTableBody.appendChild(firstElement)
            
            displayedPosts = []
            
            // Then populate the table
            var postsContentIndex = postsIndex + 1;
            scrollableElements = document.getElementsByClassName('table-scrollable-content')

            do {
                var newPostNode = ReactDOMServer.renderToString(generateRow(postsState.posts[postsContentIndex++]))
                document.getElementById('table-body').insertAdjacentHTML('beforeend', newPostNode)
                displayedPosts.push(postsContentIndex)

                scrollableElements = document.getElementsByClassName('table-scrollable-content')

                if (postsContentIndex == postsState.posts.length)
                    break
            }
            while (scrollableElements[scrollableElements.length - 1].getBoundingClientRect().top + scrollableElements[scrollableElements.length - 1].getBoundingClientRect().height < scrollableContainer.getBoundingClientRect().top + scrollableContainer.getBoundingClientRect().height)

            document.getElementById('table-body').insertAdjacentHTML('beforeend',ReactDOMServer.renderToString(bottomBound(scrollableContainer, scrollableElements[scrollableElements.length - 1])));
            
            if(displayedPosts.includes(postsState.posts.length)){

            }
        }

        scrollableContainer.scrollTo(0, 1)
    }//

    return (
        <div className={"row"}>
            <div className={'offset-1 col-10'}>
                {/*<table className={"table table-hover table-fixed table-fixed-header"}>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>TITLE</td>
                            <td>USERID</td>
                        </tr>
                    </thead>
                </table>
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
                </div>*/}
                        
                        {
                            (postsState.posts.length > 0) ? 
                            <Table tableKeys={['ID','TITLE','BODY','USERID']} tableContent={postsState.posts} />
                            :
                            <div></div>
                        }
                
            </div>

        </div >
    )
}

export default ListContainer
