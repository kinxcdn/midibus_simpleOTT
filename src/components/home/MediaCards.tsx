import React, { useEffect, useRef } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

import * as config from "../../constants/properties";
import { useGetLimitTagMediaList } from "../../apis/media/Queries/useGetLimitTagMediaList";
import { storage } from "../../constants/storage";

const MediaCards = (props) => {
  const channelId = storage.getString("channelId");
  const { categorizedId, navigation } = props;
  const scrollViewRef = useRef<ScrollView>(null);

  // 태그별 미디어 리스트 가져오기
  const { data: mediaListByTag } = useGetLimitTagMediaList({
    channelId,
    limit: 5,
    categorizedId,
  });

  // 태그가 변경될 때마다 스크롤 위치 초기화
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, animated: true });
    }
  }, [categorizedId]);

  return (
    <ScrollView
      horizontal
      style={styles.scrollView}
      ref={scrollViewRef}
      showsHorizontalScrollIndicator={false} // 수평 스크롤바를 숨기기 위해 추가
    >
      {mediaListByTag.map((media, mediaIdx) => (
        <TouchableOpacity
          key={mediaIdx}
          onPress={() => {
            navigation.push("MediaDetail", {
              channelId: channelId,
              media: media,
            });
          }}
        >
          <View
            style={[styles.mediaCard, mediaIdx === 0 && styles.firstMediaCard]}
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
                imageStyle={styles.mediaThumbnailImage}
              ></ImageBackground>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginLeft: 10,
    marginTop: 5,
    marginRight: 0,
  },
  firstMediaCard: {
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
  mediaThumbnailImage: {
    borderRadius: 7,
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
