import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import * as config from '../constants/properties';
import {authAxios} from '../apis/axios';
import axios from 'axios';
import PlayTopNCards from '../components/PlayTopNCards';
import HorizontalScrollCards from '../components/HorizontalScrollCards';
import MediaCards from '../components/MediaCards';

const Home = props => {
  const [playTopNMediaList, setPlayTopNMediaList] = useState([]);
  const [currentUploadedMediaList, setCurrentUploadedMediaList] = useState([]);
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    console.log('[VIEW] Home');

    Orientation.lockToPortrait();

    // 최근 일주일 동안 가장 많이 재생된 비디오
    getPlayTopNMedia();

    // 최신 업로드 미디어 리스트
    getCurrentUploadedMedia();

    // 전체 태그 리스트
    getAllTags();
  }, []);

  /*
   * 최근 일주일동안 가장 많이 재생된 비디오
   */
  const getPlayTopNMedia = async () => {
    console.log('>> getPlayTopNMedia');

    let _playTopNMediaList = [];
    let _7daysBeforeObj = new Date(
      new Date().getTime() - 7 * 24 * 60 * 60 * 1000,
    );
    let _7daysBefore =
      _7daysBeforeObj.getFullYear() +
      '' +
      (_7daysBeforeObj.getMonth() + 1 < 10
        ? '0' + (_7daysBeforeObj.getMonth() + 1)
        : '' + (_7daysBeforeObj.getMonth() + 1)) +
      '' +
      (_7daysBeforeObj.getDate() < 10
        ? '0' + _7daysBeforeObj.getDate()
        : '' + _7daysBeforeObj.getDate());

    try {
      const response = await axios.get(
        `${config.MIDIBUS_PLAY_API}/play/log/object?contentIds=${config.CHANNEL}&from=${_7daysBefore}000000&to=20500331235959&amount=5&dataIndex=0`,
      );

      const objectList = response.data;

      if (
        typeof objectList !== 'undefined' &&
        objectList !== null &&
        objectList.length > 0
      ) {
        for (let o = 0; o < objectList.length; o++) {
          const objectId = objectList[o].objectId;

          try {
            const response = await authAxios.get(
              `${config.MIDIBUS_API}/v2/channel/${config.CHANNEL}/${objectId}`,
            );

            const objectInfo = response.data;

            if (objectInfo && objectInfo.length !== 0) {
              _playTopNMediaList.push(objectInfo);
            }
          } catch (error) {
            console.error('Error fetching object info:', error);
            // 필요한 경우 추가 에러 처리 로직
          }
        }

        setPlayTopNMediaList(_playTopNMediaList);
      }
    } catch (error) {
      console.error('Error fetching play log:', error);
      // 필요한 경우 추가 에러 처리 로직
    }
  };

  /*
   * 최신 업로드 미디어 리스트
   */
  const getCurrentUploadedMedia = async () => {
    console.log('>> getCurrentUploadedMedia');

    try {
      const response = await authAxios.get(
        `/v2/channel/${config.CHANNEL}?limit=5`,
      );

      const _objectList = response.data;

      if (
        _objectList &&
        _objectList.object_list &&
        _objectList.object_list.length > 0
      ) {
        setCurrentUploadedMediaList(_objectList.object_list);
      } else {
        // 필요한 경우 추가 처리 로직
      }
    } catch (error) {
      console.error('Error fetching current uploaded media:', error);
      // 필요한 경우 추가 에러 처리 로직
    }
  };

  /*
   * 전체 태그 리스트
   */
  const getAllTags = async () => {
    console.log('>> getAllTags');
    console.log(config.CHANNEL);

    try {
      const response = await authAxios.get(`/v2/channel/${config.CHANNEL}/tag`);

      const _tagList = response.data;

      if (typeof _tagList !== 'undefined' && _tagList !== null) {
        if (
          typeof _tagList.tag_list !== 'undefined' &&
          _tagList.tag_list !== null &&
          _tagList.tag_list.length > 0
        ) {
          setTagList(_tagList.tag_list);
        } else {
          //
        }
      } else {
        //
      }
    } catch (error) {
      console.error('Error fetching tag list:', error);
      // 에러 처리 로직 추가 (필요 시)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerArea}>
        <Image
          source={require('../assets/images/logo_midibus.png')}
          style={styles.logoImage}
        />
        <View style={styles.iconContainer}>
          <Icon name="person-circle-outline" size={35} color={'#ffffff'} />
        </View>
      </View>
      {/* contents : vertical scroll */}
      <ScrollView style={styles.contentsArea}>
        <View style={styles.playTopNArea}>
          <Text style={styles.subTitle}>최근 일주일 동안</Text>
          <Text style={styles.mainTitle}>가장 많이 재생된 Top5</Text>
          <PlayTopNCards
            data={playTopNMediaList}
            channelId={config.CHANNEL}
            navigation={props.navigation}
          />
        </View>
        <View style={styles.currentArea}>
          <Text style={styles.sectionTitle}>최신 업로드</Text>
          <HorizontalScrollCards
            data={currentUploadedMediaList}
            channelId={config.CHANNEL}
            navigation={props.navigation}
          />
        </View>
        <View style={styles.tagListArea}>
          {tagList.map((tagName, tagIdx) => (
            <View key={tagIdx} style={styles.byTagArea}>
              <View style={styles.titleContainer}>
                <Text style={styles.sectionTitle}># {tagName}</Text>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('MediaList', {
                      categorized: 'tag',
                      categorizedId: tagName,
                      headerTitle: '#' + tagName,
                    });
                  }}>
                  <Text style={styles.viewMoreText}>더보기</Text>
                </TouchableOpacity>
              </View>
              <MediaCards
                categorized="tag"
                categorizedId={tagName}
                navigation={props.navigation}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      {/* // contents : vertical scroll */}
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
    height: 70,
  },
  logoImage: {
    marginTop: 20,
    marginLeft: 15,
  },
  iconContainer: {
    alignItems: 'flex-end',
    marginRight: 20,
    marginTop: -30,
  },
  contentsArea: {
    width: '100%',
    flex: 1,
  },
  playTopNArea: {
    width: '100%',
    height: ((Dimensions.get('window').width - 30) * 9) / 16 + 60 + 80,
    marginBottom: 10,
    marginTop: 10,
  },
  currentArea: {
    width: '100%',
    height: ((Dimensions.get('window').width - 30) * 9) / 16 + 60 + 80,
    marginTop: 10,
  },
  tagListArea: {
    width: '100%',
    flex: 1,
  },
  byTagArea: {
    width: '100%',
    height: 175,
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  mainTitle: {
    color: '#ffffff',
    marginLeft: 10,
    fontWeight: '800',
    fontSize: 32,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  subTitle: {
    // fontFamily: 'NotoSansKR-Black',
    color: '#B3B3B3',
    marginLeft: 10,
    fontSize: 18,
    textAlign: 'left',
    fontWeight: '600',
  },
  sectionTitle: {
    color: '#ffffff',
    marginLeft: 10,
    fontWeight: '800',
    fontSize: 26,
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  viewMoreText: {
    fontSize: 16,
    color: '#898989',
    textAlign: 'right',
    marginRight: 10,
  },
});

export default Home;
