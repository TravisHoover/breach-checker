import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { Text, TextInput, View } from './Themed';

export default function CheckEmail({ path }: { path: string }) {
  const [emailAddress, setEmailAddress] = useState('');
  const [results, setResults] = useState(null);

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
        .then(res => res.json())
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
        <TouchableOpacity style={styles.helpLink}>
          <TextInput
              style={styles.helpLinkText}
              lightColor={Colors.light.tint}
              onChangeText={(value: string) => {
                setEmailAddress(value)
              }}
          />
        </TouchableOpacity>
      </View>

      <View>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          {results ? JSON.stringify(results) : null}
        </Text>
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
  },
});
