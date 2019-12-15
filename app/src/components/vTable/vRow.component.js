import React, { useEffect, useState, useContext } from 'react';
import { usePostsState, usePosts } from '../../services/posts.service';
import { PostsContext } from '../../contexts/posts';

/**
 * vRow is use as default row component in a vTableBody 
 * 
 * @param elementIndex the index of the element to refer to
 * @param rowIndexes   the row indexes to show in the row
 * @param style        the style object
 * 
 * @returns The JSX element of the row
 */

const VRow = ({ rowIndex, rowIndexes, rowSize, style }) => {
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

export default VRow;