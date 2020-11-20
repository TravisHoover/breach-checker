import React, { useState, useEffect } from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../constants/Colors';
import { Text, TextInput, View } from './Themed';
import { EmailApiResult, TextInputReturnedText } from '../types';

export default function CheckEmail({ path }: { path: string }) {
  const [emailAddress, setEmailAddress] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!emailAddress) {
      return;
    }
    fetch(
        `https://haveibeenpwned.com/api/v3/breachedaccount/${emailAddress}`,
        {
          method: "GET",
          headers: new Headers({
            Accept: "application/json",
            "hibp-api-key": "dd439240c4e94b429eb478e497897c64",
          })
        }
    )
        .then(res => {
          if (res.status === 200) {
            return res.json()
          } else {
           return [{
             Name: 'Your email is safe!'
           }];
          }
        })
        .then(response => {
          setResults(response);
        })
        .catch(error => console.log(error));
  }, [emailAddress]);

  const renderItem = ({ item }: EmailApiResult) => (
      <View style={styles.emailResult}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          {item.Name}
        </Text>
      </View>
  );

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Has your email address been compromised? Find out!
        </Text>
      </View>
      <View style={styles.helpContainer}>
        <TouchableOpacity>
          <TextInput
              style={styles.helpLinkText}
              lightColor={Colors.light.tint}
              darkColor={Colors.dark.tint}
              onSubmitEditing={(value: TextInputReturnedText) => {
                setEmailAddress(value.nativeEvent.text)
              }}
              autoCapitalize={"none"}
              autoCompleteType={"email"}
              autoCorrect={false}
              keyboardType={"email-address"}
              placeholder={"Email address"}
          />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={item => item.Name}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLinkText: {
    textAlign: 'center',
    width: 250,
    borderColor: 'black',
    borderBottomWidth: 1.5,
  },
  emailResult: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  }
});
