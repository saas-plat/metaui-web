import moment from 'moment'

export default class DateUtil {

  static getValue(key) {
    switch (key) {
    case 'logindate':
      return this.getDateTime('1').begin;
    case 'today1':
      return this.getDateTime('1').begin;
    case 'today2':
      return this.getDateTime('1').end;
    case 'yesterday1':
      return this.getDateTime('2').begin;
    case 'yesterday2':
      return this.getDateTime('2').end;
    case 'thisweek1':
      return this.getDateTime('4').begin;
    case 'thisweek2':
      return this.getDateTime('4').end;
    case 'thismonth':
    case 'thismonth1':
      return this.getDateTime('7').begin;
    case 'thismonth2':
      return this.getDateTime('7').end;
    case 'premonth1':
      return this.getDateTime('8').begin;
    case 'premonth2':
      return this.getDateTime('8').end;
    case 'thisquarter1':
      return this.getDateTime('9').begin;
    case 'thisquarter2':
      return this.getDateTime('9').end;
    case 'thisyear1':
      return this.getDateTime('10').begin;
    case 'thisyear2':
      return this.getDateTime('10').end;
    case 'lastthreedays1':
      return this.getDateTime('3').begin;
    case 'lastthreedays2':
      return this.getDateTime('3').end;
    case 'lastsevendays1':
      return this.getDateTime('5').begin;
    case 'lastsevendays2':
      return this.getDateTime('5').end;
    case 'lastfourteendays1':
      return this.getDateTime('6').begin;
    case 'lastfourteendays2':
      return this.getDateTime('6').end;
    default:
      return key;
    }
  }

