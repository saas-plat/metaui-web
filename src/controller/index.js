import * as uicontroller from './ui';
import * as vmcontroller from './viewModel';
import * as vouchercontroller from './voucher';
import * as listcontroller from './voucherList';
import * as optioncontroller from './option';
import * as printcontroller from './print';
import * as basecontroller from './base';
import * as socketcontroller from './socket';
import * as routercontroller from './router';
import * as usercontroller from './user';
import * as orgcontroller from './org';
import * as datacontroller from './data';
import * as feedbackcontroller from './feedback';
import * as chatcontroller from './chat';
import * as othercontroller from './other';
import * as util from './util';

import log, {
  warn
} from '../log';

// 这里的actions是view可以配置的action
export const actions = {
  map: async (ctx, {
    obj,
    mapping
  }) => {
    util.map(obj, mapping);
  },
  ...chatcontroller,
  ...feedbackcontroller,
  ...othercontroller,
  ...routercontroller,
  ...orgcontroller,
  ...usercontroller,
  ...basecontroller,
  ...vmcontroller,
  ...uicontroller,
  ...socketcontroller,
  ...datacontroller,
  ...vouchercontroller,
  ...listcontroller,
  ...optioncontroller,
  ...printcontroller,
};

export const executeAction = ({
  name,
  args
}, ctx) => {
  const handler = actions[name];
  if (handler) {
    log('execute action', name, args || {});
    return handler(ctx || {}, args || {});
  } else {
    warn('nothing action to execute!');
  }
}
