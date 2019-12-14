import React,{useState} from 'react';
import _ from 'lodash';

const VTableBody = ({ style, rowsCount, rowsSize, rowComponent, rowIndexes }) => {
    var _rows = []

    const [_displayedRows,setDisplayedRows] = useState(_rows)

    // Populate the rows array with the row component
    _.times(rowsCount,
        _rowIndex =>
            _rows.push(
                React.createElement(rowComponent,
                    {
                        rowIndex: _rowIndex,
                        rowIndexes: rowIndexes,
                        style: { top: _rowIndex * rowsSize }
                    })
                
            )
    )

    // Only if is the first rows loading 
    //if(_rows.length != 0 && _displayedRows.length == 0){
    //    setDisplayedRows(rows)
    //}

    const vTableScollHandler = () => {

    }

    return (
        <tbody onScoll={vTableScollHandler} style={style}>
            {
                [_displayedRows]
            }
        </tbody>
    )
}

export default VTableBody;