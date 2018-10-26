import * as vmcontroller from './viewModel';
import * as vouchercontroller from './voucher';
import * as listcontroller from './voucherList';
import * as optioncontroller from './option';
import * as printcontroller from './print';
import * as util from './util';

export default {
  map: async (ctx, {
    obj,
    mapping
  }) => {
    util.map(obj, mapping);
  },
  ...vmcontroller,
  ...vouchercontroller,
  ...listcontroller,
  ...optioncontroller,
  ...printcontroller,
};
