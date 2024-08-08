import React, {useEffect} from 'react';
import {Image, StyleSheet, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Orientation from 'react-native-orientation-locker';

const Splash = ({navigation}) => {
  useEffect(() => {
    console.log('[VIEW] Start');

    Orientation.lockToPortrait();

    AsyncStorage.clear(); // TODO TEST!!!
    AsyncStorage.getItem('authKey', (getAuthKeyError, authKey) => {
      if (typeof getAuthKeyError === 'undefined' || getAuthKeyError === null) {
        if (authKey === null) {
          setTimeout(() => {
            navigation.navigate('Login');
          }, 3000);
        } else {
          setTimeout(() => {
            navigation.navigate('BottomTabs');
          }, 3000);
        }
      } else {
        console.log('[ERROR] getAuthKey');
      }
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/images/logo_midibus.png')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});

export default Splash;
