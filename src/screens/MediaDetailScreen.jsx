import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Orientation from "react-native-orientation-locker";
import { removeFileExtension } from "../constants/removeFileExtension";
import { useGetTagListByObject } from "../apis/tags/Queries/useGetTagListByObject";
import { useGetObjectPlayCount } from "../apis/media/Queries/useGetObjectPlayCount";
import Error from "../components/common/Error";
import MediaPlayer from "../components/MediaPlayer";
import { dateFormatting } from "../constants/dateFormatting";

const MediaDetail = (props) => {
  const { channelId, media } = props.route.params;
  const objectId = media.object_id;

  // tag로 object리스트
  const {
    data: tags = [],
    // isLoading: tagsLoading,
    isError: tagsError,
  } = useGetTagListByObject(channelId, objectId);

  const {
    data: playCount = 0,
    // isLoading: playCountLoading,
    isError: playCountError,
  } = useGetObjectPlayCount(objectId);

  useEffect(() => {
    console.log("[VIEW] MediaDetail");
    Orientation.lockToPortrait();
  }, []);

  if (tagsError || playCountError) {
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
              <Text style={styles.mediaTitleText}>
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
              {tags.map((tag, tagIdx) => (
                <TouchableOpacity
                  style={styles.tagTouchable}
                  key={tagIdx}
                  onPress={() =>
                    props.navigation.navigate("MediaList", {
                      categorized: "tag",
                      categorizedId: tag,
                      headerTitle: "#" + tag,
                    })
                  }
                >
                  <Text style={styles.tagText}>#{tag}</Text>
                </TouchableOpacity>
              ))}
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
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 3,
    flexDirection: "row",
  },
  tagTouchable: {
    marginRight: 10,
  },
  tagText: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 18,
    color: "#3acbc1",
  },
});

export default MediaDetail;
