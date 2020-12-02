import React, { useState, useEffect, ReactElement } from 'react'
import {FlatList, Image, Linking, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native'
import { AdMobBanner} from "expo-ads-admob";
import Constants from 'expo-constants';
import Colors from '../constants/Colors'
import { Text, TextInput, View } from './Themed'
import {EmailApiResult, TextInputReturnedText} from '../types'
import ViewMoreText from "react-native-view-more-text";
import {removeATags, renderViewLess, renderViewMore} from "../utils/format";
import useColorScheme from "../hooks/useColorScheme";

export default function CheckEmail (): ReactElement {
  const [emailAddress, setEmailAddress] = useState('')
  const [results, setResults] = useState([])
  const colorScheme = useColorScheme()
  const testID = 'ca-app-pub-3940256099942544/6300978111';
  const productionId = 'ca-app-pub-3756584357781172/6027051832';
  // Is a real device and running in production.
  const adUnitID = Constants.isDevice && !__DEV__ ? productionId : testID;

  useEffect(() => {
    if (emailAddress === '') {
      return
    }
    fetch(
        `https://haveibeenpwned.com/api/v3/breachedaccount/${emailAddress}?truncateResponse=false`,
        {
          method: 'GET',
          headers: new Headers({
            Accept: 'application/json',
            'hibp-api-key': 'dd439240c4e94b429eb478e497897c64'
          })
        }
    )
      .then(res => {
        if (res.status === 200) {
          return res.json()
        } else {
          return null
        }
      })
      .then(response => {
        setResults(response)
      })
      .catch(error => console.log(error))
  }, [emailAddress])

  const renderItem = ({ item }: EmailApiResult): ReactElement => (
    <View style={{ ...styles.emailResult, backgroundColor: Colors[colorScheme].resultTile }}>
      <View style={{ ...styles.resultTitle, backgroundColor: Colors[colorScheme].resultTile }}>
        <TouchableHighlight onPress={() => Linking.openURL(`http://${item.Domain}`)} >
          <Image
            style={{ ...styles.breachLogo, backgroundColor: Colors[colorScheme].resultTile }}
            source={{ uri: item.LogoPath}}
            resizeMode='contain'
          />
        </TouchableHighlight>
        <Text
          style={{ ...styles.resultTitle, backgroundColor: Colors[colorScheme].resultTile }}
          onPress={() => Linking.openURL(`http://${item.Domain}`)}
        >
          {item.Name}
        </Text>
      </View>
      <ViewMoreText
        numberOfLines={3}
        renderViewMore={renderViewMore}
        renderViewLess={renderViewLess}
        textStyle={styles.resultText}
      >
        <Text
          style={styles.resultText}
          lightColor='rgba(0,0,0,0.8)'
          darkColor='rgba(255,255,255,0.8)'
        >
          {removeATags(item.Description)}
        </Text>
      </ViewMoreText>
    </View>
  )

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor='rgba(0,0,0,0.8)'
          darkColor='rgba(255,255,255,0.8)'
        >
          Has your email address been compromised? Find out!
        </Text>
      </View>
      <View style={styles.helpContainer}>
        <TouchableOpacity>
          <TextInput
            style={styles.emailEntryText}
            lightColor={Colors.light.tint}
            darkColor={Colors.dark.tint}
            onSubmitEditing={(value: TextInputReturnedText) => {
              setEmailAddress(value.nativeEvent.text)
            }}
            autoCapitalize='none'
            autoCompleteType='email'
            autoCorrect={false}
            keyboardType='email-address'
            placeholder='Email address'
            placeholderTextColor='gray'

          />
        </TouchableOpacity>
      </View>
      {!results && (
        <View style={{ ...styles.noResultTitle }}>
          <Text style={{ fontSize: 20, color: 'darkgreen' }}>
            Your email is safe!
          </Text>
        </View>
      )}
      {results && (
        <FlatList
          style={{ marginTop: 30, marginBottom: 5}}
          data={results}
          renderItem={renderItem}
          keyExtractor={item => item.Name}
        />
      )}

        <AdMobBanner
          bannerSize="smartBannerPortrait"
          adUnitID={adUnitID}
          servePersonalizedAds />
    </View>
  )
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center'
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center'
  },
  emailEntryText: {
    textAlign: 'center',
    width: 250,
    borderColor: 'gray',
    borderBottomWidth: 1.5,
    height: 60
  },
  emailResult: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    borderRadius: 10
  },
  breachLogo: {
    width: 70,
    height: 70,
    marginTop: 5,
    marginRight: 20,
    backgroundColor: 'gray'
  },
  resultTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    fontSize: 20
  },
  noResultTitle: {
    margin: 100,
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 60,
  },
  resultText: {
    fontSize: 16,
    lineHeight: 24,
    padding: 10
  },
  link: {
    backgroundColor: 'gray',
    color: 'blue',
    textDecorationColor: 'blue',
    textDecorationLine: 'underline'
  }
})
