import { configure } from '@storybook/react';

function loadStories() {

  require('../stories/input.js');
  require('../stories/layout.js');
  require('../stories/display.js');
  require('../stories/demo.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
