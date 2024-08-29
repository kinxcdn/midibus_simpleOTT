import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import JWPlayer from "@jwplayer/jwplayer-react-native";
import Orientation from "react-native-orientation-locker";
import * as config from "@/constants/properties";

const MediaPlayer = ({ channelId, media, objectId }) => {
  // Null 체크 및 설정
  const posterUrl =
    media && media.poster_url ? `https://${media.poster_url}` : undefined;

  // JWPlayer 설정 옵션
  const playerConfigs = {
    license: Platform.select({
      ios: config.JW_IOS_API_KEY || "",
      android: config.JW_ANDROID_API_KEY || "",
    }) as string, // license는 빈 문자열로 초기화
    enableLockScreenControls: false,
    pipEnabled: false,
    autostart: true,
    controls: true,
    backgroundAudioEnabled: false,
    playlist: [
      {
        mediaId: objectId,
        file: `https://hls.midibus.dev-kinxcdn.com/hls/${channelId}/${objectId}/v/playlist.m3u8`,
        image: posterUrl,
        title: undefined, // title을 undefined로 설정
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

  return (
    <View style={styles.playerArea}>
      <JWPlayer
        style={styles.jwPlayer}
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
  );
};

const styles = StyleSheet.create({
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
});

export default MediaPlayer;
