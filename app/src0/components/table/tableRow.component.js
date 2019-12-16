import React from 'react'

const TableRow = ({rawRowContent,rowKey}) => {
    var rowContent = []

    for (const objKey in rawRowContent) {
        rowContent.push(rawRowContent[objKey])
    }

    return (
        <tr key={rowKey} className={'table-scrollable-row'}>
            {
                rowContent.map(
                    (row) => {
                        return (
                            <td>
                                <div>{row}</div>
                            </td>
                        )
                    }
                )
            }
        </tr>
    )
}

export default TableRow
