import React, { useState, useEffect, Component } from 'react';
import _ from 'lodash';
import VRow from './vRow.component';

/**
 * The vTableBody is the core part of a vTable.
 * It's a scrollable table body with a lazy rendering of rows based on what is visualized by the client device
 * 
 * @param {number}    rowsCount            the number of rows
 * @param {number}    rowsSize             the row size (in px)
 * @param {Component} [rowComponent=vRow]  the default row component
 * @param {string[]}  rowIndexes           the row indexes to display (passed to the row component)
 * @param {Object}    style                the style object
 */
const VTableBody = ({ rowsCount, rowsSize, rowComponent = VRow, rowIndexes, style }) => {
    var _rows = []
    const [_currentRowIndex, setCurrentRowIndex] = useState(0)
    const [_displayedRows, setDisplayedRows] = useState([])

    // Populate the rows array with the row component
    _.times(rowsCount,
        _rowIndex =>
            _rows.push(
                React.createElement(rowComponent,
                    {
                        rowIndex: _rowIndex,
                        rowIndexes: rowIndexes,
                        style: {
                            position: 'absolute',
                            top: _rowIndex * rowsSize
                        },
                        rowSize: rowsSize
                    })
            )
    )

    const calculateDisplayedRows = (_rowIndex, displayableRows) => {
        var _newDisplayedRows = []

        if (_rowIndex > 0) {
            _newDisplayedRows.push(_rows[_rowIndex - 1])
        }

        _.times(displayableRows + 2, _index => _newDisplayedRows.push(_rows[_rowIndex + _index]))

        setCurrentRowIndex(oldRowIndex => _rowIndex)
        setDisplayedRows(oldDisplayedRows => _newDisplayedRows)
    }

    // Scroll Handler and row index calculator
    const vTableScollHandler = (e) => {
        var scrollableBodyHeight = e.target.getBoundingClientRect().height
        var scrollTop = e.target.scrollTop
        var _newRowIndex = Math.round(scrollTop / rowsSize)

        // Rerender the list only if the new index of the row index is changed
        if (_newRowIndex != _currentRowIndex) {
            calculateDisplayedRows(_newRowIndex, Math.round(scrollableBodyHeight / rowsSize))
        }
    }

    if(_rows.length > 0 && _displayedRows.length == 0){
        calculateDisplayedRows(_currentRowIndex, Math.round(document.getElementById('scrollable-table-body').getBoundingClientRect().height / rowsSize))
    } 

    return (
        <tbody onScroll={vTableScollHandler} style={style} id={'scrollable-table-body'}>
            <div style={{ height: rowsCount * rowsSize }} />
            {
                [_displayedRows]
            }
        </tbody>
    )
}

export default VTableBody;