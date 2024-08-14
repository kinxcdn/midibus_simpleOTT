import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Orientation from "react-native-orientation-locker";
import JWPlayer from "@jwplayer/jwplayer-react-native";
import * as config from "../constants/properties";
import { removeFileExtension } from "../constants/removeFileExtension";
import { useGetTagListByObject } from "../apis/tags/Queries/useGetTagListByObject";
import { useGetObjectPlayCount } from "../apis/media/Queries/useGetObjectPlayCount";
import Error from "../components/common/Error";

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

  const onPlaylistItem = (evt) => {};
  const onBuffer = () => {};
  const onPlayerError = (evt) => {
    console.log(">>>>> onPlayerError");
    console.log(evt.nativeEvent);
  };
  const onBeforePlay = () => {};
  const onPlay = () => {};
  const onPause = () => {};
  const onSetupPlayerError = (evt) => {
    console.log(">>>>> onSetupPlayerError");
    console.log(evt);
  };
  const onTime = (evt) => {};
  const onFullScreen = () => {
    Orientation.lockToLandscapeLeft();
  };
  const onFullScreenExitRequested = () => {
    Orientation.lockToPortrait();
  };
  const onFullScreenExit = () => {
    Orientation.lockToPortrait();
  };

  // if (tagsLoading || playCountLoading) {
  //   return <Loading />;
  // }

  if (tagsError || playCountError) {
    return <Error />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {media && (
        <View style={styles.playerArea}>
          <JWPlayer
            style={styles.jwPlayer}
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
          />
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
            <View style={styles.channelTagArea}>
              {tags.map((tag, tagIdx) => (
                <TouchableOpacity
                  style={styles.tagTouchable}
                  key={tagIdx}
                  onPress={() =>
                    props.navigation.navigate("MediaList", {
                      categorized: "tag",
                      categorizedId: tag,
                      headerTitle: "#" + tag,
                    })
                  }
                >
                  <Text style={styles.tagText}>#{tag}</Text>
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
  jwPlayer: {
    flex: 1,
  },
  mediaTitleArea: {
    width: "100%",
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 5,
  },
  mediaTitleText: {
    fontFamily: "Pretendard-Bold",
    fontSize: 26,
    color: "#ffffff",
    textAlign: "left",
  },
  mediaDetailArea: {
    width: "100%",
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 3,
  },
  mediaDetailTextWithWhtieFont: {
    fontFamily: "Pretendard-Regular",
    fontSize: 16,
    color: "#ffffff",
    textAlign: "left",
  },
  mediaDetailText: {
    fontFamily: "Pretendard-Regular",
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
  tagTouchable: {
    marginRight: 10,
  },
  tagText: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 18,
    color: "#3acbc1",
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  lottieView: {
    width: "30%",
    height: "30%",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default MediaDetail;
