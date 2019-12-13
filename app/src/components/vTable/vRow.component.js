import usePostsState from "../../services/posts.service"

/**
 * vRow is use as default row component in a vTableBody 
 * 
 * @param {int} elementIndex the index of the element to refer to
 * @param {Array} indexes the indexes to show in the row
 * @param {Object} style
 */
const vRow = ({ elementIndex, style, indexes }) => {
    const postsState = usePostsState()

    var rowContent = postsState.posts[elementIndex]

    return (
        <tr key={elementIndex} style={{ position: style.position, top: style.top }}>
            {
                indexes.map((tabIndex) => {
                    return <td><div style={{ height: 30 }}> {rowContent[tabIndex]}</div></td>

                })

            }
        </tr>
    )
}

export default vRow;