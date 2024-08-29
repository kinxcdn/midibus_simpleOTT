import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import Orientation from "react-native-orientation-locker";
import Swiper from "react-native-swiper";
import Video from "react-native-video";

import Empty from "@/components/common/Empty";

import { removeFileExtension } from "@/constants/removeFileExtension";
import { SIZES } from "@/styles/theme";

const PlayTopNCards = ({ channelId, mediaList, navigation }) => {
  const [previewIndex, setPreviewIndex] = useState(0);
  Orientation.lockToPortrait();

  // TOP5 rank 관련 에셋
  const numberImages = [
    require("../../assets/images/number_one.png"),
    require("../../assets/images/number_two.png"),
    require("../../assets/images/number_three.png"),
    require("../../assets/images/number_four.png"),
    require("../../assets/images/number_five.png"),
  ];

  // 재생한 영상이 없는 경우 default page
  if (!mediaList || mediaList.length === 0) {
    return <Empty message="최근에 재생한 영상이 없습니다..." />;
  }

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
            key={"top" + mediaIdx}
            onPress={() => {
              navigation.navigate("MediaDetail", {
                channelId: channelId,
                media: media,
                objectId: media.object_id,
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
                        uri: `${process.env.MIDIBUS_HLS_API}/hls/${channelId}/${media.object_id}/v/playlist.m3u8`,
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
                        uri: `${process.env.MIDIBUS_HLS_API}/hls/${channelId}/${media.object_id}/v/playlist.m3u8`,
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
            <Image source={numberImages[mediaIdx]} style={styles.numberImage} />
            <View style={styles.mediaNameArea}>
              <Text style={styles.mediaText} numberOfLines={1}>
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
  const width = SIZES.width;
  const height = SIZES.height;

  return width < height ? width : height;
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
    fontFamily: "Pretendard-Bold",
    fontSize: 20,
    color: "#fff",
    marginLeft: 70,
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  emptyImage: {
    height: "60%",
    width: "60%",
  },
  emptySubText: {
    fontFamily: "Pretendard-Regular",
    color: "#898989",
    fontSize: 20,
    marginTop: 20,
  },
  numberImage: {
    position: "absolute",
    bottom: 30,
    left: -10,
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

export default PlayTopNCards;
