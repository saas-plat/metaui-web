import React from 'react';
import {
  observer
} from "mobx-react";
import PropTypes from 'prop-types';
import {
  Table,
  Popconfirm
} from 'antd';
import InputItem from '../InputItem';
import {ToolButtons} from '../Toolbar';
import {UIComponent} from 'saas-plat-metaui';
import './style';
import {
  renderColumns
} from '../util';

@observer
class EditableCell extends UIComponent {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func
  }
  state = {
    value: this.props.value,
    editable: false
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      value
    });
  }
  check = () => {
    this.setState({
      editable: false
    });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({
      editable: true
    });
  }
  render() {
    const {
      value,
      editable
    } = this.state;
    return (
      <div className="editable-cell">
        {editable
          ? <div className="editable-cell-input-wrapper">
              <InputItem
                config={{type:'text'}}
                autoFocus
                onChange={this.handleChange}
                onPressEnter={this.check}
                onBlur={this.check}/>
            </div>
          : <div className="editable-cell-text-wrapper" onClick={this.edit}>
            {value || ' '}
          </div>
}
      </div>
    );
  }
}

@observer
export default class EditableTable extends UIComponent {

  onCellChange = (index, key) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.setState({
        dataSource
      });
    };
  }
  onDelete = (index) => {
    const dataSource = [...this.state.dataSource];
    dataSource.splice(index, 1);
    this.setState({
      dataSource
    });
  }
  handleAdd = () => {
    const {
      count,
      dataSource
    } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`
    };
    this.setState({
      dataSource: [
        ...dataSource,
        newData
      ],
      count: count + 1
    });
  }
  renderOperation = (text, record, index) => {
    return (this.state.dataSource.length > 1 ?
      (
        <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(index)}>
          <a href="#">Delete</a>
        </Popconfirm>
      ) :
      null);
  }
  createColumns(columns) {
    return columns.map(it => ({
      key: it.key,
      align: it.align,
      colSpan: it.colSpan,
      dataIndex: it.dataIndex,
      fixed: it.fixed,
      title: it.title,
      width: it.width,
      children: it.children && this.createColumns(it.children),
      render: it.children && it.children.length > 0 ? null : (text, record, index) => (
        <EditableCell value={text} onChange={this.onCellChange(index, it.key)}/>)
    }));
  }
  render() {
    const {
      dataSource,
      columns,
      bordered,
      showHeader,
      size,
      title,
      buttons
    } = this.props.config;
    const columnItems = this.createColumns(renderColumns(columns)).concat([{
      key: 'column_Operation',
      title: '',
      fixed: 'right',
      width: 60,
      render: this.renderOperation
    }]);
    return (
      <div className='editableTable'>
        {buttons?<ToolButtons config={{items:buttons}} />:null}
        <Table
          bordered={bordered}
          showHeader={showHeader}
          size={size}
          title={title}
          pagination={false}
          dataSource={dataSource}
          columns={columnItems} />
      </div>
    );
  }
}
