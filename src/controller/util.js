import {Expression} from 'saas-plat-clientfx';

export const map = async (obj, mapping) => {
  if (!mapping) {
    return obj;
  }
  const expr = new Expression(mapping);
  // 这里是有个问题，要是调用了异步函数，这里需要await
  // 异步函数表达式还没有支持
  if (expr.tree) {
    return expr.exec(obj);
  } else {
    return {};
  }
}
