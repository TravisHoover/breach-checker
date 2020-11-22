import * as React from 'react'
import { StyleSheet } from 'react-native'

import CheckEmail from '../components/CheckEmail'
import { Text, View } from '../components/Themed'
import { ReactElement } from 'react'

export default function TabOneScreen (): ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email Scan</Text>
      <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
      <CheckEmail />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
})
