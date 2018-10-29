import React from 'react';
import {observer} from "mobx-react"; 
import {Checkbox} from 'antd';
import './style';


  const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

@observer
export default class Options extends React.Component {
  static propTypes = {}

  state = {
     checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false,
  };

  render() {
    return (<div className='options-items'>
      <div style={{
          borderBottom: '1px solid #E9E9E9'
        }}>
        <Checkbox indeterminate={this.state.indeterminate} onChange={this.onCheckAllChange} checked={this.state.checkAll}>
          Check all
        </Checkbox>
      </div>
      <br/>
      <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange}/>
    </div>);
  }
}
