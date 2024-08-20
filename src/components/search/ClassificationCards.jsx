import React from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from "react-native";
import { SIZES } from "../../styles/theme";

import MediaItem from "../common/mediaItem";

const ClassificationCards = ({ tagName, tagIdx, mediaList, navigation }) => {
  return (
    <TouchableOpacity
      key={`pTag${tagIdx}`}
      onPress={() => {
        navigation.navigate("MediaList", {
          categorizedId: tagName,
          headerTitle: "#" + tagName,
        });
      }}
    >
      <View style={styles.classificationCard}>
        <View style={styles.headerSection}>
          <Image
            source={require("../../assets/images/popular_logo.png")}
            style={styles.logoImage}
          />
          <View style={styles.textVeiw}>
            <Text style={styles.classificationNameText}>
              <Text style={styles.tagNameText}>{tagName}</Text>
              {"에서\n가져온 미디어"}
            </Text>
            <Text style={styles.mediaCountText}>{mediaList.length}개 영상</Text>
          </View>
        </View>
        <View style={styles.horizontalDivider} />
        {mediaList.slice(0, 3).map((media, mediaIdx) => (
          <MediaItem
            key={mediaIdx}
            media={media}
            marginValue={200}
            navigation={navigation}
          />
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginLeft: 20,
    marginTop: 5,
  },
  mediaArea: {
    flexDirection: "row",
  },
  mediaBox: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  mediaText: {
    width: 100,
    height: 100,
  },
  mediaThumbnailImage: {
    borderRadius: 10,
  },
  classificationCard: {
    width: SIZES.width - 30,
    borderRadius: 20,
    backgroundColor: "#213029",
    padding: 30,
    marginRight: 20,
  },

  headerSection: { flexDirection: "row", alignItems: "center" },
  logoImage: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
  classificationNameText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 20,
    color: "#ffffff",
    marginBottom: 5,
  },
  mediaCountText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 14,
    color: "#B1C2A7",
  },
  tagNameText: {
    fontFamily: "Pretendard-Bold",
    fontSize: 32,
    color: "#fff",
  },
  textVeiw: {
    width: "20vh",
  },
  horizontalDivider: {
    height: 1.2,
    backgroundColor: "#434940",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  mediaThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 5,
    marginBottom: 10,
  },
  mediaTextArea: {
    width: SIZES.width - 210,
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

export default ClassificationCards;
