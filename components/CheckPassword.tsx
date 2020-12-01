import React, { useState, useEffect, ReactElement } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import sha1 from 'sha1'
import Colors from '../constants/Colors'
import { Text, TextInput, View } from './Themed'
import { AdMobBanner} from "expo-ads-admob";
import Constants from 'expo-constants';

export default function CheckPassword (): ReactElement {
  const [password, setPassword] = useState('')
  const [results, setResults] = useState('')
  const testID = 'ca-app-pub-3940256099942544/6300978111';
  const productionId = 'ca-app-pub-3756584357781172/6027051832';
  // Is a real device and running in production.
  const adUnitID = Constants.isDevice && !__DEV__ ? productionId : testID;

  useEffect(() => {
    if (password === '') {
      return
    }
    const hashedPassword: string = sha1(password)
    const hashRange: string = hashedPassword.slice(0, 5)
    const restOfHash: string = hashedPassword.toUpperCase().slice(5)
    const hashRangeRegEx: RegExp = new RegExp(`${restOfHash}:.*`, 'g')
    fetch(`https://api.pwnedpasswords.com/range/${hashRange}`)
      .then(response => response.text()) // eslint-disable-line
      .then(data => {
        const hit = data.match(hashRangeRegEx)
        if (hit === null) {
          setResults(
            // @ts-ignore
            <Text style={{ color: 'green' }}>
            Not in any known data breaches
            </Text>
          )
        } else {
          const count = hit[0].split(':')[1]
          setResults(
            // @ts-ignore
            <Text style={{ color: 'red' }}>
            This password has been found in {count} breaches!
            </Text>
          )
        }
      })
      .catch(error => console.error(error))
  }, [password])

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor='rgba(0,0,0,0.8)'
          darkColor='rgba(255,255,255,0.8)'
        >
          Has your password been compromised? Find out!
        </Text>
      </View>

      <View style={styles.helpContainer}>
        <TouchableOpacity>
          <TextInput
            style={styles.helpLinkText}
            lightColor={Colors.light.tint}
            onChangeText={(value: string) => {
              setPassword(value)
            }}
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='Password'
            placeholderTextColor='gray'
          />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <Text
          style={styles.resultsText}
          lightColor='rgba(0,0,0,0.8)'
          darkColor='rgba(255,255,255,0.8)'
        >
          {results}
        </Text>
      </View>
      <View>
        <Text style={{ textAlign: 'center', marginBottom: 75 }}>
          Breach Checker will never store or transmit passwords.
          A process called k-anonymity is used to keep your data safe.
        </Text>
        <AdMobBanner
          bannerSize="smartBannerPortrait"
          adUnitID={adUnitID}
          servePersonalizedAds />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50
  },
  resultsText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 10,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center'
  },
  helpContainer: {
    marginTop: 15,
    marginBottom: 20,
    marginHorizontal: 20,
    alignItems: 'center'
  },
  helpLinkText: {
    textAlign: 'center',
    width: 250,
    height: 60,
    borderColor: 'gray',
    borderBottomWidth: 1.5
  }
})
