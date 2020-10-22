import { cleanup, screen, render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer'
import User from './User';

afterEach(cleanup)

const defaultData = {
  firstName: 'k',
  lastName: 's',
  address: 'calle 66',
  city: 'medellin'
}

const UserCompo = <User {...defaultData} />

test('matches snapshop', () => {
  const comp = renderer.create(UserCompo);
  let tree = comp.toJSON()
  expect(tree).toMatchSnapshot()

});

test('renders correct info', () => {
  render(UserCompo)
  expect(screen.getByText(defaultData.city, { exact: false })).toBeInTheDocument()
  expect(screen.getByText(defaultData.address, { exact: false })).toBeInTheDocument()
})
