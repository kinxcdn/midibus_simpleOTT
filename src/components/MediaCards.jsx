import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { storage } from "../constants/storage";
import { authAxios } from "../apis/axios";

import * as config from "../constants/properties";

const MediaCards = (props) => {
  const categorized = props.categorized;
  const categorizedId = props.categorizedId;
  const [mediaListByTag, setMediaListByTag] = useState([]);

  /*
   * 태그별 미디어 리스트 가져오기
   */
  const getObjectListByTag = async (_authKey) => {
    console.log(">> getObjectListByTag");

    try {
      const response = await authAxios.get(
        `/v2/channel/${config.CHANNEL}?limit=5&tag=${categorizedId}`
      );

      const _objectByTagList = response.data;

      if (
        _objectByTagList &&
        _objectByTagList.object_list &&
        _objectByTagList.object_list.length > 0
      ) {
        setMediaListByTag(_objectByTagList.object_list);
      }
    } catch (error) {
      console.error("Error fetching object list by tag:", error);
      // 필요한 경우 추가 에러 처리 로직
    }
  };

  useEffect(() => {
    console.log(
      "[VIEW] MediaCards ---> categorized: " +
        categorized +
        " / categorizedId: " +
        categorizedId
    );

    try {
      const authKey = storage.getString("authKey");

      if (authKey !== null && authKey !== undefined) {
        // 태그별 미디어 리스트 가져오기
        getObjectListByTag(authKey);
      } else {
        console.log("[ERROR] authKey not found");
      }
    } catch (error) {
      console.error("[ERROR] retrieving authKey", error);
    }
  }, [categorized, categorizedId]);

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
