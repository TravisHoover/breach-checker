import * as React from 'react'
import renderer from 'react-test-renderer'

import CheckPassword from '../CheckPassword';

it('renders correctly', () => { // eslint-disable-line
  const tree = renderer.create(<CheckPassword />).toJSON()

  expect(tree).toMatchSnapshot() // eslint-disable-line
})
