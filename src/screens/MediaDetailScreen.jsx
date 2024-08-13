import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Orientation from "react-native-orientation-locker";
import JWPlayer from "@jwplayer/jwplayer-react-native";
import * as config from "../constants/properties";
import { removeFileExtension } from "../constants/removeFileExtension";
import { useGetTagListByObject } from "../apis/tags/Queries/useGetTagListByObject";
import { useGetObjectPlayCount } from "../apis/media/Queries/useGetObjectPlayCount";

const MediaDetail = (props) => {
  const { channelId, media } = props.route.params;
  const objectId = media.object_id;

  // tag로 object리스트
  const {
    data: tags = [],
    isLoading: tagsLoading,
    isError: tagsError,
  } = useGetTagListByObject(channelId, objectId);

  const {
    data: playCount = 0,
    isLoading: playCountLoading,
    isError: playCountError,
  } = useGetObjectPlayCount(objectId);

  useEffect(() => {
    const fetchData = async () => {
      console.log("[VIEW] MediaDetail");
      Orientation.lockToPortrait();
    };

    fetchData();
  }, []);

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
        image: media ? "https://" + media.poster_url : null,
        title: null,
        autostart: true,
        backgroundAudioEnabled: false,
        stretching: "uniform",
      },
    ],
    fullScreenOnLandscape: false,
    landscapeOnFullScreen: false,
    portraitOnExitFullScreen: false,
    exitFullScreenOnPortrait: false,
    nativeFullScreen: false,
  };

  const onPlaylistItem = (evt) => {
    //('>>>>> onPlaylistItem');
    //console.log(evt);
  };
  const onBuffer = () => {
    //console.log('>>>>> onBuffer');
  };
  const onPlayerError = (evt) => {
    console.log(">>>>> onPlayerError");
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

  const onSetupPlayerError = (evt) => {
    console.log(">>>>> onSetupPlayerError");
    console.log(evt);
  };

  const onTime = (evt) => {
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

  if (tagsLoading || playCountLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (tagsError || playCountError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading media details.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {media && (
        <View style={styles.playerArea}>
          <JWPlayer
            style={{ flex: 1 }}
            ref={(p) => (this.JWPlayer = p)}
            config={playerConfigs}
            onPlay={() => onPlay()}
            onPause={() => onPause()}
            onPlaylistItem={(event) => onPlaylistItem(event)}
            onSetupPlayerError={(event) => onSetupPlayerError(event)}
            onPlayerError={(event) => onPlayerError(event)}
            onBuffer={() => onBuffer()}
            onTime={(event) => onTime(event)}
            onFullScreen={() => onFullScreen()}
            onFullScreenExitRequested={() => onFullScreenExitRequested()}
            onFullScreenExit={() => onFullScreenExit()}
          ></JWPlayer>
        </View>
      )}
      <ScrollView>
        {media && (
          <>
            <View style={styles.mediaTitleArea}>
              <Text style={styles.mediaTitleText}>
                {removeFileExtension(media.media_name)}
              </Text>
            </View>
            <View style={styles.mediaDetailArea}>
              <Text style={styles.mediaDetailTextWithWhtieFont}>
                {media.duration}
              </Text>
            </View>
            <View style={styles.mediaDetailArea}>
              <Text style={styles.mediaDetailText}>재생수 {playCount}</Text>
            </View>
            <View style={styles.mediaDetailArea}>
              <Text style={styles.mediaDetailText}>
                {media.created.substring(0, 4) +
                  "-" +
                  media.created.substring(4, 6) +
                  "-" +
                  media.created.substring(6, 8) +
                  " " +
                  media.created.substring(8, 10) +
                  ":" +
                  media.created.substring(10, 12) +
                  ":" +
                  media.created.substring(12, 14)}
              </Text>
            </View>
            <View style={[styles.channelTagArea]}>
              {tags.map((tag, tagIdx) => (
                <TouchableOpacity
                  style={{ marginRight: 10 }}
                  key={tagIdx}
                  onPress={() =>
                    props.navigation.navigate("MediaList", {
                      categorized: "tag",
                      categorizedId: tag,
                      headerTitle: "#" + tag,
                    })
                  }
                >
                  <Text style={{ fontSize: 16, color: "#3acbc1" }}>#{tag}</Text>
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
    backgroundColor: "#000000",
  },
  playerArea: {
    width: "100%",
    height: 300,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "grey",
  },
  mediaTitleArea: {
    width: "100%",
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 5,
  },
  mediaTitleText: {
    fontSize: 22,
    color: "#ffffff",
    textAlign: "left",
    fontWeight: "bold",
  },
  mediaDetailArea: {
    width: "100%",
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 3,
  },
  mediaDetailTextWithWhtieFont: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "left",
  },
  mediaDetailText: {
    fontSize: 16,
    color: "#898989",
    textAlign: "left",
  },
  channelTagArea: {
    width: "100%",
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 3,
    flexDirection: "row",
  },
  mediaDescriptionArea: {
    width: "100%",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
  },
  mediaDescriptionText: {
    fontSize: 18,
    color: "#eeeeee",
    textAlign: "left",
  },
});

export default MediaDetail;
