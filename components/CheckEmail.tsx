import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

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
    const results = () => fetch(
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

    let debouncer = setTimeout(() => {
      results();
    }, 1500);
    return () => {
      clearTimeout(debouncer);
    }
  }, [emailAddress]);

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
        {results.map((result: EmailApiResult, index) => {
          return (
              <View key={index}>
                <Text
                    style={styles.getStartedText}
                    lightColor="rgba(0,0,0,0.8)"
                    darkColor="rgba(255,255,255,0.8)"
                >
                  {result.Name}
                </Text>
              </View>
          )
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
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
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
    width: 250,
    borderColor: 'black',
    borderBottomWidth: 1.5,
  },
});
