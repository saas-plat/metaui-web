module.exports = function ({
  mid
}) {
  return {
    mid,
    view: {
      type: 'voucher',
      state: '$state',
      items: [{
          type: 'toolbar',
          text: 'this is title',
          items: [{
            name: 'search',
            icon: 'search',
            visible: '$state == "READONLY"',
            onClick: 'search'
          }, {
            name: 'action1',
            text: '新增',
            visible: '$state == "READONLY"',
            onClick: 'createVoucher'
          }, {
            name: 'edit',
            text: '修改',
            visible: '$state == "READONLY"',
            onClick: 'editVoucher'
          }, {
            name: 'action2',
            text: '单据选项',
            visible: '$state == "READONLY"',
            onClick: 'showVoucherOptions'
          }]
        }, {
          type: 'footbar',
          items: [{
            name: 'save',
            text: '保存',
            icon: 'check',
            visible: '$state == "NEW" || $state == "EDIT" || $state == "MODIFY"',
            onClick: {
              name: 'saveVoucher',
              mapping: '={code:$code}'
            }
          }, {
            name: 'action1',
            text: 'action 1'
          }]
        },
        {
          type: 'cardform',
          groups: [{
            type: 'flow',
            items: [{
              type: 'text',
              value: 'code',
              text: 'code'
            }, {
              type: 'datetime',
              value: 'obj2.f2',
              text: 'datetime'
            }, {
              type: 'time',
              value: 'obj2.f2',
              text: 'time'
            }, {
              type: 'number',
              value: 'obj2.f3',
              format: 'thousandth',
              text: 'number'
            }, {
              type: 'check',
              value: 'obj2.f3',
              text: 'check'
            }, {
              type: 'switch',
              value: 'obj2.f3',
              text: 'switch'
            }, {
              type: 'select',
              value: 'array1',
              text: 'select'
            }, {
              type: 'treeselect',
              value: 'array1',
              text: 'treeselect'
            }, {
              name: 'item2',
              text: 'item2',
              type: 'refselect',
              dropdownStyle: 'list',
              value: 'array1',
              multiple: true,
              query: '=obj1{a,b,c,d,e}',
              displayField: 'a',
              sortField: 'a', // 树形全部取回来需要按照树结构排序
              mapping: '={f1:$a,f2:$b,f3:$c}',
              setValue: 'obj2',
              pageSize: 200
            }, {
              name: 'item3',
              text: 'item3',
              type: 'refselect',
              dropdownStyle: 'tree',
              value: 'obj2.f1',
              expandAll: true,
              //expandedKeys:[],
              range: 'leaf', // leaf parent all
              query: '=obj1{id,pid,a,b,c,d,e,leaf}',
              variables: '{pid:$id}', // 去掉查询变量一次取出全部
              idField: 'id',
              pidField: 'pid',
              displayField: ['a'],
              leafField: 'leaf',
              mapping: '={f1:$a,f2:$b,f3:$c}',
              setValue: 'obj2'
            }, {
              name: 'item4',
              text: 'item4',
              type: 'refselect',
              dropdownStyle: 'table',
              value: 'obj2.f1',
              query: 'obj1{id,pid,a,b,c,d,e}',
              variables: '{pid:$id}',
              idField: 'id',
              pidField: 'pid',
              leafField: 'leaf',
              columns: [{
                title: 'aaa',
                value: 'a'
              }, {
                title: 'bbb',
                value: 'b'
              }, {
                title: 'ccc',
                value: 'c'
              }, {
                title: 'ddd',
                value: 'd'
              }],
              mapping: '={f1:$a,f2:$b,f3:$c}',
              setValue: 'obj2'
            }, {
              name: 'item6',
              text: 'item6',
              type: 'refselect',
              dropdownStyle: 'treetable',
              value: 'obj2.f1',
              multiple: false,
              range: 'leaf', // leaf parent all
              treequery: '=obj1{id,pid,a,b,c,d,e}',
              idField: 'id',
              pidField: 'pid',
              treeDisplayField: 'a',
              treeSelectable: true,
              tableQuery: '=obj2{a,b,c,d,e}',
              tableVariables: '{objid:$id}',
              columns: [{
                title: 'aaa',
                value: 'a'
              }, {
                title: 'bbb',
                value: 'b'
              }, {
                title: 'ccc',
                value: 'c'
              }, {
                title: 'ddd',
                value: 'd'
              }],
              mapping: '={f1:$a,f2:$b,f3:$c}',
              setValue: 'obj2'
            }, {
              name: 'inputtable',
              text: 'inputtable',
              type: 'inputtable',
              value: 'array1',
              table: {

              }
            }]
          }, {
            type: 'tabs',
            items: [{
              text: 'table view',
              panel: {
                type: 'grid',
                columnCount: 1,
                items: [{
                  //   type: 'infobar',
                  //   items:[{
                  //     text:'info1',
                  //     value: '$obj2.f1 +" = "+ $obj2.f3'
                  //   },{
                  //     text:'info2',
                  //     value: '"date is "+$obj2.f2'
                  //   }]
                  // },{
                  type: 'table',
                  dataSource: 'array1',
                  columns: [{
                    type: 'text',
                    value: 'code',
                    text: 'code',
                    width: 200,
                    fixed: true
                  }, {
                    type: 'datetime',
                    value: 'obj2.f2',
                    text: 'datetime',
                    width: 200,
                    fixed: true
                  }, {
                    type: 'time',
                    value: 'obj2.f2',
                    text: 'time'
                  }, {
                    type: 'number',
                    value: 'obj2.f3',
                    format: 'thousandth',
                    text: 'number'
                  }, {
                    type: 'check',
                    value: 'obj2.f3',
                    text: 'check'
                  }, {
                    type: 'switch',
                    value: 'obj2.f3',
                    text: 'switch'
                  }, {
                    type: 'select',
                    value: 'array1',
                    text: 'select'
                  }, {
                    type: 'treeselect',
                    value: 'array1',
                    text: 'treeselect'
                  }, {
                    name: 'item2',
                    text: 'item2',
                    type: 'refselect',
                    dropdownStyle: 'list',
                    value: 'array1',
                    multiple: true,
                    query: '=obj1{a,b,c,d,e}',
                    displayField: 'a',
                    sortField: 'a', // 树形全部取回来需要按照树结构排序
                    mapping: '={f1:$a,f2:$b,f3:$c}',
                    setValue: 'obj2',
                    pageSize: 200
                  }, {
                    name: 'item3',
                    text: 'item3',
                    type: 'refselect',
                    dropdownStyle: 'tree',
                    value: 'obj2.f1',
                    expandAll: true,
                    //expandedKeys:[],
                    range: 'leaf', // leaf parent all
                    query: '=obj1{id,pid,a,b,c,d,e,leaf}',
                    variables: '{pid:$id}', // 去掉查询变量一次取出全部
                    idField: 'id',
                    pidField: 'pid',
                    displayField: ['a'],
                    leafField: 'leaf',
                    mapping: '={f1:$a,f2:$b,f3:$c}',
                    setValue: 'obj2'
                  }]
                }]
              }
            }, {
              text: 'grid layout',
              panel: {
                type: 'grid',
                items: [{
                  type: 'money',
                  value: 'item1',
                  text: 'item1'
                }, ]
              }
            }]
          }, {
            type: 'flow',
            items: [{
              name: 'item2',
              value: 'obj2.f1',
              text: 'item2'
            }, {
              name: 'item3',
              value: 'obj2.f1',
              text: 'item3'
            }, {
              name: 'textarea1',
              type: 'textarea',
              value: 'item1',
              width: '100%',
              size: '1',
              placeholder: 'textarea'
            }]
          }]
        }
      ],
      onLoad: {
        name: 'loadData',
        query: '={test1:{id,a,b,c,d}}',
        variables: '{}',
        mapping: '={id:$id, item1:$a}'
      }
    },
    viewModel: {
      // id: 'string',   // 自动追加
      // state: 'string', // NEW EDIT READONLY CHANGE
      item1: {
        type: 'string'
      },
      obj2: {
        f1: 'string',
        f2: 'date',
        f3: 'number'
      },
      array1: {
        type: 'array'
      }
    },
    rules: ["rule 'update item2' {                             \
       when {                                                \
         vm : ViewModel vm.item1 == '11';                     \
       }                                                     \
       then {                                                \
           vm.item2 = 'b'                                    \
       }                                                     \
    }", "rule 'update state' {                               \
         when {                                               \
           vm : ViewModel;                                     \
           e : Event e.name == 'action1.click';               \
         }                                                     \
         then {                                                \
             vm.state = 'Edit'                                   \
         }                                                     \
      }"]
  }
}
