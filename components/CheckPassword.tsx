import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import sha1 from 'sha1';
import Colors from '../constants/Colors';
import { Text, TextInput, View } from './Themed';

export default function CheckPassword({ path }: { path: string }) {
  const [password, setPassword] = useState('');
  const [results, setResults] = useState('');

  useEffect(() => {
    if (!password) {
      return;
    }
    const hashedPassword: string = sha1(password);
    const results = () => fetch(
        `https://api.pwnedpasswords.com/range/${hashedPassword.slice(0,5)}`
    ).then(response => response.text())
        // @ts-ignore
        .then(data => setResults(data))
        .catch(error => console.log(error));

    let debouncer = setTimeout(() => {
      results();
    }, 1500);
    return () => {
      clearTimeout(debouncer);
    }
  }, [password]);


  const re1 = new RegExp(`${sha1(password).toUpperCase()}:.`,"g");
  return (
      <View>
        <View style={styles.getStartedContainer}>
          <Text
              style={styles.getStartedText}
              lightColor="rgba(0,0,0,0.8)"
              darkColor="rgba(255,255,255,0.8)">
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
            />
          </TouchableOpacity>
        </View>

        <View>
          <Text
              style={styles.getStartedText}
              lightColor="rgba(0,0,0,0.8)"
              darkColor="rgba(255,255,255,0.8)">
            {results ? results.match(re1) : null}
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
    width: 250,
    borderColor: 'black',
    borderBottomWidth: 1.5,
  },
});
