import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
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
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // 에러 상태 처리
  if (tagsError || uploadsError || weeklyError || playTopNError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading data.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerArea}>
        <Image
          source={require("../assets/images/logo_midibus.png")}
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
    width: "100%",
    height: 70,
  },
  logoImage: {
    marginTop: 20,
    marginLeft: 15,
  },
  iconContainer: {
    alignItems: "flex-end",
    marginRight: 20,
    marginTop: -30,
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
    color: "#ffffff",
    marginLeft: 10,
    fontWeight: "800",
    fontSize: 32,
    textAlign: "left",
    textAlignVertical: "center",
  },
  subTitle: {
    // fontFamily: 'NotoSansKR-Black',
    color: "#B3B3B3",
    marginLeft: 10,
    fontSize: 18,
    textAlign: "left",
    fontWeight: "600",
  },
  sectionTitle: {
    color: "#ffffff",
    marginLeft: 10,
    fontWeight: "800",
    fontSize: 26,
    textAlign: "left",
    textAlignVertical: "center",
  },
  viewMoreText: {
    fontSize: 16,
    color: "#898989",
    textAlign: "right",
    marginRight: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});

export default Home;
