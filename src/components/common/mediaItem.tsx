import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/dist/Ionicons";

import { removeFileExtension } from "@/constants/removeFileExtension";
import { dateFormatting } from "@/constants/dateFormatting";
import { storage } from "@/constants/storage";
import { SIZES } from "@/styles/theme";

const MediaItem = ({ media, navigation, marginValue }) => {
  const calculatedWidth = SIZES.width - marginValue;
  const channelId = storage.getString("channelId");

  return (
    <TouchableOpacity
      style={styles.mediaArea}
      onPress={() => {
        navigation.push("MediaDetail", {
          channelId: channelId,
          media: media,
        });
      }}
    >
      <Image
        source={{ uri: `https://${media.poster_url}` }}
        style={styles.mediaThumbnail}
      />
      <View style={[styles.mediaTextArea, { width: calculatedWidth }]}>
        <View>
          <Text style={styles.mediaMainText} numberOfLines={1}>
            {removeFileExtension(media.media_name)}
          </Text>
        </View>
        <View>
          <Text style={styles.mediaSubText}>
            {dateFormatting(media.created)}
          </Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <Icon name="chevron-forward-outline" size={20} color={"#ffffff"} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mediaArea: {
    flexDirection: "row",
    marginBottom: 10,
  },
  mediaThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 5,
  },
  mediaTextArea: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 15,
  },
  mediaMainText: {
    fontFamily: "Pretendard-Medium",
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
  mediaSubText: {
    fontFamily: "Pretendard-Regular",
    color: "#9E9E9E",
    fontSize: 12,
  },
  iconContainer: {
    justifyContent: "center",
  },
});

export default MediaItem;
