import React from "react";
import {
  ScrollView,
  ImageBackground,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
} from "react-native";
import Orientation from "react-native-orientation-locker";
import Empty from "@/components/common/Empty";

import { removeFileExtension } from "@/constants/removeFileExtension";
import { useUploadTimeAgo } from "@/constants/uploadTimeAgo";
import { SIZES } from "@/styles/theme";

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
            <ImageBackground
              source={{ uri: `https://${media.poster_url}` }}
              resizeMode="cover"
              style={styles.mediaThumbnail}
              imageStyle={styles.mediaThumbnailImage}
            >
              <View style={styles.overlay} />
              <Image
                style={styles.playBtn}
                source={require("../../assets/images/play_button.png")}
              />
              {/* </View> */}
            </ImageBackground>
          </View>
          <View style={styles.mediaNameArea}>
            <Text style={styles.mediaName} numberOfLines={1}>
              {removeFileExtension(media.media_name)}
            </Text>
            <Text style={styles.mediaDateAgo}>
              {useUploadTimeAgo(media.created)}
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
    width: SIZES.width - 59,
  },
  mediaCard: {
    width: "100%",
    height: ((getScreenWidthSize() - 50) * 9) / 16,
    backgroundColor: "#898989",
    borderRadius: 7,
    overflow: "hidden",
  },
  mediaThumbnail: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mediaThumbnailImage: {
    borderRadius: 7,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // This makes the overlay cover the entire ImageBackground
    backgroundColor: "rgba(0, 0, 0, 0.4)", // 50% opacity black background
  },
  iconContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    justifyContent: "center",
    alignItems: "center",
  },
  playBtn: {
    width: 70,
    height: 70,
  },
  mediaNameArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: SIZES.width - 60,
    paddingVertical: 10,
  },
  mediaName: {
    fontFamily: "Pretendard-Medium",
    color: "#fff",
    width: "80%",
    fontSize: 18,
    marginRight: 10,
  },
  mediaDateAgo: {
    fontFamily: "Pretendard-Light",
    color: "#CECECE",
  },
});

export default HorizontalScrollCards;
