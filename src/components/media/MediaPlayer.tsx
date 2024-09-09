import React, { useRef, useState } from "react";
import { View, StyleSheet, Platform, StatusBar } from "react-native";
import JWPlayer from "@jwplayer/jwplayer-react-native";
import Orientation from "react-native-orientation-locker";

const MediaPlayer = ({ channelId, media, objectId }) => {
  const playerRef = useRef<JWPlayer>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const posterUrl =
    media && media.poster_url ? `https://${media.poster_url}` : undefined;

  const playerConfigs = {
    license: Platform.select({
      ios: process.env.JW_IOS_API_KEY || "",
      android: process.env.JW_ANDROID_API_KEY || "",
    }) as string,
    enableLockScreenControls: false,
    pipEnabled: false,
    autostart: true,
    controls: true,
    backgroundAudioEnabled: false,
    playlist: [
      {
        mediaId: objectId,
        file: `${process.env.MIDIBUS_HLS_API}/hls/${channelId}/${objectId}/v/playlist.m3u8`,
        image: posterUrl,
        title: undefined,
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

  const onFullScreen = () => {
    Orientation.lockToLandscape();
    setIsFullScreen(true);
    StatusBar.setHidden(true, "none"); // 상단바를 완전히 숨김

    playerRef.current?.setFullscreen(true);
  };

  const onFullScreenExit = () => {
    playerRef.current?.setFullscreen(false);
    setIsFullScreen(false);
    Orientation.lockToPortrait();
    StatusBar.setHidden(false, "slide"); // 축소화 시 상단바 표시
  };

  const onFullScreenExitRequested = () => {
    setTimeout(() => {
      onFullScreenExit();
    }, 100);
  };

  return (
    <View
      style={isFullScreen ? styles.fullScreenPlayerArea : styles.playerArea}
    >
      <JWPlayer
        ref={playerRef}
        style={isFullScreen ? styles.fullScreenJWPlayer : styles.jwPlayer} // 전체 화면과 축소 화면에 따라 스타일 적용
        config={playerConfigs}
        onFullScreen={() => onFullScreen()}
        onFullScreenExit={() => onFullScreenExit()}
        onFullScreenExitRequested={() => onFullScreenExitRequested()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  playerArea: {
    width: "100%",
    height: 250,
    backgroundColor: "black",
  },
  fullScreenPlayerArea: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    zIndex: 1,
  },
  jwPlayer: {
    flex: 1,
  },
  fullScreenJWPlayer: {
    width: "100%",
    height: "100%",
  },
});

export default MediaPlayer;
