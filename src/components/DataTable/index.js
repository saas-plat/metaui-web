import React from 'react';
import {
  observer
} from "mobx-react";
import {
  AutoSizer,
  ScrollSync,
  InfiniteLoader,
  Grid,
  defaultCellRangeRenderer
} from 'react-virtualized';
import scrollbarSize from 'dom-helpers/scrollbarSize';
import {
  UIComponent
} from '@saas-plat/metaui';
import { withTranslation } from 'react-i18next';
import {
  Modal,
  Button,
  Icon
} from 'antd';
import './style';
import Options from './options';

@withTranslation('metaui-web')
@observer
export default class Table extends UIComponent {

  renderHeaderCell =({
    columnIndex,
    key,
    rowIndex,
    style
  }) => {
    const {
      title,
    } = this.props.config.getColumn(rowIndex, columnIndex);
    return (
      <div className={'cell'} key={key} style={style} >
         {title}
         <span>
         <Icon type="caret-up" />
         <Icon type="caret-down" />
         </span>
       </div>
    );
  }

  renderHeaderCellRange = (props) => {
    // 合并单元格处理
    const children = defaultCellRangeRenderer(props);
    children.push(<div>My custom overlay</div>);
    return children;
  }

  renderBodyCell = ({
    columnIndex,
    key,
    rowIndex,
    style
  }) => {
    const {
      value,
      type = ''
    } = this.props.config.getCell(rowIndex, columnIndex);
    return (
      <a className={['cell',type].join(' ')} key={key} style={style} onClick={()=>this.props.config.selectCell(rowIndex, columnIndex)}>
         {value}
       </a>
    );
  }

  render() {
    const {
      config
    } = this.props;
    const {
      columns = [],
        columnCount = 0, // 包含固定列的最末级列数
        fixedColumnCount = 0, // 固定列最末级列数
        headerRowCount=0,
        rowCount = 0,
        rowHeight = 40,
        cellMeasurer = false,

        // options
        title = this.props.t('选项'),
        cancelText = this.props.t('取消'),
        okText = this.props.t('确定'),
        width,
        visible,
        loading
    } = config;
    const columnWidth = 120;
    const overscanColumnCount = 0;
    const overscanRowCount = 5;
    const estimatedColumnSize = columns.length * columnWidth;
    return (<div className={'datatable'+(cellMeasurer?' measurer':'')}>
        <ScrollSync>
          {({
            onScroll,
            scrollLeft,
            scrollTop,
          }) => {
            return (
            <InfiniteLoader
              isRowLoaded={index=>config.isRowLoaded(index)}
              loadMoreRows={({startIndex, stopIndex})=>config.loadData(startIndex, stopIndex-startIndex)}
              rowCount={rowCount}>
              {({onRowsRendered, registerChild}) => (
                <AutoSizer>
                  {({width, height}) => (
                    <div className='row'>
                      <div
                        className='leftSideGridContainer'
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                        }}>
                        <Grid
                          className='header'
                          width={columnWidth}
                          height={rowHeight}
                          rowHeight={rowHeight}
                          columnWidth={columnWidth}
                          rowCount={headerRowCount}
                          columnCount={fixedColumnCount}
                          cellRenderer={this.renderHeaderCell}
                          cellRangeRenderer={this.renderHeaderCellRange}
                        />
                      </div>
                      <div
                        className='leftSideGridContainer'
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: rowHeight,
                        }}>
                        <Grid
                          overscanColumnCount={0}
                          overscanRowCount={overscanRowCount}
                          cellRenderer={this.renderBodyCell}
                          columnWidth={index=>config.getColumnWidth(index)}
                          columnCount={fixedColumnCount}
                          className='leftSide'
                          height={height - scrollbarSize()}
                          rowHeight={rowHeight}
                          rowCount={rowCount}
                          scrollTop={scrollTop}
                          width={columnWidth}
                        />
                      </div>
                      <div className='column'>
                        <div>
                          <div
                            style={{
                              height: rowHeight,
                              width: width - scrollbarSize(),
                            }}>
                            <Grid
                              className='header'
                              columnWidth={columnWidth}
                              columnCount={columnCount-fixedColumnCount}
                              height={rowHeight}
                              overscanColumnCount={overscanColumnCount}
                              cellRenderer={this.renderHeaderCell}
                              cellRangeRenderer={this.renderHeaderCellRange}
                              rowHeight={rowHeight}
                              rowCount={headerRowCount}
                              scrollLeft={scrollLeft}
                              width={width - scrollbarSize()}
                            />
                          </div>
                          <div
                            style={{
                              height,
                              width,
                            }}>
                            {rowCount>0?<Grid
                              ref={registerChild}
                              className='body'
                              columnWidth={index=>config.getColumnWidth(index)}
                              columnCount={columnCount-fixedColumnCount}
                              estimatedColumnSize={estimatedColumnSize}
                              onSectionRendered={({rowOverscanStartIndex, rowOverscanStopIndex, rowStartIndex, rowStopIndex}) => onRowsRendered({
                                overscanStartIndex: rowOverscanStartIndex, overscanStopIndex: rowOverscanStopIndex,
                                startIndex: rowStartIndex, stopIndex:rowStopIndex
                              })}
                              height={height}
                              onScroll={onScroll}
                              overscanColumnCount={overscanColumnCount}
                              overscanRowCount={overscanRowCount}
                              cellRenderer={this.renderBodyCell}
                              rowHeight={rowHeight}
                              rowCount={rowCount}
                              width={width}
                            />:<div className='emptydata'>{this.props.t('无数据')}</div>}
                          </div>
                      </div>
                  </div>
                </div>
              )}
            </AutoSizer>
           )}
          </InfiniteLoader>
          );
        }}
      </ScrollSync>
      <Modal
          className='datatable-modal'
          width={width}
          visible={visible}
          title={title}
          onOk={()=>config.ok()}
          onCancel={()=>config.cancel()}
          footer={[
            <Button key="cancel" type="default" className="cancel" onClick={()=>config.cancel()}>
              {cancelText}
            </Button>,
            <Button key="ok" type="primary" className="ok" loading={loading} onClick={()=>config.ok()}>
              {okText}
            </Button>
          ]}>
          <Options config={config} />
      </Modal>
    </div>);
  }
}
