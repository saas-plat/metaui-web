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
import './style';

@observer
class EditableCell extends UIComponent {
   render() {
    const {value,config,column,rowIndex,columnIndex} = this.props;
    // 支持行按钮，行按钮一直显示
    return (
      <div className="editable-cell">
        {config.isCellEditable(rowIndex,columnIndex) || ['buttons', 'buttongroup', 'toolbar'].indexOf(column.type)>-1
          ? <div className="editable-cell-input-wrapper">
              {this.renderItem(column,{
                  autoFocus: true,
                  onChange: (value)=>this.context.onEvent(config, 'setCell', value, ()=>config.setCell(rowIndex,columnIndex,value)),
                  onPressEnter:()=>config.endEdit(),
                  onBlur:()=>config.endEdit()
                })}
            </div>
          : <div className="editable-cell-text-wrapper" onClick={()=>config.startEdit(rowIndex,columnIndex)}>
            {value}
          </div>}
      </div>
    );
  }
}

@observer
export default class EditableTable extends UIComponent {

  createColumns = (columns, counter={i:0}) => {
    return columns.map(it => ({
      ...it,
      children: it.children && this.createColumns(it.children, counter.i),
      render: it.children && it.children.length > 0 ? null : (text, record, index) => (
        <EditableCell config={this.props.config} row={record} value={record[it.dataIndex]} column={it} rowIndex={index} columnIndex={counter.i++} />)
    }));
  }

  render() {
    const config = this.props.config;
    const {
      data,
      columns,
      showCheck,
      bordered,
      showHeader,
      size,
      title,
      buttons,
    } = config;
    const columnItems = this.createColumns(columns);
    const rowSelection = showCheck? {
      onChange: (selectedRowKeys, selectedRows) => {
         this.context.onEvent(this.props.config, 'selectRow', {keys:selectedRowKeys, rows:selectedRows},()=> config.selectRows(selectedRowKeys))
      },
      getCheckboxProps: (record, index) => ({
        disabled: config.isRowCheckable(index) // Column configuration not to be checked
        //name: record.name,
      }),
    }: null;
    return (
      <div className='editableTable'>
        {buttons?<ToolButtons config={{items:buttons}} />:null}
        <Table
          bordered={bordered}
          showHeader={showHeader}
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
