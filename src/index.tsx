import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './components/App';

import { sum } from './foo';

ReactDOM.render(
    <App compiler="TypeScript" framework="React" />,
    document.getElementById('example'),
);

console.log(sum(1, 2, 3));
