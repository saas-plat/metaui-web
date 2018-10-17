import {
  ExprListener
} from './ExprListener';
import ExprException from './ExprException';
import DateUtil from './DateUtil';

export default class ExprExecutor extends ExprListener {
  scope;
  result;

  constructor(scope) {
    super();
    this.scope = scope || {};
  }

  exitExec(ctx) {
    this.result = ctx.getChild(0).value;
  }
  // singleExpression ( ',' singleExpression )*
  exitExpressionSequence(ctx) {
    const value = [ctx.getChild(0).value];
    for (let i = 2, l = ctx.getChildCount(); i < l; i += 2) {
      value.push(ctx.getChild(i).value);
    }
    ctx.value = value;
  }
  // '=' CONST*
  exitConstStringExpression(ctx){
    ctx.value = ctx.getChild(1).getText();
  }
  // singleExpression '.' ID '(' expressionSequence ')'
  exitFunctionInvokeExpression(ctx) {
    ctx.value = ctx.getChild(0).value[ctx.getChild(2).getText()].apply(ctx.getChild(
      0).value, ctx.getChild(4).value);
  }
  // singleExpression '[' expressionSequence ']'
  exitMemberIndexExpression(ctx) {
    ctx.value =  ctx.getChild(2).value.reduce((v,index)=>{
      return v[index];
    },ctx.getChild(0).value);
  }
  // singleExpression '.' ID
  exitMemberDotExpression(ctx) {
    if (!ctx.getChild(0).value){
      return undefined;
    }
    ctx.value = ctx.getChild(0).value[ctx.getChild(2).getText()];
  }
  // (  '~' | '!') singleExpression
  exitUnaryExpression(ctx) {
    const oper = ctx.getChild(0).getText();
    if (oper === '~') {
      ctx.value = ~ctx.getChild(1).value;
    } else if (oper === '!') {
      ctx.value = !ctx.getChild(1).value;
    } else {
      throw new ExprException(`UnaryExpression operator ${oper} not support`);
    }
  }
  /*
'*'    | '/'  | '%' |  '+' | '-'
| '<<' | '>>' | '>>>'
| '<' | '>' | '<=' | '>='
| 'in'
| '==' | '!='  | '==='  | '!=='
| '&' | '^' | '|'
| '&&' '||'
  */
  exitBinaryExpression(ctx) {
    const a = ctx.getChild(0).value;
    const b = ctx.getChild(2).value;
    const oper = ctx.getChild(1).getText();
    if (oper === 'in') {
      ctx.value = a in b;
    } else if (oper === '*') {
      ctx.value = a * b;
    } else if (oper === '/') {
      ctx.value = a / b;
    } else if (oper === '%') {
      ctx.value = a % b;
    } else if (oper === '+') {
      ctx.value = a + b;
    } else if (oper === '-') {
      ctx.value = a - b;
    } else if (oper === '<<') {
      ctx.value = a << b;
    } else if (oper === '>>') {
      ctx.value = a >> b;
    } else if (oper === '>>>') {
      ctx.value = a >>> b;
    } else if (oper === '<') {
      ctx.value = a < b;
    } else if (oper === '>') {
      ctx.value = a > b;
    } else if (oper === '<=') {
      ctx.value = a <= b;
    } else if (oper === '>=') {
      ctx.value = a >= b;
    } else if (oper === '==') {
      ctx.value = a == b;
    } else if (oper === '!=') {
      ctx.value = a != b;
    } else if (oper === '===') {
      ctx.value = a === b;
    } else if (oper === '!==') {
      ctx.value = a !== b;
    } else if (oper === '&') {
      ctx.value = a & b;
    } else if (oper === '^') {
      ctx.value = a ^ b;
    } else if (oper === '|') {
      ctx.value = a | b;
    } else if (oper === '&&') {
      ctx.value = a && b;
    } else if (oper === '||') {
      ctx.value = a || b;
    } else {
      throw new ExprException(`BinaryExpression operator ${oper} not support`);
    }
  }
  // singleExpression '?' singleExpression ':' singleExpression
  exitTernaryExpression(ctx) {
    const condition = ctx.getChild(0);
    const success = ctx.getChild(2);
    const fail = ctx.getChild(4);
    if (condition.value) {
      ctx.value = success.value;
    } else {
      ctx.value = fail.value;
    }
  }
  exitInternalExpression(ctx) {
    const internalObj = ctx.getText();
    if (internalObj === 'now') {
      ctx.value = new Date();
    } else if (internalObj === 'Date') {
      ctx.value = DateUtil;
    } else if (internalObj === 'Math') {
      ctx.value = Math;
    } else {
      throw new ExprException(`InternalExpression ${internalObj} not support`);
    }
  }
  // value
  exitLiteralExpression(ctx) {
    // value左右可以有空格
    ctx.value = new Function(`return ${ctx.getText().trim()}`)();
  }
  // VARID
  exitIdentifierExpression(ctx) {
    ctx.value = this.scope[ctx.getText().substr(1)];
  }
  // '(' expressionSequence ')'
  exitParenthesizedExpression(ctx) {
    ctx.value = ctx.getChild(1).value;
  }

  // objectLiteral
  exitObjectLiteralExpression(ctx) {
    ctx.value = ctx.getChild(0).value;
  }

  // '{' (propertyAssignment (',' propertyAssignment)*)? ','? '}'
  exitObjectPropertyAssignmentExpression(ctx) {
    const ps = [];
    for (let i = 1, l = ctx.getChildCount() - 1; i < l; i += 2) {
      ps.push(ctx.getChild(i).value);
    }
    ctx.value = Object.assign({}, ...ps);
  }

  // ID (':' |'=') singleExpression
  exitPropertyExpressionAssignment(ctx) {
    ctx.value = ctx.value || {};
    ctx.value[ctx.getChild(0).getText()] = ctx.getChild(2).value;
  }

  // '[' singleExpression ']' ':' singleExpression
  exitComputedPropertyExpressionAssignment(ctx) {
    ctx.value = ctx.value || {};
    ctx.value[ctx.getChild(1).value] = ctx.getChild(4).value;
  }

  exitConstString(ctx) {
    ctx.value = ctx.getText();
  }
}
