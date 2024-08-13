import React from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

import * as config from "../constants/properties";
import { useGetLimitTagMediaList } from "../apis/media/Queries/useGetLimitTagMediaList";

const MediaCards = (props) => {
  const categorizedId = props.categorizedId;

  /*
   * 태그별 미디어 리스트 가져오기
   */
  const {
    data: mediaListByTag,
    isLoading,
    isError,
  } = useGetLimitTagMediaList(config.CHANNEL, categorizedId);

  // 로딩 중일 때 로딩 메시지 표시
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // 에러가 발생했을 때 에러 메시지 표시
  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading media.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      style={{ marginLeft: 10, marginTop: 5, marginRight: 0 }}
    >
      {mediaListByTag.map((media, mediaIdx) => {
        return (
          <TouchableOpacity
            key={mediaIdx}
            onPress={() => {
              props.navigation.push("MediaDetail", {
                channelId: config.CHANNEL,
                media: media,
              });
            }}
          >
            <View
              style={mediaIdx === 0 ? styles.firstMediaCard : styles.mediaCard}
            >
              {typeof media.poster_url === "undefined" ||
              media.poster_url === null ? (
                <View style={styles.mediaThumbnailEmptyArea}>
                  <Text style={styles.mediaThumbnailEmptyText}>
                    {media.media_name}
                  </Text>
                </View>
              ) : (
                <ImageBackground
                  source={{ uri: "https://" + media.poster_url }}
                  resizeMode="cover"
                  style={styles.mediaThumbnail}
                  imageStyle={{ borderRadius: 7 }}
                ></ImageBackground>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  firstMediaCard: {
    width: 192,
    height: 108,
    backgroundColor: "#28292c",
    margin: 5,
    marginLeft: 0,
  },
  mediaCard: {
    width: 192,
    height: 108,
    backgroundColor: "#28292c",
    margin: 5,
  },
  mediaThumbnail: {
    flex: 1,
    justifyContent: "center",
  },
  mediaThumbnailEmptyArea: {
    backgroundColor: "#28292c",
    height: "100%",
    borderRadius: 7,
    justifyContent: "center",
  },
  mediaThumbnailEmptyText: {
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
    marginTop: -10,
  },
});

export default MediaCards;
