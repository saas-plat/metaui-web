import React from 'react';
import {observer} from "mobx-react";
import './style.less';

@observer
export default class TotalAmount extends React.Component{
  render() {
    return (<div className='totalAmount'>
       TotalAmount
    </div>)
  }
}
