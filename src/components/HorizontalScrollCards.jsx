import React from "react";
import {
  ScrollView,
  ImageBackground,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import Orientation from "react-native-orientation-locker";
import { removeFileExtension } from "../constants/removeFileExtension";
import Empty from "./common/Empty";
import { SIZES } from "../styles/theme";

const HorizontalScrollCards = ({ mediaList, channelId, navigation }) => {
  Orientation.lockToPortrait();

  if (!mediaList || mediaList.length === 0) {
    return <Empty message="최근에 업로드한 영상이 없습니다.." />;
  }

  return (
    <ScrollView horizontal={true} style={styles.scrollView}>
      {mediaList.map((media, mediaIdx) => (
        <TouchableOpacity
          key={"scroll" + mediaIdx}
          onPress={() => {
            navigation.navigate("MediaDetail", {
              channelId: channelId,
              media: media,
              objectId: media.object_id,
            });
          }}
          style={styles.touchable}
        >
          <View style={styles.mediaCard}>
            {!media.poster_url ? (
              <View style={styles.mediaThumbnailEmptyArea}>
                <Text style={styles.mediaThumbnailEmptyText}>
                  {removeFileExtension(media.media_name)}
                </Text>
              </View>
            ) : (
              <ImageBackground
                source={{ uri: `https://${media.poster_url}` }}
                resizeMode="cover"
                style={styles.mediaThumbnail}
                imageStyle={styles.mediaThumbnailImage}
              />
            )}
          </View>

          <View style={styles.mediaNameArea}>
            <Text style={styles.mediaText} numberOfLines={2}>
              {removeFileExtension(media.media_name)}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const getScreenWidthSize = () => {
  const width = SIZES.width;
  const height = SIZES.height;
  return Math.min(width, height);
};

const styles = StyleSheet.create({
  scrollView: {
    marginLeft: 0,
  },
  touchable: {
    margin: 10,
  },
  mediaCard: {
    width: getScreenWidthSize() - 50, // Adjusted for consistent spacing
    height: ((getScreenWidthSize() - 50) * 9) / 16,
    backgroundColor: "#898989",
    borderRadius: 7,
    overflow: "hidden", // Ensures the borderRadius is applied correctly
  },
  mediaThumbnail: {
    flex: 1,
    justifyContent: "center",
  },
  mediaThumbnailImage: {
    borderRadius: 7,
  },
  mediaNameArea: {
    width: getScreenWidthSize() - 50,
    height: 60,
    paddingHorizontal: 20,
  },
  mediaText: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
    color: "#fff",
  },
  mediaThumbnailEmptyArea: {
    backgroundColor: "#28292c",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mediaThumbnailEmptyText: {
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
    marginTop: -10,
  },
});

export default HorizontalScrollCards;
