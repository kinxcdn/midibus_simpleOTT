import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Linking,
  SafeAreaView,
  Platform,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import RNFS from 'react-native-fs';
import Orientation from 'react-native-orientation-locker';

const Settings = ({navigation}) => {
  console.log('[VIEW] Settings');

  Orientation.lockToPortrait();

  const convertHumanbytes = (bytesValue, decimals) => {
    let readableHumanBytes = '';
    if (
      typeof bytesValue === 'undefined' ||
      bytesValue === null ||
      bytesValue === 0
    )
      return '0 bytes';

    const k = 1024,
      dm = decimals || 2,
      sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytesValue) / Math.log(k));

    readableHumanBytes =
      parseFloat((bytesValue / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];

    return readableHumanBytes;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerArea}>
        <Text
          style={{fontSize: 30, color: '#fff', marginTop: 30, marginLeft: 30}}>
          설정
        </Text>
      </View>
      {/* contents : vertical scroll */}
      <ScrollView style={styles.contentsArea}>
        <View style={styles.settingsMenu}>
          <View
            style={{
              height: 40,
              alignSelf: 'flex-start',
            }}>
            <Text style={styles.settingsMenuName}>버전정보</Text>
          </View>
          <View
            style={{
              height: 40,
              alignSelf: 'flex-end',
              marginTop: -40,
            }}>
            <Text style={styles.version}>0.0.1</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (Platform.OS === 'android') {
              Alert.alert(
                '약관 원문 보기',
                null,
                [
                  {
                    text: '취소',
                    onPress: () => {},
                    style: 'cancel',
                  },
                  {
                    text: '개인정보처리 방침',
                    onPress: () => {
                      Linking.openURL(
                        'https://www.kinx.net/agreements/agreements-3/policy01/',
                      );
                    },
                    style: 'default',
                  },

                  {
                    text: 'KINX CDN(미디버스) 서비스 이용약관',
                    onPress: () => {
                      Linking.openURL(
                        'https://www.kinx.net/agreements/agreements/agreement03/',
                      );
                    },
                    style: (() => {
                      if (Platform.OS === 'android') {
                        return 'plain-text';
                      }
                      return 'default';
                    })(),
                  },
                ],
                {cancelable: true},
              );
            } else {
              Alert.alert(
                '약관 원문 보기',
                null,
                [
                  {
                    text: 'KINX CDN(미디버스) 서비스 이용약관',
                    onPress: () => {
                      Linking.openURL(
                        'https://www.kinx.net/agreements/agreements/agreement03/',
                      );
                    },
                    style: (() => {
                      if (Platform.OS === 'android') {
                        return 'plain-text';
                      }
                      return 'default';
                    })(),
                  },
                  {
                    text: '개인정보처리 방침',
                    onPress: () => {
                      Linking.openURL(
                        'https://www.kinx.net/agreements/agreements-3/policy01/',
                      );
                    },
                    style: 'default',
                  },
                  {
                    text: '취소',
                    onPress: () => {},
                    style: 'cancel',
                  },
                ],
                {cancelable: true},
              );
            }
          }}>
          <View style={styles.settingsMenu}>
            <Text style={styles.settingsMenuName}>약관</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            RNFS.exists(RNFS.CachesDirectoryPath).then(exists => {
              if (exists) {
                console.log('file exists');
                RNFS.readDir(RNFS.CachesDirectoryPath).then(cacheFiles => {
                  if (
                    typeof cacheFiles !== 'undefined' &&
                    cacheFiles !== null &&
                    cacheFiles.length > 0
                  ) {
                    let cacheFileSize = 0;
                    let deletedTargetFiles = [];

                    for (let f = 0; f < cacheFiles.length; f++) {
                      cacheFileSize += cacheFiles[f].size * 1;
                      deletedTargetFiles.push(cacheFiles[f].path);
                    }

                    Alert.alert(
                      '저장된 캐시 데이터 삭제',
                      '캐시에 임시 저장된 데이터(' +
                        convertHumanbytes(cacheFileSize) +
                        ')를 삭제합니다.',
                      [
                        {
                          text: '취소',
                          onPress: () => console.log('캐시 삭제 취소'),
                          style: 'cancel',
                        },
                        {
                          text: '삭제',
                          onPress: () => {
                            console.log('캐시 삭제 수행');

                            for (
                              let f = 0;
                              f < deletedTargetFiles.length;
                              f++
                            ) {
                              RNFS.unlink(deletedTargetFiles[f])
                                .then(() => {
                                  console.log(
                                    deletedTargetFiles[f] + ' DELETED',
                                  );
                                })
                                .catch(err => {
                                  console.log(err.message);
                                });
                            }
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                  } else {
                    console.log('cache directory is empty');

                    Alert.alert(
                      '저장된 캐시 데이터 삭제',
                      '캐시에 임시 저장된 데이터(0 bytes)를 삭제합니다.',
                      [
                        {
                          text: '취소',
                          onPress: () => console.log('캐시 삭제 취소'),
                          style: 'cancel',
                        },
                        {
                          text: '삭제',
                          onPress: () => {
                            console.log('0 bytes 캐시 삭제 수행');
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                  }
                });
              } else {
                console.log('file doesnt exists');

                Alert.alert(
                  '저장된 캐시 데이터 삭제',
                  '캐시에 임시 저장된 데이터(0 bytes)를 삭제합니다.',
                  [
                    {
                      text: '취소',
                      onPress: () => console.log('캐시 삭제 취소'),
                      style: 'cancel',
                    },
                    {
                      text: '삭제',
                      onPress: () => {
                        console.log('0 bytes 캐시 삭제 수행');
                      },
                    },
                  ],
                  {cancelable: false},
                );
              }
            });
          }}>
          <View style={styles.settingsMenu}>
            <Text style={styles.settingsMenuName}>저장된 캐시 데이터 삭제</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              '로그아웃',
              '정말 로그아웃 하시겠어요?',
              [
                {
                  text: '취소',
                  onPress: () => console.log('로그아웃 취소'),
                  style: 'cancel',
                },
                {
                  text: '로그아웃',
                  onPress: () => {
                    console.log('로그아웃');
                    AsyncStorage.clear();
                    navigation.navigate('Login');
                  },
                },
              ],
              {cancelable: false},
            );
          }}>
          <View style={styles.settingsMenu}>
            <Text style={styles.settingsMenuName}>로그아웃</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
  },
  headerArea: {
    width: '100%',
    height: 100,
  },
  contentsArea: {
    width: '100%',
    flex: 1,
    marginTop: 20,
  },
  settingsMenu: {
    backgroundColor: '#2e2e2e',
    height: 40,
    marginBottom: 1,
    flex: 1,
  },
  settingsMenuName: {
    color: '#fff',
    fontSize: 18,
    lineHeight: Platform.OS === 'android' ? 40 : 50,
    paddingLeft: 30,
    textAlign: 'left',
  },
  version: {
    color: '#fff',
    fontSize: 16,
    lineHeight: Platform.OS === 'android' ? 40 : 50,
    paddingRight: 30,
    textAlign: 'right',
  },
});

export default Settings;
