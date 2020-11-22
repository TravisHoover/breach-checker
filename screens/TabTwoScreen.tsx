import * as React from 'react'
import { StyleSheet } from 'react-native'

import CheckPassword from '../components/CheckPassword'
import { Text, View } from '../components/Themed'
import { ReactElement } from 'react'

export default function TabTwoScreen (): ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password Scan</Text>
      <View style={styles.separator} lightColor='#eee' darkColor='rgba(255,255,255,0.1)' />
      <CheckPassword />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 15,
    height: 1,
    width: '80%'
  }
})
