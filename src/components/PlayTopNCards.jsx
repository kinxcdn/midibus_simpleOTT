import React, { useState, useEffect, useRef } from "react";
import {
  ImageBackground,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import Orientation from "react-native-orientation-locker";
import Swiper from "react-native-swiper";
import Video from "react-native-video";
import { removeFileExtension } from "../constants/removeFileExtension";

const PlayTopNCards = (props) => {
  const channelId = props.channelId;
  const mediaList = props.data;

  const [previewIndex, setPreviewIndex] = useState(0);
  Orientation.lockToPortrait();

  useEffect(() => {
    console.log("previewIndex : " + previewIndex);
  }, [previewIndex]);

  return (
    <Swiper
      showsButtons={false}
      loop={false}
      showsPagination={false}
      onMomentumScrollEnd={(evt) => {
        const previewVideoIndex = Math.floor(
          (evt.nativeEvent.contentOffset.x * 1) / getScreenWidthSize()
        );
        setPreviewIndex(previewVideoIndex);
      }}
    >
      {mediaList.map((media, mediaIdx) => {
        return (
          <TouchableOpacity
            key={mediaIdx}
            onPress={() => {
              props.navigation.navigate("MediaDetail", {
                channelId: channelId,
                media: media,
              });
            }}
          >
            {mediaIdx === previewIndex ? (
              <View style={styles.mediaCard}>
                {typeof media.poster_url === "undefined" ||
                media.poster_url === null ? (
                  <View style={styles.mediaThumbnailEmptyArea}>
                    <Video
                      source={{
                        uri: `https://hls.midibus.dev-kinxcdn.com/hls/${channelId}/${media.object_id}/v/playlist.m3u8`,
                      }}
                      style={styles.backgroundVideo}
                      fullscreen={false}
                      muted={true}
                      repeat={true}
                      resizeMode={"cover"}
                      controls={false}
                    />
                  </View>
                ) : (
                  <ImageBackground
                    source={{ uri: "https://" + media.poster_url }}
                    resizeMode="cover"
                    style={styles.mediaThumbnail}
                  >
                    <Video
                      source={{
                        uri: `https://hls.midibus.dev-kinxcdn.com/hls/${channelId}/${media.object_id}/v/playlist.m3u8`,
                      }}
                      style={styles.backgroundVideo}
                      fullscreen={false}
                      muted={true}
                      repeat={true}
                      resizeMode={"cover"}
                      controls={false}
                    />
                  </ImageBackground>
                )}
              </View>
            ) : (
              <View style={styles.mediaCard}>
                {typeof media.poster_url === "undefined" ||
                media.poster_url === null ? (
                  <View style={styles.mediaThumbnailEmptyArea}>
                    <Text style={styles.mediaThumbnailEmptyText}>
                      {removeFileExtension(media.media_name)}
                    </Text>
                  </View>
                ) : (
                  <ImageBackground
                    source={{ uri: "https://" + media.poster_url }}
                    resizeMode="cover"
                    style={styles.mediaThumbnail}
                  ></ImageBackground>
                )}
              </View>
            )}
            <View style={styles.mediaNameArea}>
              <Text style={styles.mediaText} numberOfLines={2}>
                {removeFileExtension(media.media_name)}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </Swiper>
  );
};

const getScreenWidthSize = () => {
  const screenSize1 = Dimensions.get("screen").width;
  const screenSize2 = Dimensions.get("screen").height;

  return screenSize1 < screenSize2 ? screenSize1 : screenSize2;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  mediaCard: {
    width: getScreenWidthSize(),
    height: ((getScreenWidthSize() - 20) * 9) / 16,
    backgroundColor: "#898989",
    marginRight: 10,
    marginTop: 10,
  },
  mediaText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  mediaNameArea: {
    width: getScreenWidthSize(),
    height: 60,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20,
  },
  mediaThumbnail: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  mediaThumbnailEmptyArea: {
    backgroundColor: "#28292c",
    height: "100%",
    justifyContent: "center",
  },
  mediaThumbnailEmptyText: {
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
    marginTop: -10,
  },
});

export default PlayTopNCards;
