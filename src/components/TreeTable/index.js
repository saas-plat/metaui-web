import React from 'react';
import { Row, Col, Modal, Button } from 'antd';
import SearchTree from './SearchTree';
import DataTable from './DataTable';
import Base from '../Base';

export default class TreeTable extends Base{
  state = {
   loading: false,
   visible: false,
 }

 showModal = () => {
   this.setState({
     visible: true,
   });
 }

 handleOk = () => {
   this.setState({ loading: true });
   setTimeout(() => {
     this.setState({ loading: false, visible: false });
   }, 3000);
 }

 handleCancel = () => {
   this.setState({ visible: false });
 }

  render(){
     const { visible, loading } = this.state;
     const {tree, table} = this.props.config;
    return (<div className='treetable'>
      <Row>
        <Col xs={0} sm={6} xxl={4}>
          <SearchTree />
        </Col>
        <Col xs={24} sm={0}>
          <Button type="primary" onClick={this.showModal}>
           Open
         </Button>
        </Col>
        <Col xs={24} sm={18} xxl={20}>
          <Row>
            <Col xs={24} xxl={14}>
              <DataTable />
            </Col>
            <Col xs={0} xxl={6}>

            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
          visible={visible}
          title="Title"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>Return</Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}>
          <SearchTree />
        </Modal>
      </div>)
  }
}
