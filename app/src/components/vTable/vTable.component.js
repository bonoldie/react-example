import React, { Component, useState, useEffect } from 'react';
import VTableBody from './vTableBody.component';

/**
 * Table data sorting types
 * */
export const SORT_DESC = { name: "SORT_DESC", style: "down" }
export const SORT_ASC = { name: "SORT_ASC", style: "up" }
export const SORT_NONE = { name: "SORT_NONE", style: "" }

/**
 * Useful sort function 
 * @param {object} column  an element of table structure 
 * @param {array}  data    unsorted data array 
 * 
 * @returns the sorted array
 */
export const sortTableData = (data,column) => {
    if (typeof(column.dataType) == typeof(Number())) {
        switch (column.sortType) {
            case SORT_DESC:
                data.sort((first, second) => first[column.dataIndex] - second[column.dataIndex])
                break;
            case SORT_ASC:
                data.sort((first, second) => second[column.dataIndex] - first[column.dataIndex])
                break;
            case SORT_NONE:
                break;
            default:
                break;
        }
    } else if (typeof(column.dataType) == typeof(String())) {
        switch (column.sortType) {
            case SORT_DESC:
                data.sort((first, second) => (first[column.dataIndex][0]  < second[column.dataIndex][0]) ? 1 : -1)
                break;
            case SORT_ASC:
                data.sort((first, second) => (first[column.dataIndex][0]  > second[column.dataIndex][0]) ? 1 : -1)
                break;
            case SORT_NONE:
                break;
            default:
                break;
        }
    }

    return data
}

/**
 * vTable scrollable and high performance table
 *
 * To each row of the table is passed an index of the element to represent,
 * a style object for the visualization and the data indexes to display
 * 
 * @example 
 * 
 * <VTable
 *  tableSeachCallback={yourSearchCallback}
 *  tableSortCallback={yourSortCallback}
 *  tableStructure={tableStructure}
 *  bodyHeight={'50vh'}
 *  rowComponent={yourRowComponent}
 *  rowsSize={50} // in px !
 *  rowsCount={yourDataArray.length} >
 *  </VTable>
 *
 * @param  {string[]}        header        an array of head indexes
 * @param  {number|string} bodyHeight    the height of the scrollable table body
 * @param  {Component}       rowComponent  the row component
 * @param  {number}          rowsSize      the row size in pixels
 * @param  {number}          rowsCount     the number of rows
 * @param  {string[]}        indexes       the indexes of data to display
 *
 * @returns the vTable react Component
 */
const VTable = ({ tableStructure, tableSeachCallback, tableSortCallback, bodyHeight, rowComponent, rowsSize, rowsCount }) => {
    const [_tableStructure, setTableStructure] = useState(tableStructure)

    var rowIndexes = []
    _tableStructure.map(tableEntry => rowIndexes.push(tableEntry.dataIndex))

    useEffect(() => {
        var _tempTableStucture = _tableStructure

        _tempTableStucture.map((tableElement) => tableElement.sortType = SORT_NONE)

        setTableStructure(oldTS => _tempTableStucture)
        console.log(_tempTableStucture)
        return () => {

        };
    }, [])

    /**
     * Internal order callback
     */
    const _tableSortCallback = (e) => {


        if (_tableStructure.findIndex(element => element.dataIndex == e.target.getAttribute('tableindex')) < 0) {
            return
        }

        if (!_tableStructure.find(element => element.dataIndex == e.target.getAttribute('tableindex')).sortable) {
            return
        }

        var tableStructureElementIndex = _tableStructure.findIndex(element => element.dataIndex == e.target.getAttribute('tableindex'));

        var _oldSortType = _tableStructure[tableStructureElementIndex].sortType
        var _newSortType = null

        switch (_oldSortType) {
            case SORT_NONE:
                _newSortType = SORT_ASC;
                break;
            case SORT_ASC:
                _newSortType = SORT_DESC;
                break;
            case SORT_DESC:
                _newSortType = SORT_NONE;
                break;
        }

        var _tempTableStucture = _tableStructure

        _tempTableStucture.map((tableElement) => tableElement.sortType = SORT_NONE)

        _tempTableStucture[tableStructureElementIndex].sortType = _newSortType

        console.log("SET SORT OF "+_tempTableStucture[tableStructureElementIndex].columnName+" -> "+_tempTableStucture[tableStructureElementIndex].sortType.name)

        setTableStructure(oldTableStructure => _tempTableStucture)
        /** 
         * call the custom callback
         *  */
        if (tableSortCallback) {
            tableSortCallback(_tempTableStucture[tableStructureElementIndex])
        }
    }

    return (
        <div className={'mt-4'}>

            <div class="active-cyan-4 mb-4">
                <input class="form-control" type="text" placeholder="Search" aria-label="Search" onChange={tableSeachCallback} />
            </div>

            <table className={"table table-hover scroll-table"}>
                <thead>
                    <tr>
                        {
                            _tableStructure.map(tableEntry => {
                                return <td onClick={_tableSortCallback} tableindex={tableEntry.dataIndex} style={{ position: "relative" }}>
                                    {tableEntry.columnName}

                                    {
                                        (tableEntry.sortable && tableEntry.sortType) ?
                                            <i className={"fas fa-lg fa-sort-" + tableEntry.sortType.style} style={{ position: "absolute", top: "40%", right: 5,color:"#0099CC"}}></i>
                                            :
                                            <div></div>
                                    }
                                </td>
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
