import React, { Component } from 'react';
import VTableBody from './vTableBody.component';

/**
 * vTable scrollable and high performance table  
 *  
 * To each row of the table is passed an index of the element to represent,
 * a style object for the visualization and the data indexes to display
 *  
 * @param  {string[]}        header        an array of head indexes
 * @param  {number | string} bodyHeight    the height of the scrollable table body
 * @param  {Component}       rowComponent  the row component
 * @param  {number}          rowsSize      the row size in pixels
 * @param  {number}          rowsCount     the number of rows
 * @param  {string[]}        indexes       the indexes of data to display
 * 
 * @returns the vTable react Component 
 */
const VTable = ({ tableStructure,tableSeachCallback, bodyHeight, rowComponent, rowsSize, rowsCount }) => {
    var rowIndexes = []

    tableStructure.map(tableEntry => rowIndexes.push(tableEntry.dataIndex))

    return (
        <div className={'mt-4'}>
            
            <div class="active-cyan-4 mb-4">
                <input class="form-control" type="text" placeholder="Search" aria-label="Search" onChange={tableSeachCallback}/>
            </div>

            <table className={"table table-hover scroll-table"}>
                <thead>
                    <tr>
                        {
                            tableStructure.map(tableEntry => {
                                return <td onClick={tableEntry.onClick} tableIndex={tableEntry.dataIndex}>{tableEntry.columnName}</td>
                            })
                        }
                    </tr>
                </thead>

                <VTableBody
                    rowsCount={rowsCount}
                    rowsSize={rowsSize}
                    rowComponent={rowComponent}
                    rowIndexes={rowIndexes}

                    style={{ height: bodyHeight }}
                />
            </table>
        </div>
    )
}

export default VTable