import Expression from '../src/stores/Template/Expression';

global.__DEV__ = true;

describe('表达式', () => {

  test('支持常用的数值、字符串、布尔、null', () => {
    const expr = new Expression('"test1"');
    expect(expr.exec({})).toEqual('test1');

    const expr2 = new Expression("'test1'");
    expect(expr2.exec()).toEqual('test1');

    const expr3 = new Expression("'test'+'100'");
    expect(expr3.exec()).toEqual('test100');

    const expr4 = new Expression("10");
    expect(expr4.exec()).toEqual(10);

    const expr5 = new Expression("null");
    expect(expr5.exec()).toEqual(null);

    const expr6 = new Expression("false");
    expect(expr6.exec()).toEqual(false);
  })

  // 这里和单值表达式词法冲突，解决方法未找到
  // test('支持便捷的无引号的字符串常量，以=开头', () => {
  //   const expr = new Expression('={test1:$aaa}');
  //   expect(expr.exec()).toEqual('{test1:$aaa}');
  // })

  test('支持基本逻辑运算', () => {
    const expr = new Expression('$a+$b');
    const obj = {
      a: 100,
      b: 'aaaa'
    };
    expect(expr.exec(obj)).toEqual('100aaaa');
  })

  test('支持系统对象now,Math,Date', () => {
    const expr = new Expression('now');
    expr.exec();
    //expect(expr.exec( )).toEqual();
  })

  test('支持映射表达式{a:xxx,b:xxx,...}', () => {
    const expr = new Expression('{a:$a*2,[$b]:$b+"aa",d:10,c:"text value"}');
    const obj = {
      a: 100,
      b: 'aaaa'
    };
    expect(expr.exec(obj)).toEqual({
      a: 200,
      aaaa: 'aaaaaa',
      c: "text value",
      d: 10
    });
  })
})
