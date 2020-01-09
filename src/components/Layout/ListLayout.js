import React from 'react';
import {
  Icon,
  List,
  Button,
  Tooltip
} from 'antd';
import {
  observer
} from "mobx-react";
import {
  UIComponent
} from 'saas-plat-metaui';
import './style.less';
// 这里必须是可观察要不listitem不能重新render
const ObserverList = observer(List);

@observer
export default class ListLayout extends UIComponent {

  render() {
      const {
        items = [],
      } = this.props.config;
      return (<ObserverList
       className='layout list'
       itemLayout='vertical'
       dataSource={items}
       renderItem={item => {
         let meta = null;
         if (item.icon || item.title || item.description || item.btns){
          meta= <List.Item.Meta
             avatar={item.icon?<Icon type={item.icon} />:null}
             title={item.title}
             description={
               <div key={'txt_'+item.key}>
                  {item.description}
                  {item.btns.map(it=>(
                   <Button key={it.key} size='small' type={it.type || 'default'} onClick={()=>this.context.onEvent(it,'click')}>{it.text}</Button>)
                 )}
               </div>}
            />
          }
         let extra = null;
         if (item.extra){
           extra = <span>{this.renderItem(item.extra)}</span>;
           if (item.tip){
             extra = <Tooltip title={item.tip}>{extra}</Tooltip>
           }
         }
         return <List.Item extra={extra}>
           {meta}
            {this.renderItem(item)}
         </List.Item>
       }}/>)
  }
}
