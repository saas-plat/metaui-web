import React from 'react';
import {
  observer
} from "mobx-react";
import {
  Table,
} from 'antd';
import {
  ToolButtons
} from '../Toolbar';
import {
  UIComponent
} from 'saas-plat-metaui';
import {
  Resizable
} from 'react-resizable';
import {
  renderElement,
  createFormatter
} from '../util';
import './style';

const ResizeableTitle = props => {
  const {
    onResize,
    width,
    ...restProps
  } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

@observer
class EditableCell extends UIComponent {
  constructor(){
    super();
    // endEdit 需要触发，包括直接改tablemodel
  }

  render() {
    const {
      cell,
      config,
      column,
      rowIndex,
      columnIndex
    } = this.props;
    const {value, cellProps} = cell;
    // 支持行按钮，行按钮一直显示
    return (
      <div className="editable-cell">
        {config.isCellEditable(rowIndex,columnIndex) || ['buttons', 'buttongroup', 'toolbar'].indexOf(column.type)>-1
          ? <div className="editable-cell-input-wrapper">
              {this.renderItem(column,{
                  ...cellProps,
                  value,
                  onChange: (value)=>this.context.onEvent(config, 'setCell', value, ()=>config.setCell(rowIndex,columnIndex,value)),
                  onPressEnter:()=>this.context.onEvent(config, 'endEdit', undefined, ()=>config.endEdit()),
                  onBlur:()=>this.context.onEvent(config, 'endEdit', undefined, ()=>config.endEdit())
                })}
            </div>
          : <div className="editable-cell-text-wrapper" onClick={()=>this.context.onEvent(config, 'startEdit', undefined, ()=>config.startEdit(rowIndex,columnIndex))}>
            {renderElement(value, createFormatter(column).formatter)}
          </div>}
      </div>
    );
  }
}

@observer
export default class EditableTable extends UIComponent {

  components = {
    header: {
      cell: ResizeableTitle,
    },
  };

  handleResize = index => (e, {
    size
  }) => {
    const config = this.props.config;
    config.setColumn(index, {
      width: size.width
    })
  };

  createColumns = (columns, counter = {
    i: 0
  }) => {
    return columns.map(it => {
      const columnIndex = counter.i++;
      return {
        ...it,
        onHeaderCell: column => ({
          width: column.width,
          onResize: this.handleResize(columnIndex),
        }),
        children: it.children && this.createColumns(it.children, counter.i),
        render: it.children && it.children.length > 0 ? null : (text, row, rowIndex) => (
          <EditableCell config={this.props.config} row={row} cell={row.value[it.dataIndex] || {}}
            column={it} rowIndex={rowIndex} columnIndex={columnIndex} />)
      }
    });
  }

  render() {
    const config = this.props.config;
    const {
      data,
      columns,
      showCheck,
      bordered = true,
      showHeader,
      size,
      title,
      rowIndex,
      buttons,
    } = config;
    const columnItems = this.createColumns(columns);
    const rowSelection = showCheck ? {
      onChange: (selectedRowKeys, selectedRows) => {
        this.context.onEvent(this.props.config, 'selectRow', {
          keys: selectedRowKeys,
          rows: selectedRows
        }, () => config.selectRows(selectedRowKeys))
      },
      getCheckboxProps: (record, index) => ({
        disabled: config.isRowCheckable(index) // Column configuration not to be checked
        //name: record.name,
      }),
    } : null;
    return (
      <div className='editableTable'>
        {buttons?<ToolButtons config={{items:buttons}} />:null}
        <Table
          bordered={bordered}
          showHeader={showHeader}
          className='table'
          components={this.components}
          size={size}
          title={title}
          pagination={false}
          dataSource={data}
          columns={columnItems}
          onChange={config.handleChange}
          // onExpand={handleExpand}
          // onExpandedRowsChange={handleExpandedRowsChange}
          onHeaderRow={(column, index)=>({
            onClick: ()=>{
              this.context.onEvent(this.props.config, 'selectColumn',{column, index}, ()=>config.selectColumn(index))
            }
          })}
          rowSelection={rowSelection}
          rowClassName={(row, index)=> rowIndex === index?'row-selected':''}
          onRow={(row, index)=>({
                onClick: () => {
                  this.context.onEvent(this.props.config, 'enterRow', {row, index}, ()=>config.enterRow(index))
                }, // 点击行
                // onDoubleClick: event => {},
                // onContextMenu: event => {},
                // onMouseEnter: event => {}, // 鼠标移入行
                // onMouseLeave: event => {},
          })} />
      </div>
    );
  }
}
