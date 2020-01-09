import React from 'react';
import {
  observer
} from "mobx-react";
import {
  AutoSizer,
  MultiGrid
} from 'react-virtualized';
import {
  UIComponent
} from 'saas-plat-metaui';
import './style';

@observer
export default class Table extends UIComponent {

  cellRenderer = ({
    columnIndex,
    key,
    rowIndex,
    style
  }) => {

    let content  = `r:${rowIndex}, c:${columnIndex}`;


    return (
      <div className='cell' key={key} style={style}>
          {content}
        </div>
    );
  }

  render() {
    // https://github.com/bvaughn/react-virtualized/blob/master/docs/MultiGrid.md
    return (<div className='datatable'>
      <AutoSizer >
        {({width,height}) => (
          <MultiGrid
            cellRenderer={this.cellRenderer}
            columnWidth={75}
            columnCount={50}
            fixedColumnCount={2}
            fixedRowCount={1}
            height={height}
            rowHeight={40}
            rowCount={100}
            width={width}
          />
        )}
      </AutoSizer>
    </div>);
  }
}
