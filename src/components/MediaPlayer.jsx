import React from "react";
import { Platform } from "react-native";
import Orientation from "react-native-orientation-locker";
import * as propConfig from "../constants/properties";

const MediaPlayer = (props) => {
  const mediaInfo = props.mediaInfo;

  const onPlaylistItem = (evt) => {
    //console.log('>>>>> onPlaylistItem');
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
    console.log(">>>>> onFullScreen");
    Orientation.lockToLandscapeLeft();
    props.changePlayerState(100);
  };
  const onFullScreenExitRequested = () => {
    console.log(">>>>> onFullScreenExitRequested");
    //Orientation.lockToLandscapeLeft();
    props.changePlayerState(-100);
  };
  const onFullScreenExit = () => {
    console.log(">>>>> onFullScreenExit");
    //Orientation.lockToLandscapeLeft();
    props.changePlayerState(-100);
  };

  const config = {
    license: Platform.select({
      ios: propConfig.JW_IOS_API_KEY,
      android: propConfig.JW_ANDROID_API_KEY,
    }),
    enableLockScreenControls: false,
    pipEnabled: true,
    autostart: true,
    controls: true,
    playlist: [mediaInfo],
    fullScreenOnLandscape: false,
    landscapeOnFullScreen: false,
    portraitOnExitFullScreen: false,
    exitFullScreenOnPortrait: false,
    nativeFullScreen: false,
  };

  return (
    // <JWPlayer
    //   style={{flex: 1}}
    //   ref={p => (this.JWPlayer = p)}
    //   config={config}
    //   onPlay={() => onPlay()}
    //   onPause={() => onPause()}
    //   onPlaylistItem={event => onPlaylistItem(event)}
    //   onSetupPlayerError={event => onSetupPlayerError(event)}
    //   onPlayerError={event => onPlayerError(event)}
    //   onBuffer={() => onBuffer()}
    //   onTime={event => onTime(event)}
    //   onFullScreen={() => onFullScreen()}
    //   onFullScreenExitRequested={() => onFullScreenExitRequested()}
    //   onFullScreenExit={() => onFullScreenExit()}></JWPlayer>
    <View>테스트</View>
  );
};

export default MediaPlayer;
