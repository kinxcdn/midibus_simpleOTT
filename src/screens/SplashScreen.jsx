import React, {useEffect} from 'react';
import {Image, StyleSheet, SafeAreaView} from 'react-native';
import {storage} from '../constants/storage';

import Orientation from 'react-native-orientation-locker';

const Splash = ({navigation}) => {
  useEffect(() => {
    console.log('[VIEW] Start');

    Orientation.lockToPortrait();

    storage.clearAll(); // TODO TEST!!!

    try {
      const authKey = storage.getString('authKey');

      if (authKey === null || authKey === undefined) {
        setTimeout(() => {
          navigation.navigate('Login');
        }, 3000);
      } else {
        setTimeout(() => {
          navigation.navigate('BottomTabs');
        }, 3000);
      }
    } catch (error) {
      console.error('[ERROR] retrieving authKey', error);
    }
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
