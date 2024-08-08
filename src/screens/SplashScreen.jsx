import React, {useEffect} from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Orientation from 'react-native-orientation-locker';

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #000;
`;

const Start = ({navigation}) => {
  useEffect(() => {
    console.log('[VIEW] Start');

    Orientation.lockToPortrait();

    AsyncStorage.clear(); // TODO TEST!!!
    AsyncStorage.getItem('authKey', (getAuthKeyError, authKey) => {
      if (typeof getAuthKeyError === 'undefined' || gretAuthKeyError === null) {
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
  });

  return (
    <Container>
      <Image source={require('../assets/images/logo_midibus.png')} />
    </Container>
  );
};

export default Start;
