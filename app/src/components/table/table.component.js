import React, { useState, useEffect } from 'react'
import ReactDOMServer from 'react-dom/server'
import TableRow from './tableRow.component'

const Table = ({ tableKeys, tableContent = [], _rowFormatter = TableRow }) => {

    // Refs to the DOM
    var scrollableContainer = null
    var scrollableContent = null
    var scrollableElements = []

    var firstElementIndex = 0
    var displayedElementsIndexes = []

    var scrollCounter = 0
    var isScrolled = false

    tableContent = [...tableContent, tableContent[tableContent.length - 1]]

    const bottomBound = (container, lastElement) => {
        var size = container.getBoundingClientRect().top + container.getBoundingClientRect().height - lastElement.getBoundingClientRect().top + lastElement.getBoundingClientRect().height + 100
        return (
            <tr id={"bottom-bound-table-content"} height={size}></tr>
        )
    }

    const refreshRows = () => {
        scrollableContent = document.getElementById('t-table-content')
        scrollableContainer = document.getElementById('t-table-scrollable-body')

        // Remove all the rows
        while (scrollableContent.firstChild) {
            scrollableContent.removeChild(scrollableContent.firstChild)
        }

        // Insert the first row via server side rendering
        var firstRow = ReactDOMServer.renderToString(<_rowFormatter rawRowContent={tableContent[firstElementIndex]} />)

        scrollableContent.insertAdjacentHTML('beforeend', firstRow)

        displayedElementsIndexes = []

        var rowIndex = firstElementIndex + 1

        // Then populate the table
        do {

            let row = ReactDOMServer.renderToString(<_rowFormatter rawRowContent={tableContent[rowIndex++]} />)
            displayedElementsIndexes.push(rowIndex)
            scrollableContent.insertAdjacentHTML('beforeend', row)

            scrollableElements = document.getElementsByClassName('table-scrollable-row')

        } while (
            scrollableContainer.getBoundingClientRect().bottom -
            scrollableElements[scrollableElements.length - 1].getBoundingClientRect().bottom
            >
            scrollableElements[scrollableElements.length - 1].getBoundingClientRect().height
            && rowIndex <= tableContent.length
        )

        // Add the bottom scrollable div
        scrollableContent.insertAdjacentHTML('beforeend', ReactDOMServer.renderToString(bottomBound(scrollableContainer, scrollableElements[scrollableElements.length - 1])))

        if (displayedElementsIndexes.includes(tableContent.length)) {
            firstElementIndex--
            refreshRows()
        }
    }

    var lastY = 0

    useEffect(() => {
        refreshRows()
        scrollableContainer = document.getElementById('t-table-scrollable-body')

        scrollableContainer.addEventListener('scroll',(e) => {

            console.log(scrollableContainer.scrollTop)
        })

        //scrollableContainer.addEventListener('touchmove', function (e) {
        //    e.preventDefault()
        //
        //    var currentY = e.changedTouches[0].pageY;
        //
        //    if (currentY > lastY) {
        //        firstElementIndex--
        //        refreshRows()
        //    } else {
        //        firstElementIndex++
        //        refreshRows()
        //    }
        //    lastY = currentY;
        //})

    return () => {

    };
}, [])

/**
 * handle Scroll event
 */
const handleScrollTable = (e) => {
    scrollableContainer = document.getElementById('t-table-scrollable-body')

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

    isScrolled = false
    // Scroll every 2 units
    if (scrollCounter > 1) {
        console.log("DOWN")

        if (firstElementIndex < tableContent.length - 1) {
            firstElementIndex++
            isScrolled = true
        }
    } else if (scrollCounter < -1) {
        console.log("UP")

        if (firstElementIndex > 0) {
            firstElementIndex--
            isScrolled = true
        }
    }

    if (isScrolled) {
        scrollCounter = 0
        refreshRows()
    }

    scrollableContainer.scrollTo(0, 1)
}


return (
    <div>
        <table className={"table table-hover table-fixed table-fixed-header"}>
            <thead>
                <tr>
                    {
                        tableKeys.map(key => {
                            return (<td>{key}</td>)
                        })
                    }
                </tr>
            </thead>
        </table>
        <div onScroll={handleScrollTable}  id={'t-table-scrollable-body'}>
            <table className={"table table-hover table-fixed"} >
                <tbody id={'t-table-content'}>
                </tbody>
            </table>
        </div>
    </div>
)
}

export default Table
