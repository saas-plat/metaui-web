import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/common.js');
  require('../stories/input.js');
  require('../stories/form.js');
  require('../stories/display.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
