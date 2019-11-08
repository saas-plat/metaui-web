import {
  Input
} from './Input';
import {
  Table
} from './Table';

let gid = 0;

export const injection = {
  queryData: async (query, variables) => {
    const rep = await fetch('https://api.saas-plat.com/graphql', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      })
    });
    if (!rep.ok) {
      throw Error(rep.statusText);
    }
    return {
      results: await rep.json(),
      total: rep.headers['X-Total-Count']
    };
  }
}

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

export const queryData = async (query, variables) => {
  return await injection.queryData(query, variables);
}
