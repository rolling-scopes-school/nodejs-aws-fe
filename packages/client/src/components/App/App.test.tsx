import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import App from 'components/App/App';

test('renders correctly', () => {
  const wrapper = createShallow()(<App />);
  expect(wrapper).toMatchSnapshot();
});
