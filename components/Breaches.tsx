import React, { useState, useEffect, ReactElement } from 'react'
import {FlatList, Image, Linking, StyleSheet, TouchableHighlight} from 'react-native'
import ViewMoreText from 'react-native-view-more-text';
import { AdMobBanner} from "expo-ads-admob";
import Constants from 'expo-constants';
import Colors from '../constants/Colors'
import { Text, View } from './Themed'
import { EmailApiResult } from '../types'
import useColorScheme from "../hooks/useColorScheme";

export default function Breaches (): ReactElement {
  const [results, setResults] = useState([])
  const colorScheme = useColorScheme()
  const testID = 'ca-app-pub-3940256099942544/6300978111';
  const productionId = 'ca-app-pub-3756584357781172/6027051832';
  // Is a real device and running in production.
  const adUnitID = Constants.isDevice && !__DEV__ ? productionId : testID;

  // @ts-ignore
  useEffect(async () => {
    const reply = await fetch(
      `https://haveibeenpwned.com/api/v3/breaches`,
      {
        method: 'GET',
      }
    )
    const parsedReply = await reply.json();
    setResults(parsedReply);
  }, [])

  const removeATags = (text: string): string => {
    return text.replace(/<a.*?>/g, "").replace(/<\/a>/g, "");
  }

  const renderViewMore = (onPress: any) => {
    return(
      <Text style={{ textAlign: 'center', color: 'darkblue' }} onPress={onPress}>View more</Text>
    )
  }
  const renderViewLess = (onPress: any) => {
    return(
      <Text style={{ textAlign: 'center', color: 'darkblue' }} onPress={onPress}>View less</Text>
    )
  }

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
      <FlatList
        style={{ marginTop: 30, marginBottom: 5}}
        data={results}
        renderItem={renderItem}
        keyExtractor={item => item.Name}
      />
      <View style={{ alignSelf: 'center'}}>
        <AdMobBanner
          bannerSize="banner"
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
