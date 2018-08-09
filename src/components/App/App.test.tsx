import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import { App } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<App compiler="TypeScript" framework="React" />, div);
  unmountComponentAtNode(div);
});
