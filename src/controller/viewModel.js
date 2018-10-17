import log from '../log';
import {
  map
} from './util';

export const setValue = async ({
  viewModel
}, {
  target,
  value,
  name
}) => {
  if (target && viewModel) {
    const setField = target.setValue || target.value;
    if (setField) {
      const data = {};
      data[setField] = value || await map(value, target.mapping);
      await viewModel.setValue(data);
    } else {
      log('setValue field not found, skip setValue');
    }
  } else {
    setField({
      viewModel,
      name,
      value
    });
  }
}

export const changeState = async ({
  viewModel
}, {
  state
}) => {
  if (viewModel && viewModel.hasOwnProperty('state')) {
    await viewModel.setValue({
      state
    });
  }
}

export const setField = async ({
  viewModel
}, {
  name,
  value
}) => {
  if (viewModel && viewModel.hasOwnProperty(name)) {
    await viewModel.setValue({
      [name]: value
    });
  }
}
