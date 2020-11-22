import * as React from 'react'
import { StyleSheet } from 'react-native'

import CheckEmail from '../components/CheckEmail'
import { Text, View } from '../components/Themed'
import { ReactElement } from 'react'
import Colors from "../constants/Colors";

export default function TabOneScreen (): ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email Scan</Text>
      <View style={styles.separator} lightColor={Colors.light.background} darkColor={Colors.dark.background} />
      <CheckEmail />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%'
  }
})
