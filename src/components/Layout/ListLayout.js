import React from 'react';
import {
  Row,
  Col,
  List,
  Collapse,
  Button,
  Tooltip
} from 'antd';
import {
  observer
} from "mobx-react";
import {UIComponent} from 'saas-plat-metaui';
import './style.less';
import ResizeSensor from 'css-element-queries/src/ResizeSensor';
const Panel = Collapse.Panel;
// 这里必须是可观察要不listitem不能重新render
const ObserverList = observer(List);

@observer
export default class ListLayout extends UIComponent {

  componentDidMount(){
    this.calcWidth();
    this.resizer = new ResizeSensor(document.querySelector('.listlayout'), ()=>{
      if (this.resizeTimer){
        clearTimeout(this.resizeTimer);
        this.resizeTimer = null;
      }
      this.resizeTimer = setTimeout(()=>{
        this.calcWidth();
        this.resizeTimer = null;
      },100);
    });
  }

  componentWillUnmount(){
    if (this.resizer){
      this.resizer.detach(document.querySelector('.listlayout'));
      this.resizer = null;
    }
  }

  calcWidth(){
    const width = document.querySelector('.listlayout').offsetWidth;
    if (width<576){
      this.setState({
        colSpan: 24
      });
    }
    if (width>992){
      this.setState({
        colSpan: 12
      });
    }
    if (width>1200){
      this.setState({
        colSpan: 8
      });
    }
  }

  renderGroup(group) {
    const list = (
      <div key={"list_"+group.key} className='list'>
        {group.description?<p className="description">{group.description}</p>:null}
        <ObserverList
        className='items'
         itemLayout="vertical"
         dataSource={group.items.slice()}
         renderItem={item => (
           <List.Item extra={<Tooltip placement="top" title={item.tip}><span>
              {this.renderItem(item)}
            </span></Tooltip>}>
             <List.Item.Meta
               title={item.text}
               description={<div key={'txt_'+item.key}>{item.description} {item.btns.map(it=>(
                 <Button key={it.key} size='small' onClick={()=>this.context.onEvent(it,'click')}>{it.text}</Button>)
               )}</div>}/>
               {item.groups.map(g=>this.renderGroup(g))}
           </List.Item>
         )}/>
     </div>);
     if (group.type === 'list'){
       return list;
     }
    return (<Collapse className="groups" bordered={false} defaultActiveKey={[group.key]}>
      {group.groups.map(it=>(<Panel key={it.key} className="group" header={group.text}>
        {this.renderGroup(it)}
      </Panel>))}
      {group.items.length>0? <Panel className="group" header={group.text} key={group.key}>
        {list}
      </Panel>:null}
    </Collapse>)
  }

  render() {
    const {
      groups=[]
    } = this.props.config;
    const cols = [];
      for (let k = 0; k <  groups.length; k++) {
        const group = groups[ k];
        cols.push(<Col key={group.key} sm={this.state.colSpan} xs={24}>{this.renderGroup(group)}</Col>);
      }
    return (<div className='layout list'>
      <Row gutter={16}>
        {cols}
      </Row>
    </div>)
  }
}
