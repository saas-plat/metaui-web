import ViewModel from './viewmodel'; 
import Form from './components/Form';
import CardForm from './components/CardForm';
import Toolbar from './components/Toolbar';
import ListGroup from './components/ListGroup';
import TreeTable from './components/TreeTable';
import Chart from './components/Chart';

import {
  Input
} from './Input';
import {
  Form,
  Voucher
} from './Form';
import {
  Tree,
  Table
} from './FormList';
import {
  Chart
} from './Chart';
import {
  ListGroup
} from './Option';
import {
  Toolbar
} from './Toolbar';


ViewStore.register({
  // common
  'toolbar': Toolbar,
  //  input
  'text': Input,
  'textbox': Input,
  'input': Input,
  'textarea': Input,
  'number': Input,
  'check': Input,
  'checkbox': Input,
  'switch': Input,
  'date': Input,
  'datetime': Input,
  'month': Input,
  'daterange': Input,
  'week': Input,
  'time': Input,
  'select': Input,
  'listselect': Input,
  'treeselect': Input,
  'refselect': Input,
  'treetableselect': Input,
  'inputtable': Input,
  //'editabletable': Table,

  // form
  'form': Form,
  'cardform': Voucher,
  'voucher': Voucher,
  'listgroup': ListGroup,

  // display
  'treetable': Tree,
  'table': Table,
  'chart': Chart
});
