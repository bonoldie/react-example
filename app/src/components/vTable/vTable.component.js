import React from 'react';
import VTableBody from './vTableBody.component';
import VRow from './vRow.component';

/**
 * vTable scrollable and high performance table  
 *  
 * To each row  of the table is passed an index of the element to represent,
 * a style object for the visualization and the data indexes to display
 *  
 * @param  header      an array of head indexes
 * @param  bodyHeight  the height of the scrollable table body
 * @param  rowsSize    the row size in pixels
 * @param  rowsCount   the number of rows
 * @param  rowComponent the raw component
 * @param  indexes     the indexes of data to display
 * 
 * @returns the vTable react Component 
 */

const VTable = ({ header, bodyHeight, rowsSize, rowsCount, rowComponent, rowIndexes }) => {
    return (
        <table className={"table table-hover scroll-table"}>
            <thead>
                <tr>
                    {
                        header.map((head) => {
                            return <td>{head}</td>
                        })
                    }
                </tr>
            </thead>
            <VTableBody
                style={{ height: bodyHeight }}

                rowsCount={rowsCount}
                rowsSize={rowsSize}

                rowComponent={(rowComponent) ? rowComponent : VRow}
                rowIndexes={rowIndexes}
            />
        </table>
    )
}

export default VTable