  static getDateTime(count) {
    let now = this.today || new Date(); //当前日期
    let nowDayOfWeek = now.getDay(); //今天本周的第几天
    if (nowDayOfWeek == 0) {
      nowDayOfWeek = 7;
    }
    let nowDay = now.getDate(); //当前日
    let nowMonth = now.getMonth(); //当前月
    let nowYear = now.getYear(); //当前年
    nowYear += (nowYear < 2000) ? 1900 : 0; //
    let fromDate = this.today || new Date(); //当前日期
    let toDate = this.today || new Date(); //当前日期
    let qd = this.getQuarterStartMonth();
    switch (count) {
    case '1': //今天
      fromDate = this.getDate(0, 0);
      toDate = this.getDate(0, 1);
      break;
    case '2': //昨天
      fromDate = this.getDate(-1, 0);
      toDate = this.getDate(-1, 1);
      break;
    case '3': //近三天
      fromDate = this.getDate(-2, 0);
      toDate = this.getDate(0, 1);
      break;
    case '4': //本周
      fromDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
      toDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek), 23, 59, 59);
      break;
    case '5': //近7天
      fromDate = this.getDate(-6, 0);
      toDate = this.getDate(0, 1);
      break;
    case '6': //近14天
      fromDate = this.getDate(-13, 0);
      toDate = this.getDate(0, 1);
      break;
    case '7': //本月
      fromDate = new Date(nowYear, nowMonth, 1);
      toDate = new Date(nowYear, nowMonth + 1, 0, 23, 59, 59);
      break;
    case '8': //上月
      fromDate = new Date(nowYear, nowMonth - 1, 1);
      toDate = new Date(nowYear, nowMonth, 0, 23, 59, 59);
      break;
    case '9': //本季度
      fromDate = new Date(nowYear, qd, 1);
      toDate = new Date(nowYear, qd + 3, 0, 23, 59, 59);
      break;
    case '10': //本年
      fromDate = new Date(nowYear, 0, 1);
      toDate = new Date(nowYear, 12, 0, 23, 59, 59);
      break;
    case '11': //自定义
      fromDate = now;
      toDate = now;
      break;
    case '12': //上年
      fromDate = new Date(nowYear - 1, 0, 1);
      toDate = new Date(nowYear - 1, 12, 0, 23, 59, 59);
      break;
    case '13': //上季度
      fromDate = new Date(nowYear, qd - 3, 1);
      toDate = new Date(nowYear, qd, 0, 23, 59, 59);
      break;
    case '14': //上周
      fromDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1 - 7);
      toDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek) - 7, 23, 59, 59);
      break;
    }
    let ret = {
      'begin': fromDate,
      'end': toDate
    };
    return ret;
  }

  static getDateKey(from, to) {
    if (!from || !to) {
      return '';
    }
    let now = new Date(); //当前日期
    let nowDayOfWeek = now.getDay(); //今天本周的第几天
    if (nowDayOfWeek == 0) {
      nowDayOfWeek = 7;
    }
    let nowDay = now.getDate(); //当前日
    let nowMonth = now.getMonth(); //当前月
    let nowYear = now.getYear(); //当前年
    nowYear += (nowYear < 2000) ? 1900 : 0; //
    let fromDate = moment(from).format('YYYY-MM-DD'); //当前日期
    let toDate = moment(to).format('YYYY-MM-DD'); //当前日期
    //今天
    if (fromDate == moment(this.getDate(0, 0)).format('YYYY-MM-DD') && toDate == moment(this.getDate(0, 1)).format('YYYY-MM-DD')) {
      return 'today';
    }
    //昨天
    if (fromDate == moment(this.getDate(-1, 0)).format('YYYY-MM-DD') &&
      toDate == moment(this.getDate(-1, 1)).format('YYYY-MM-DD')) {
      return 'yesterday';
    }
    //近三天
    if (fromDate == moment(this.getDate(-2, 0)).format('YYYY-MM-DD') &&
      toDate == moment(this.getDate(0, 1)).format('YYYY-MM-DD')) {
      return 'lastthreedays';
    }
    //本周
    if (fromDate == moment(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1)).format('YYYY-MM-DD') &&
      toDate == moment(new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek), 23, 59, 59)).format('YYYY-MM-DD')) {
      return 'thisweek';
    }
    //近7天
    if (fromDate == moment(this.getDate(-6, 0)).format('YYYY-MM-DD') &&
      toDate == moment(this.getDate(0, 1)).format('YYYY-MM-DD')) {
      return 'lastsevendays';
    }
    //近14天
    if (fromDate == moment(this.getDate(-13, 0)).format('YYYY-MM-DD') &&
      toDate == moment(this.getDate(0, 1)).format('YYYY-MM-DD')) {
      return 'lastfourteendays';
    }
    //本月
    if (fromDate == moment(new Date(nowYear, nowMonth, 1)).format('YYYY-MM-DD') &&
      toDate == moment(new Date(nowYear, nowMonth + 1, 0, 23, 59, 59)).format('YYYY-MM-DD')) {
      return 'thismonth';
    }
    //上月
    if (fromDate == moment(new Date(nowYear, nowMonth - 1, 1)).format('YYYY-MM-DD') &&
      toDate == moment(new Date(nowYear, nowMonth, 0, 23, 59, 59)).format('YYYY-MM-DD')) {
      return 'premonth';
    }
    //本季度
    let qd = this.getQuarterStartMonth();
    if (
      fromDate == moment(new Date(nowYear, qd, 1)).format('YYYY-MM-DD') &&
      toDate == moment(new Date(nowYear, qd + 3, 0, 23, 59, 59)).format('YYYY-MM-DD')) {
      return 'thisquarter';
    }
    //本年
    if (fromDate == moment(new Date(nowYear, 0, 1)).format('YYYY-MM-DD') &&
      toDate == moment(new Date(nowYear, 12, 0, 23, 59, 59)).format('YYYY-MM-DD')) {
      return 'thisyear';
    }
    // 上年
    if (fromDate == moment(new Date(nowYear - 1, 0, 1)).format('YYYY-MM-DD') &&
      toDate == moment(new Date(nowYear - 1, 12, 0, 23, 59, 59)).format('YYYY-MM-DD')) {
      return 'preyear';
    }
    //上季度
    let qd2 = this.getQuarterStartMonth();
    if (fromDate == moment(new Date(nowYear, qd2 - 3, 1)).format('YYYY-MM-DD') &&
      toDate == moment(new Date(nowYear, qd2, 0, 23, 59, 59)).format('YYYY-MM-DD')) {
      return 'prequarter';
    }
    //上周
    if (fromDate == moment(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1 - 7)).format('YYYY-MM-DD') &&
      toDate == moment(new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek) - 7, 23, 59, 59)).format('YYYY-MM-DD')) {
      return 'preweek';
    }
    //自定义
    return '';
  }

  static _setToday(today) {
    if (this.today == today) {
      return;
    }
    this.today = today;
    let m = moment(today || new Date());
    this.today = new Date(m.get('year'), m.get('month'), m.get('date'), m.get('hour'), m.get('minute'), m.get('second'));
  }

  static getDate(dayCount, flag) {
    var dd = this.today ? new Date(this.today) : new Date();
    dd.setDate(dd.getDate() + dayCount); //获取dayCount天后的日期
    if (flag === 0) {
      dd.setHours(0, 0, 0);
    } else {
      dd.setHours(23, 59, 59);
    }
    return dd;
  }

  //获得本季度的开端月份
  static getQuarterStartMonth() {
    let nowMonth = (this.today || new Date()).getMonth(); //当前月
    var quarterStartMonth = 0;
    if (nowMonth < 3) {
      quarterStartMonth = 0;
    }
    if (2 < nowMonth && nowMonth < 6) {
      quarterStartMonth = 3;
    }
    if (5 < nowMonth && nowMonth < 9) {
      quarterStartMonth = 6;
    }
    if (nowMonth > 8) {
      quarterStartMonth = 9;
    }
    return quarterStartMonth;
  }

  static isDate(date) {
    date = new Date(date);
    let dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    let result = dateStr.match(/((^((1[8-9]\d{2})|([2-9]\d{3}))(-)(10|12|0?[13578])(-)(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(11|0?[469])(-)(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))(-)(0?2)(-)(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)(-)(0?2)(-)(29)$)|(^([3579][26]00)(-)(0?2)(-)(29)$)|(^([1][89][0][48])(-)(0?2)(-)(29)$)|(^([2-9][0-9][0][48])(-)(0?2)(-)(29)$)|(^([1][89][2468][048])(-)(0?2)(-)(29)$)|(^([2-9][0-9][2468][048])(-)(0?2)(-)(29)$)|(^([1][89][13579][26])(-)(0?2)(-)(29)$)|(^([2-9][0-9][13579][26])(-)(0?2)(-)(29)$))/);
    if (result === null) {
      return false;
    }
    return true;
  }
}
