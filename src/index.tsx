/* tslint:disable no-increment-decrement */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styles/main.scss';

import { App } from './components/App';
// const style = require('./styles/main.scss');

const holders = document.querySelectorAll('.mf-affordability-calculator');
for (let i = 0; i < holders.length; i++) {
  ReactDOM.render(
      <App product="Affordability Calculator" owner="Mortgagefinder.ae" />,
      holders[i],
  );
}
