import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Orientation from "react-native-orientation-locker";
import Icon from "react-native-vector-icons/dist/Ionicons";

import Error from "@/components/common/Error";
import MediaPlayer from "@/components/media/MediaPlayer";
import TagRail from "@/components/home/TagRail";
import MediaItem from "@/components/common/mediaItem";
import MediaSkeletonPlaceholder from "@/components/media/MediaSkeletonPlaceholder";

import { useGetTagListByObject } from "@/apis/tags/Queries/useGetTagListByObject";
import { useGetObjectPlayCount } from "@/apis/media/Queries/useGetObjectPlayCount";
import { useGetTagMediaList } from "@/apis/media/Queries/useGetTagMediaList";

import { dateFormatting } from "@/constants/dateFormatting";
import { removeFileExtension } from "@/constants/removeFileExtension";

const MediaDetail = (props) => {
  const [categorizedId, setCategorizedId] = useState("");
  const [_, setRefreshing] = useState(false);

  const { channelId, media } = props.route.params;
  const objectId = media.object_id;

  // 모든 데이터 재요청 보내는 함수
  const fetchData = async () => {
    setRefreshing(true);
    await Promise.all([
      tagListByObjectRefetch(),
      tagMediaListRefetch(),
      // objectPlayCountRefetch(),
    ]);
    setRefreshing(false);
  };

  useEffect(() => {
    console.log("[VIEW] MediaDetail");
    Orientation.lockToPortrait();
  }, []);

  const handleTagSelect = (selectedTag: string) => {
    setCategorizedId(selectedTag);
  };

  // 선택된 미디어(오브젝트)의 태그 리스트 가져오기
  const {
    data: tags = [],
    refetch: tagListByObjectRefetch,
    isError: tagsError,
  } = useGetTagListByObject({
    channelId,
    objectId,
  });

  // 해당 미디어의 재생 수 가져오기
  // const {
  //   data: playCount = 0,
  //   isLoading: cntLoading,
  //   refetch: objectPlayCountRefetch,
  //   isError: playCountError,
  // } = useGetObjectPlayCount(objectId);

  const playCount = 12;

  // 태그로 조회한 미디어 리스트 가져오기
  const {
    data: mediaList = [],
    isLoading: mediaListLoading,
    refetch: tagMediaListRefetch,
    isError: mediaListError,
  } = useGetTagMediaList({ channelId, categorizedId });

  // 잘못된 데이터 요청 시 에러화면
  if (tagsError /* || playCountError */ || mediaListError) {
    return <Error onRetry={fetchData} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerArea}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => props.navigation.goBack()}
        >
          <Icon name="arrow-back-outline" size={30} color={"#fff"} />
        </TouchableOpacity>
      </View>
      {media && (
        <MediaPlayer channelId={channelId} media={media} objectId={objectId} />
      )}
      <ScrollView>
        {media !== undefined /* && !cntLoading */ ? (
          <>
            <View style={styles.mediaTitleArea}>
              <Text style={styles.mediaTitleText} numberOfLines={0}>
                {removeFileExtension(media.media_name)}
              </Text>
            </View>
            <View style={styles.mediaDetailArea}>
              <Text style={styles.mediaDetailTextWithWhiteFont}>
                {media.duration}
              </Text>
            </View>
            <View style={styles.mediaDetailArea}>
              <Text style={styles.mediaDetailText}>재생수 {playCount}</Text>
            </View>
            <View style={styles.mediaDetailArea}>
              <Text style={styles.mediaDetailText}>
                {dateFormatting(media.created)}
              </Text>
            </View>
            <View style={styles.channelTagArea}>
              <TagRail tagList={tags} onTagSelect={handleTagSelect} />
            </View>
            <View style={styles.horizontalDivider} />
            <View style={styles.mediaListArea}>
              {mediaListLoading ? (
                <></>
              ) : (
                mediaList.map((media, mediaIdx) => (
                  <MediaItem
                    key={mediaIdx}
                    media={media}
                    marginValue={160}
                    navigation={props.navigation}
                  />
                ))
              )}
            </View>
          </>
        ) : (
          <MediaSkeletonPlaceholder />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  headerArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 70,
  },
  iconContainer: {
    alignItems: "flex-end",
    marginLeft: 15,
  },
  mediaTitleArea: {
    width: "100%",
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 5,
  },
  mediaTitleText: {
    fontFamily: "Pretendard-Bold",
    fontSize: 26,
    color: "#ffffff",
    textAlign: "left",
  },
  mediaDetailArea: {
    width: "100%",
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 3,
  },
  mediaDetailTextWithWhiteFont: {
    fontFamily: "Pretendard-Regular",
    fontSize: 16,
    color: "#ffffff",
    textAlign: "left",
  },
  mediaDetailText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 16,
    color: "#898989",
    textAlign: "left",
  },
  channelTagArea: {
    width: "100%",
    marginHorizontal: 20,
    flexDirection: "column",
  },
  tagTouchable: {
    marginRight: 10,
  },
  tagText: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 18,
    color: "#2ED88F",
  },
  mediaListArea: {
    width: "100%",
    alignItems: "center",
  },
  horizontalDivider: {
    height: 1.2,
    backgroundColor: "#404247",
    marginBottom: 20,
    marginHorizontal: 0,
  },
});

export default MediaDetail;
