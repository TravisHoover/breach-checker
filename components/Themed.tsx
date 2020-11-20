import * as React from 'react'
import { Text as DefaultText, View as DefaultView, TextInput as DefaultTextInput } from 'react-native'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import { ReactElement } from 'react'

export function useThemeColor (
  props: { light?: string, dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
): Object {
  const theme = useColorScheme()
  const colorFromProps = props[theme]

  if (colorFromProps) { // eslint-disable-line
    return colorFromProps
  } else {
    return Colors[theme][colorName]
  }
}

interface ThemeProps {
  lightColor?: string
  darkColor?: string
}

export type TextProps = ThemeProps & DefaultText['props']
export type ViewProps = ThemeProps & DefaultView['props']
export type TextInputProps = ThemeProps & DefaultTextInput['props']

export function Text (props: TextProps): ReactElement {
  const { style, lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  // @ts-expect-error
  return <DefaultText style={[{ color }, style]} {...otherProps} />
}

export function View (props: ViewProps): ReactElement {
  const { style, lightColor, darkColor, ...otherProps } = props
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')

  // @ts-expect-error
  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}

export function TextInput (props: TextInputProps): ReactElement {
  const { style, lightColor, darkColor, ...otherProps } = props
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  // @ts-expect-error
  return <DefaultTextInput style={[{ color }, style]} {...otherProps} />
}
