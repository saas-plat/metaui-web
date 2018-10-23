module.exports = function ({
  mid
}) {
  return {
    mid,
    view: {
      type: 'option',
      onLoad: {
        name: 'loadOption',
        query: '"Option{a,b,c,d}"',
        mapping: '"{text:$Option.a}"',
        hideTip: true
      },
      items: [{
        type: 'listgroup',
        onChange: {
          name:'saveOption',
          mapping: '{a:$text}'
        },
        items: [{
          type: 'group',
          title: '分组1',
          description: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          items: [{
            type: 'text',
            title: 'text',
            value: 'text',
            description: 'text help text',
            btns: [{
              text: '打开权限管理',
              goto: '~/manage/privilege'
            }]
          }, {
            type: 'switch',
            title: 'check',
            value: 'check',
            confirm: 'are you sure?',
            tip: 'this is tip text',
            child: {
              type: 'list',
              visible: '$check',
              items: [{
                type: 'text',
                title: 'text2',
                value: 'text2',
                description: 'text help text',
                btns: [{
                  text: 'test2',
                  goto: '~/manage/privilege'
                }]
              }, {
                type: 'switch',
                title: 'check2',
                value: 'check2',
                confirm: 'are you sure?'
              }]
            }
          }, {
            type: 'select',
            title: 'select',
            value: 'select',
            items: [{
              key: '01',
              value: 'item1'
            }, {
              key: '02',
              value: 'item2'
            }, {
              key: '03',
              value: 'item3'
            }]
          }, {
            type: 'select',
            multiple: true,
            value: 'multiple',
            title: 'multiple select',
            items: [{
              key: '01',
              value: 'item1'
            }, {
              key: '02',
              value: 'item2'
            }, {
              key: '03',
              value: 'item3'
            }]
          }, {
            type: 'refselect',
            title: 'ref select',
            value: 'refselect',
            query: 'array1{a,b}',
            mapping: '{key:$a,value:$b}'
          }, {
            type: 'date',
            title: 'date',
            value: 'date',
          }, {
            type: 'time',
            title: 'time',
            value: 'time',
          }, {
            type: 'datetime',
            title: 'aaaaaa',
            value: 'datetime',
          }, {
            type: 'number',
            title: 'aaaaaa',
            value: 'number',
          }, {
            type: 'table',
            title: 'aaaaaa',
            description: 'aaaaaaaaaaaaa',
            columns: [{
              title: 'a',
              dataIndex: 'a'
            }, {
              title: 'b',
              dataIndex: 'b',
              type: 'text'
            }],
            row: [{
              a: 'row 1',
              b: ''
            }, {
              a: 'row 2',
              b: ''
            }, {
              a: 'row 3',
              b: ''
            }]
          }, {
            type: 'group',
            title: '子分组',
            items: [{
              type: 'text',
              title: 'text2'
            }, {
              type: 'check',
              title: 'check2',
            }]
          }]
        }].concat([{
          type: 'group',
          title: '分组2',
          description: '',
          items: [{
            type: 'text',
            title: 'text',
            value: '',
            description: 'text help text',
            btns: [{
              title: 'test2',
              url: '~/manage/privilege/data'
            }]
          }]
        }])
      }]
    },
    model:{
      text: 'string',
      check: 'bool',
      text2: 'string',
      check2: 'bool',
      select: 'string',
      multiple: 'array',
    }
  }
}
