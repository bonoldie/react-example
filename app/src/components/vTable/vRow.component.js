import React from 'react';
import usePostsState from "../../services/posts.service"

/**
 * vRow is use as default row component in a vTableBody 
 * 
 * @param {int} elementIndex the index of the element to refer to
 * @param {Array} rowIndexes the row indexes to show in the row
 * @param {Object} style
 */

const VRow = ({ rowIndex, style, rowIndexes }) => {
    const postsState = usePostsState()

    var rowContent = postsState.posts[rowIndex]

    return (
        <tr key={rowIndex} style={{ position: 'absolute', top: style.top }}>
            {
                rowIndexes.map((tabIndex) => {
                    return <td><div style={{ height: 30 }}> {rowContent[tabIndex]}</div></td>
                })
            }
        </tr>
    )
}

export default VRow;