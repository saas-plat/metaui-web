import React from 'react';
import {observer} from "mobx-react";
import BaseComponent from '../BaseComponent';
import './style.less';

@observer
export default class TotalAmount extends BaseComponent{
  render() {
    return (<div className='totalAmount'>
       TotalAmount
    </div>)
  }
}
