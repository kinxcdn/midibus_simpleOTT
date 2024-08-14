import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as config from "../constants/properties";
import Icon from "react-native-vector-icons/dist/Ionicons";
import { removeFileExtension } from "../constants/removeFileExtension";
import { useGetTagMediaList } from "../apis/media/Queries/useGetTagMediaList";
import Loading from "../components/common/loading";
import Error from "../components/common/Error";

const MediaList = (props) => {
  const categorizedId = props.route.params.categorizedId;

  /*
   * 태그로 조회한 미디어 리스트
   */
  const {
    data: mediaList,
    isLoading,
    isError,
    error,
  } = useGetTagMediaList(config.CHANNEL, categorizedId);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollArea}>
        {mediaList.map((media, mediaIdx) => {
          return (
            <>
              <TouchableOpacity
                key={"list" + mediaIdx}
                onPress={() => {
                  // 미디어 상세
                  props.navigation.push("MediaDetail", {
                    channelId: config.CHANNEL,
                    media: media,
                  });
                }}
              >
                <View style={styles.mediaBox}>
                  <View style={styles.mediaThumbnailArea}>
                    {media.poster_url === null ? (
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
                        imageStyle={{ borderRadius: 7 }}
                      ></ImageBackground>
                    )}
                  </View>
                  <View style={styles.mediaTextArea}>
                    <View style={{ flex: 1, marginRight: 30 }}>
                      <Text style={styles.mediaMainText} numberOfLines={1}>
                        {removeFileExtension(media.media_name)}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.mediaSubText}>
                        {media.created.substring(0, 4) +
                          "-" +
                          media.created.substring(4, 6) +
                          "-" +
                          media.created.substring(6, 8) +
                          " " +
                          media.created.substring(8, 10) +
                          ":" +
                          media.created.substring(10, 12) +
                          ":" +
                          media.created.substring(12, 14)}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      name="chevron-forward-outline"
                      size={20}
                      color={"#ffffff"}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.horizontalDivider} />
            </>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  scrollArea: {
    width: "100%",
    flex: 1,
    paddingTop: 20,
  },
  mediaBox: {
    width: "95%",
    height: Dimensions.get("window").height / 10,
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 2,
  },
  mediaThumbnailArea: {
    flex: 1,
    paddingLeft: 30,
    paddingBottom: 5,
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
  mediaThumbnail: {
    flex: 1,
    justifyContent: "center",
  },
  mediaTextArea: {
    flex: 2,
    flexDirection: "column",
  },
  mediaMainText: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
    color: "#ffffff",
    textAlign: "left",
    marginTop: 18,
    marginLeft: 10,
  },
  mediaSubText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 13,
    color: "#898989",
    textAlign: "left",
    marginLeft: 10,
  },
  horizontalDivider: {
    height: 1.2,
    backgroundColor: "#404247",
    marginVertical: 15,
    marginHorizontal: 30,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
});

export default MediaList;
