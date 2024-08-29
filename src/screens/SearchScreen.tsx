import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import Orientation from "react-native-orientation-locker";
import Icon from "react-native-vector-icons/Ionicons";

import ClassificationCards from "@/components/search/ClassificationCards";
import Error from "@/components/common/Error";
import Header from "@/components/common/Header";
import SearchTagRail from "@/components/search/SearchTagRail";
import SearchSkeletonPlaceholder from "@/components/search/SearchSkeletonPlaceholder";
import TagEmpty from "@/components/common/TagEmpty";

import { useGetAllTags } from "@/apis/tags/Queries/useGetAllTags";
import { useKeywordSearch } from "@/apis/search/Queries/useKeywordSearch";
import { useGetTagMediaList } from "@/apis/media/Queries/useGetTagMediaList";

import { removeFileExtension } from "@/constants/removeFileExtension";
import { storage } from "@/constants/storage";
import { SIZES } from "@/styles/theme";

import { SearchResultProps } from "types/search/searchTypes";

const Search = ({ navigation }) => {
  const [inputSearchKeyword, setInputSearchKeyword] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const channelId = storage.getString("channelId");

  // 모든 데이터 재요청 보내는 함수
  const fetchData = async () => {
    setRefreshing(true);
    await Promise.all([tagsRefetch()]);
    setRefreshing(false);
  };

  useEffect(() => {
    console.log("[VIEW] Search");
    Orientation.lockToPortrait();
  }, []);

  // 애니메이션 스타일
  const inputStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(
        inputSearchKeyword ? SIZES.width - 60 : SIZES.width - 30,
        {
          duration: 300,
        }
      ),
      transform: [
        {
          translateX: withTiming(inputSearchKeyword ? 30 : 0, {
            duration: 300,
          }),
        },
      ],
    };
  });

  const cancelStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(inputSearchKeyword ? 1 : 0, {
        duration: 250,
      }),
      transform: [
        {
          translateX: withTiming(inputSearchKeyword ? 0 : -100, {
            duration: 250,
          }),
        },
      ],
    };
  });

  // 전체 태그 리스트
  const {
    data: tagList,
    isLoading: tagsLoading,
    isError: tagsError,
    refetch: tagsRefetch,
  } = useGetAllTags(channelId);

  // 전체 태그, 미디어 검색
  const { data: searchResultList = [] } = useKeywordSearch(searchKeyword) as {
    data: SearchResultProps[];
  };

  // 태그로 조회한 미디어 리스트 가져오기
  let mediaLists = tagList?.map((categorizedId) => {
    return useGetTagMediaList({ channelId, categorizedId });
  });

  const mediaListsLoading = mediaLists?.some(
    (mediaList) => mediaList.isLoading
  );

  // 잘못된 데이터 요청 시 에러화면
  if (tagsError) {
    return <Error onRetry={fetchData} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.keywordInputArea}>
        <View style={styles.searchKeywordInputArea}>
          <Animated.View
            style={[styles.keywordSearchCancelBtnArea, cancelStyle]}
          >
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                setSearchKeyword("");
                setInputSearchKeyword(false);
              }}
            >
              <Icon
                name="chevron-back"
                size={32}
                color="#fff"
                style={styles.backIcon}
              />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.searchInputWrapper, inputStyle]}>
            <Icon
              name="search"
              size={24}
              color="#9E9E9E"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchKeywordInput}
              placeholder="미디어, 채널, 태그 검색"
              placeholderTextColor={"#9E9E9E"}
              onFocus={() => {
                setInputSearchKeyword(true);
              }}
              onChange={(e) => setSearchKeyword(e.nativeEvent.text)}
              value={searchKeyword}
            />
          </Animated.View>
        </View>
      </View>
      {!inputSearchKeyword ? (
        <ScrollView style={styles.contentsArea}>
          <View style={styles.tagRailArea}>
            <SearchTagRail tagList={tagList} navigation={navigation} />
          </View>
          <View style={styles.classificationArea}>
            <View style={styles.titleContainer}>
              <Text style={styles.mainTitle}>인기태그</Text>
            </View>
            {!mediaListsLoading ? (
              mediaLists.length > 0 ? (
                <ScrollView horizontal style={styles.scrollView}>
                  {tagList.map((tagName, tagIdx) => {
                    const { data: mediaList } = mediaLists[tagIdx];

                    return (
                      <ClassificationCards
                        key={tagIdx}
                        tagName={tagName}
                        tagIdx={tagIdx}
                        mediaList={mediaList}
                        navigation={navigation}
                      />
                    );
                  })}
                </ScrollView>
              ) : (
                <TagEmpty />
              )
            ) : (
              <SearchSkeletonPlaceholder />
            )}
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={styles.contentsArea}>
          {searchResultList.map((searchResult, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (searchResult.resultType === "media") {
                  navigation.navigate("MediaDetail", {
                    channelId: channelId,
                    media: searchResult,
                    objectId: searchResult.object_id,
                  });
                } else {
                  navigation.navigate("MediaList", {
                    categorized: "tag",
                    categorizedId: searchResult.tagName,
                    headerTitle: "#" + searchResult.tagName,
                  });
                }
              }}
            >
              {searchResult.resultType === "media" ? (
                <View style={styles.mediaBox}>
                  <View style={styles.mediaThumbnailArea}>
                    {!searchResult.poster_url ? (
                      <View style={styles.mediaThumbnailEmptyArea}>
                        <Text style={styles.mediaThumbnailEmptyText}>
                          media
                        </Text>
                      </View>
                    ) : (
                      <ImageBackground
                        source={{ uri: "https://" + searchResult.poster_url }}
                        resizeMode="cover"
                        style={styles.mediaThumbnail}
                        imageStyle={styles.mediaThumbnailImage}
                      />
                    )}
                  </View>
                  <View style={styles.mediaTextArea}>
                    <Text style={styles.mediaMainText}>
                      {!searchResult.poster_url
                        ? "none"
                        : removeFileExtension(searchResult.media_name!)}
                    </Text>
                    <Text style={styles.mediaSubText}>
                      {searchResult.duration}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.channelTagBox}>
                  <View
                    style={{
                      flex: 8,
                      flexDirection: "column",
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={styles.channelTagMainText}>
                        {searchResult.tagName}
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.channelTagSubText}>태그</Text>
                    </View>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollView: {
    marginLeft: 20,
    marginTop: 5,
  },
  keywordInputArea: {
    width: "100%",
    height: 40,
    marginBottom: 30,
  },
  searchKeywordInputArea: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  searchKeywordInput: {
    height: 50,
    width: SIZES.width - 128,
    fontFamily: "Pretendard-SemiBold",
    backgroundColor: "#242C32",
    borderRadius: 5,
    color: "#fff",
    paddingHorizontal: 10,
    fontSize: 16,
  },
  keywordSearchCancelBtnArea: {
    justifyContent: "center",
    position: "absolute",
  },
  keywordSearchCancelBtn: {
    fontFamily: "Pretendard-Bold",
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
  },
  contentsArea: {
    flex: 1,
  },
  classificationArea: {
    width: "100%",
    height: "100%",
    marginBottom: 20,
  },
  tagRailArea: {
    width: "100%",
    marginBottom: 20,
  },
  channelTagBox: {
    width: "100%",
    height: 70,
    paddingVertical: 10,
    paddingHorizontal: 30,
    flexDirection: "row",
  },
  channelTagTextContainer: {
    flex: 8,
    justifyContent: "center",
  },
  channelTagMainText: {
    fontFamily: "Pretendard-Bold",
    fontSize: 16,
    color: "#fff",
    marginLeft: 10,
  },
  channelTagSubText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 12,
    color: "#9D9FA0",
    marginLeft: 10,
  },
  mediaBox: {
    width: "100%",
    height: 101,
    paddingVertical: 10,
    paddingHorizontal: 30,
    flexDirection: "row",
  },
  mediaThumbnailArea: {
    flex: 1,
    backgroundColor: "#242527",
    borderRadius: 5,
  },
  mediaThumbnail: {
    flex: 1,
    justifyContent: "center",
  },
  mediaThumbnailImage: {
    borderRadius: 7,
  },
  mediaThumbnailEmptyArea: {
    backgroundColor: "#28292c",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  mediaThumbnailEmptyText: {
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
  },
  mediaTextArea: {
    flex: 2,
    justifyContent: "center",
    paddingLeft: 10,
  },
  mediaMainText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 20,
    color: "#fff",
    marginBottom: 4,
  },
  mediaSubText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 14,
    color: "#7A8287",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  mainTitle: {
    fontFamily: "Pretendard-Bold",
    color: "#fff",
    fontSize: 32,
  },
  viewMoreText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 16,
    color: "#898989",
  },
  searchIcon: {
    marginLeft: 8,
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#242C32",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  backIcon: {
    marginLeft: 10,
  },
});

export default Search;
