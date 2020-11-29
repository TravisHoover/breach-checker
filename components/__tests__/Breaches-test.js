import * as React from 'react'
import renderer from 'react-test-renderer'

import Breaches from '../Breaches';

it('renders correctly', () => { // eslint-disable-line
  const tree = renderer.create(<Breaches />).toJSON()

  expect(tree).toMatchSnapshot() // eslint-disable-line
})
