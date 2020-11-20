import * as React from 'react'

import { Text, TextProps } from './Themed'
import { ReactElement } from 'react'

export function MonoText (props: TextProps): ReactElement {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
}
