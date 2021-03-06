// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
/* eslint-disable import/no-extraneous-dependencies */
// @ts-ignore
import { configure } from 'enzyme';
// @ts-ignore
import Adapter from 'enzyme-adapter-react-16';

import '@testing-library/jest-dom/extend-expect';

configure({ adapter: new Adapter() });
