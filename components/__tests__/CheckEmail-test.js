import * as React from 'react'
import renderer from 'react-test-renderer'

import CheckEmail from '../CheckEmail';

it('renders correctly', () => { // eslint-disable-line
  const tree = renderer.create(<CheckEmail />).toJSON()

  expect(tree).toMatchSnapshot() // eslint-disable-line
})
