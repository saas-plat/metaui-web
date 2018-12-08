import {
  Input
} from './Input';
import {
  Table
} from './Table';

let gid = 0;

// 分配全局id
export const assignId = (pre) => {
  // 每次加一
  gid = gid + 1;
  return (pre || '') + gid;
}

export const createView = (view, object = {}) => {
  switch ((object.type || 'text').toLowerCase()) {
  case 'table':
    return Table.create(view, object);
  default:
    return Input.create(view, object);
  }
}
