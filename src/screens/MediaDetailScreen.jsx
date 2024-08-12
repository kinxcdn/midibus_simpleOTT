import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Orientation from 'react-native-orientation-locker';
import JWPlayer from '@jwplayer/jwplayer-react-native';
import * as config from '../constants/properties';
import {authAxios} from '../apis/axios';
import axios from 'axios';
import {removeFileExtension} from '../constants/removeFileExtension';

const MediaDetail = props => {
  const [channelId, setChannelId] = useState(null);
  const [mediaObj, setMediaObj] = useState(null);
  const [objectId, setObjectId] = useState(null);
  const [tags, setTags] = useState([]);
  const [playCount, setPlayCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log('[VIEW] MediaDetail');
      const {channelId, media} = props.route.params;

      setChannelId(channelId);
      setMediaObj(media);
      setObjectId(media.object_id);

      Orientation.lockToPortrait();

      // 선택된 미디어(오브젝트)의 태그 리스트 가져오기
      await getTagListByObject(channelId, media.object_id);

      // 해당 미디어의 재생 수 가져오기
      await getObjectPlayCount(media.object_id);
      setLoading(false);
    };

    fetchData();
  }, [props.route.params]);

  const playerConfigs = {
    license: Platform.select({
      ios: config.JW_IOS_API_KEY,
      android: config.JW_ANDROID_API_KEY,
    }),
    enableLockScreenControls: false,
    pipEnabled: false,
    autostart: true,
    controls: true,
    backgroundAudioEnabled: false,
    playlist: [
      {
        mediaId: objectId,
        file: `https://hls.midibus.dev-kinxcdn.com/hls/${channelId}/${objectId}/v/playlist.m3u8`,
        image: mediaObj ? 'https://' + mediaObj.poster_url : null,
        title: null,
        autostart: true,
        backgroundAudioEnabled: false,
        stretching: 'uniform',
      },
    ],
    fullScreenOnLandscape: false,
    landscapeOnFullScreen: false,
    portraitOnExitFullScreen: false,
    exitFullScreenOnPortrait: false,
    nativeFullScreen: false,
  };

  /*
   * 선택된 미디어(오브젝트)의 태그 리스트 가져오기
   */
  const getTagListByObject = async (channelId, objectId) => {
    try {
      const response = await authAxios.get(
        `/v2/channel/${channelId}/${objectId}/tag`,
      );
      const _tagList = response.data;
      if (_tagList && _tagList.tag_list && _tagList.tag_list.length > 0) {
        setTags(_tagList.tag_list);
      }
    } catch (error) {
      console.error('Error fetching tag list:', error);
    }
  };

  /*
   * 해당 미디어의 재생 수 가져오기
   */
  const getObjectPlayCount = async objectId => {
    try {
      const response = await axios.get(
        // `/v2/channel/${channelId}/${objectId}/count`,
        `${config.MIDIBUS_PLAY_API}/play/count/${objectId}`,
      );
      const playCount = response.data;
      if (
        playCount &&
        playCount.totalCount !== undefined &&
        playCount.totalCount !== null
      ) {
        setPlayCount(playCount.totalCount);
      }
    } catch (error) {
      console.error('Error fetching play count:', error);
    }
  };

  const onPlaylistItem = evt => {
    //('>>>>> onPlaylistItem');
    //console.log(evt);
  };
  const onBuffer = () => {
    //console.log('>>>>> onBuffer');
  };
  const onPlayerError = evt => {
    console.log('>>>>> onPlayerError');
    console.log(evt.nativeEvent);
  };

  const onBeforePlay = () => {
    // console.log('>>>>> onBeforePlay');
  };
  const onPlay = () => {
    // console.log('>>>>> onPlay');
  };
  const onPause = () => {
    // console.log('>>>>> onPause');
  };

  const onSetupPlayerError = evt => {
    console.log('>>>>> onSetupPlayerError');
    console.log(evt);
  };

  const onTime = evt => {
    //  console.log('>>>>> onTime');
  };
  const onFullScreen = () => {
    //console.log('>>>>> onFullScreen');
    Orientation.lockToLandscapeLeft();
  };
  const onFullScreenExitRequested = () => {
    //console.log('>>>>> onFullScreenExitRequested');
    Orientation.lockToPortrait();
  };
  const onFullScreenExit = () => {
    //console.log('>>>>> onFullScreenExit');
    Orientation.lockToPortrait();
  };

  return (
    <SafeAreaView style={styles.container}>
      {mediaObj && (
        <View style={styles.playerArea}>
          <JWPlayer
            style={{flex: 1}}
            ref={p => (this.JWPlayer = p)}
            config={playerConfigs}
            onPlay={() => onPlay()}
            onPause={() => onPause()}
            onPlaylistItem={event => onPlaylistItem(event)}
            onSetupPlayerError={event => onSetupPlayerError(event)}
            onPlayerError={event => onPlayerError(event)}
            onBuffer={() => onBuffer()}
            onTime={event => onTime(event)}
            onFullScreen={() => onFullScreen()}
            onFullScreenExitRequested={() => onFullScreenExitRequested()}
            onFullScreenExit={() => onFullScreenExit()}></JWPlayer>
        </View>
      )}
      <ScrollView>
        {mediaObj && (
          <>
            <View style={styles.mediaTitleArea}>
              <Text style={styles.mediaTitleText}>
                {removeFileExtension(mediaObj.media_name)}
              </Text>
            </View>
            <View style={styles.mediaDetailArea}>
              <Text style={styles.mediaDetailTextWithWhtieFont}>
                {mediaObj.duration}
              </Text>
            </View>
            <View style={styles.mediaDetailArea}>
              <Text style={styles.mediaDetailText}>재생수 {playCount}</Text>
            </View>
            <View style={styles.mediaDetailArea}>
              <Text style={styles.mediaDetailText}>
                {mediaObj.created.substring(0, 4) +
                  '-' +
                  mediaObj.created.substring(4, 6) +
                  '-' +
                  mediaObj.created.substring(6, 8) +
                  ' ' +
                  mediaObj.created.substring(8, 10) +
                  ':' +
                  mediaObj.created.substring(10, 12) +
                  ':' +
                  mediaObj.created.substring(12, 14)}
              </Text>
            </View>
            <View style={[styles.channelTagArea]}>
              {tags.map((tag, tagIdx) => (
                <TouchableOpacity
                  style={{marginRight: 10}}
                  key={tagIdx}
                  onPress={() =>
                    props.navigation.navigate('MediaList', {
                      categorized: 'tag',
                      categorizedId: tag,
                      headerTitle: '#' + tag,
                    })
                  }>
                  <Text style={{fontSize: 16, color: '#3acbc1'}}>#{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  playerArea: {
    width: '100%',
    height: 300,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'grey',
  },
  mediaTitleArea: {
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 5,
  },
  mediaTitleText: {
    fontSize: 22,
    color: '#ffffff',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  mediaDetailArea: {
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 3,
  },
  mediaDetailTextWithWhtieFont: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'left',
  },
  mediaDetailText: {
    fontSize: 16,
    color: '#898989',
    textAlign: 'left',
  },
  channelTagArea: {
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 3,
    flexDirection: 'row',
  },
  mediaDescriptionArea: {
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
  },
  mediaDescriptionText: {
    fontSize: 18,
    color: '#eeeeee',
    textAlign: 'left',
  },
});

export default MediaDetail;
