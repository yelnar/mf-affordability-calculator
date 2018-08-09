import * as React from 'react';
import * as Enzyme from 'enzyme';

import * as Adapter from 'enzyme-adapter-react-16';

import { Wow } from './Wow';

Enzyme.configure({ adapter: new Adapter() });
it('shallow renders without crashing', () => {
  Enzyme.shallow(<Wow />);
});
