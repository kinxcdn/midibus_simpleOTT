import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import Orientation from "react-native-orientation-locker";
import { removeFileExtension } from "../constants/removeFileExtension";
import { useGetTagListByObject } from "../apis/tags/Queries/useGetTagListByObject";
import { useGetObjectPlayCount } from "../apis/media/Queries/useGetObjectPlayCount";
import Error from "../components/common/Error";
import MediaPlayer from "../components/media/MediaPlayer";
import { dateFormatting } from "../constants/dateFormatting";
import TagRail from "../components/home/TagRail";
import { useGetTagMediaList } from "../apis/media/Queries/useGetTagMediaList";
import Loading from "../components/common/loading";
import MediaItem from "../components/common/mediaItem";

const MediaDetail = (props) => {
  const [filteredTagList, setFilteredTagList] = useState("");

  const { channelId, media } = props.route.params;
  const objectId = media.object_id;

  useEffect(() => {
    console.log("[VIEW] MediaDetail");
    Orientation.lockToPortrait();
  }, []);

  const handleTagSelect = (selectedTag) => {
    setFilteredTagList(tags.filter((tag) => tag === selectedTag));
  };

  // 선택된 미디어(오브젝트)의 태그 리스트 가져오기
  const { data: tags = [], isError: tagsError } = useGetTagListByObject(
    channelId,
    objectId
  );

  // 해당 미디어의 재생 수 가져오기
  const { data: playCount = 0, isError: playCountError } =
    useGetObjectPlayCount(objectId);

  // 태그로 조회한 미디어 리스트 가져오기
  const {
    data: mediaList = [],
    isLoading: mediaListLoading,
    isError: mediaListError,
  } = useGetTagMediaList(channelId, filteredTagList);

  // 잘못된 데이터 요청 시 에러화면
  if (tagsError || playCountError || mediaListError) {
    return <Error />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {media && (
        <MediaPlayer channelId={channelId} media={media} objectId={objectId} />
      )}
      <ScrollView>
        {media && (
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
                <Loading />
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
