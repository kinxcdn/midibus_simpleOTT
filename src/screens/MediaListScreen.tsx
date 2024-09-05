import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/dist/Ionicons";

import Error from "@/components/common/Error";

import { useGetTagMediaList } from "@/apis/media/Queries/useGetTagMediaList";
import MediaListSkeletonPlaceholder from "@/components/media/MediaListSkeletonPlaceholder";

import { removeFileExtension } from "@/constants/removeFileExtension";
import { dateFormatting } from "@/constants/dateFormatting";
import { storage } from "@/constants/storage";
import { SIZES } from "@/styles/theme";

const MediaList = (props) => {
  const [_, setRefreshing] = useState(false);
  const categorizedId = props.route.params.categorizedId;
  const channelId = storage.getString("channelId");

  // 모든 데이터 재요청 보내는 함수
  const fetchData = async () => {
    setRefreshing(true);
    await Promise.all([tagMediaListRefetch()]);
    setRefreshing(false);
  };

  // 태그로 조회한 미디어 리스트
  const {
    data: mediaList,
    isLoading,
    isError,
    refetch: tagMediaListRefetch,
  } = useGetTagMediaList({ channelId, categorizedId });

  // 데이터 요청하는 동안 로딩화면
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <MediaListSkeletonPlaceholder />
      </SafeAreaView>
    );
  }

  // 잘못된 데이터 요청 시 에러화면
  if (isError) {
    return <Error onRetry={fetchData} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollArea}>
        {mediaList.map((media, mediaIdx) => {
          return (
            <React.Fragment key={"list" + mediaIdx}>
              <TouchableOpacity
                onPress={() => {
                  // 미디어 상세
                  props.navigation.push("MediaDetail", {
                    channelId: channelId,
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
                        imageStyle={styles.mediaThumbnailImage}
                      />
                    )}
                  </View>
                  <View style={styles.mediaTextArea}>
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
                    <Icon
                      name="chevron-forward-outline"
                      size={20}
                      color={"#7A8287"}
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <View style={styles.horizontalDivider} />
            </React.Fragment>
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
    height: SIZES.height / 10,
    flex: 1,
    flexDirection: "row",
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
    alignItems: "center",
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
  mediaThumbnailImage: {
    borderRadius: 7,
  },
  mediaTextArea: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
  },
  mediaMainText: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 8,
  },
  mediaSubText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 13,
    color: "#898989",
  },
  horizontalDivider: {
    height: 1.2,
    backgroundColor: "#404247",
    marginVertical: 15,
    marginHorizontal: 30,
  },
  iconContainer: {
    justifyContent: "center",
    marginRight: 10,
  },
});

export default MediaList;
