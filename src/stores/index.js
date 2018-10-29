import Option from './Option';
import Voucher from './Voucher';
import VoucherList from './VoucherList';
import TemplateEngine from './Template';

export const templateEngine = new TemplateEngine();

export const optionStore = new Option();
export const voucherStore = new Voucher();
export const voucherListStore = new VoucherList();
