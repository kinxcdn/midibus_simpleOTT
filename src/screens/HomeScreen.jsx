import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/dist/Ionicons";
import * as config from "../constants/properties";
import PlayTopNCards from "../components/PlayTopNCards";
import HorizontalScrollCards from "../components/HorizontalScrollCards";
import MediaCards from "../components/MediaCards";
import { useGetAllTags } from "../apis/tags/Queries/useGetAllTags";
import { useGetLatestUploadsMediaList } from "../apis/media/Queries/useGetLatestUploadsMediaList";
import Orientation from "react-native-orientation-locker";
import { useGetMostWeeklyPlayedMediaList } from "../apis/media/Queries/useGetMostWeeklyPlayedMediaList";
import { useGetPlayTopNMediaList } from "../apis/media/Queries/useGetPlayTopNMediaList";
import Error from "../components/common/Error";
import Loading from "../components/common/loading";

const Home = (props) => {
  const {
    data: tagList,
    isLoading: tagsLoading,
    isError: tagsError,
  } = useGetAllTags(config.CHANNEL);

  const {
    data: currentUploadedMediaList,
    isLoading: uploadsLoading,
    isError: uploadsError,
  } = useGetLatestUploadsMediaList(config.CHANNEL, 5);

  const {
    data: objectList,
    isLoading: weeklyLoading,
    isError: weeklyError,
  } = useGetMostWeeklyPlayedMediaList(config.CHANNEL);

  const {
    data: playTopNMediaList,
    isLoading: playTopNLoading,
    isError: playTopNError,
  } = useGetPlayTopNMediaList(objectList, config.CHANNEL);

  useEffect(() => {
    console.log("[VIEW] Home");

    Orientation.lockToPortrait();
  }, []);

  // 모든 쿼리가 로딩 중이면 로딩 스피너를 표시
  if (tagsLoading || uploadsLoading || weeklyLoading || playTopNLoading) {
    return <Loading />;
  }

  // 에러 상태 처리
  if (tagsError || uploadsError || weeklyError || playTopNError) {
    return <Error />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerArea}>
        <Image
          source={require("../assets/images/logo_midibus_small.png")}
          style={styles.logoImage}
        />
        <View style={styles.iconContainer}>
          <Icon name="person-circle-outline" size={35} color={"#ffffff"} />
        </View>
      </View>
      {/* contents : vertical scroll */}
      <ScrollView style={styles.contentsArea}>
        <View style={styles.playTopNArea}>
          <Text style={styles.subTitle}>최근 일주일 동안</Text>
          <Text style={styles.mainTitle}>가장 많이 재생된 Top5</Text>
          <PlayTopNCards
            data={playTopNMediaList}
            channelId={config.CHANNEL}
            navigation={props.navigation}
          />
        </View>
        <View style={styles.currentArea}>
          <Text style={styles.sectionTitle}>최신 업로드</Text>
          <HorizontalScrollCards
            data={currentUploadedMediaList}
            channelId={config.CHANNEL}
            navigation={props.navigation}
          />
        </View>
        <View style={styles.tagListArea}>
          {tagList.map((tagName, tagIdx) => (
            <View key={tagIdx} style={styles.byTagArea}>
              <View style={styles.titleContainer}>
                <Text style={styles.sectionTitle}># {tagName}</Text>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("MediaList", {
                      categorized: "tag",
                      categorizedId: tagName,
                      headerTitle: "#" + tagName,
                    });
                  }}
                >
                  <Text style={styles.viewMoreText}>더보기</Text>
                </TouchableOpacity>
              </View>
              <MediaCards
                categorized="tag"
                categorizedId={tagName}
                navigation={props.navigation}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      {/* // contents : vertical scroll */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
  },
  headerArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 70,
  },
  logoImage: {
    width: "40%",
    objectFit: "contain",
    marginLeft: 15,
  },
  iconContainer: {
    alignItems: "flex-end",
    marginRight: 20,
  },
  contentsArea: {
    width: "100%",
    flex: 1,
  },
  playTopNArea: {
    width: "100%",
    height: ((Dimensions.get("window").width - 30) * 9) / 16 + 60 + 80,
    marginBottom: 10,
    marginTop: 10,
  },
  currentArea: {
    width: "100%",
    height: ((Dimensions.get("window").width - 30) * 9) / 16 + 60 + 80,
    marginTop: 10,
  },
  tagListArea: {
    width: "100%",
    flex: 1,
  },
  byTagArea: {
    width: "100%",
    height: 175,
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  mainTitle: {
    fontFamily: "Pretendard-ExtraBold",
    color: "#ffffff",
    marginLeft: 10,
    fontSize: 34,
    textAlign: "left",
    textAlignVertical: "center",
  },
  subTitle: {
    fontFamily: "Pretendard-SemiBold",
    color: "#B3B3B3",
    marginLeft: 10,
    fontSize: 18,
    textAlign: "left",
  },
  sectionTitle: {
    fontFamily: "Pretendard-Bold",
    color: "#ffffff",
    marginLeft: 10,
    fontSize: 26,
    textAlign: "left",
    textAlignVertical: "center",
  },
  viewMoreText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 16,
    color: "#898989",
    textAlign: "right",
    marginRight: 10,
  },
});

export default Home;
