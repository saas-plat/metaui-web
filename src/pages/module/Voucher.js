import React from 'react';
import {observer} from "mobx-react";
import { translate } from 'react-i18next';
import { Modal, Button  } from 'antd';
import {CardForm} from '../../components/CardForm';
import {AssociateInfo} from '../../components/AssociateInfo';
import {Total} from '../../components/Total';
import {Toolbar} from '../../components/toolbar';
import Options from '../../components/options';
import './style.less';

@translate('pages')
@observer
export default class Voucher extends React.Component {
  render() {
    const {view, store, t} = this.props;
    const { optionVisible, optionSaving } = store;
    return (<div className='voucher'>
        <Toolbar config={view.toolbar} mode='header'/>
        <CardForm config={view.cardForm}/>
        <AssociateInfo config={view.associateInfo}/>
        <Total config={view.total}/>
        <Toolbar config={view.footbar} mode='footer'/>
      <Modal
        className='voucher-options'
        width={520}
          visible={optionVisible}
          title={t('单据选项')}
          onOk={()=>store.saveOptions()}
          onCancel={()=>store.showOptions(false)}
          footer={[
            <Button key="submit" type="primary" loading={optionSaving} onClick={()=>store.saveOptions()}>
              {t('关闭')}
            </Button>,
          ]}>
          <Options />
        </Modal>
    </div>)
  }
}
