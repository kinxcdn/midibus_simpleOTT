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
import * as config from "../constants/properties";
import ClassificationCards from "../components/ClassificationCards";
import Orientation from "react-native-orientation-locker";
import { useGetAllTags } from "../apis/tags/Queries/useGetAllTags";
import { useKeywordSearch } from "../apis/search/Queries/useKeywordSearch";
import Loading from "../components/common/loading";
import Error from "../components/common/Error";
import Header from "../components/common/Header";
import { removeFileExtension } from "../constants/removeFileExtension";
import SearchTagRail from "../components/SearchTagRail";
import { useGetLimitTagMediaList } from "../apis/media/Queries/useGetLimitTagMediaList";

const Search = ({ navigation }) => {
  const [inputSearchKeyword, setInputSearchKeyword] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const {
    data: tagList,
    isLoading: tagsLoading,
    isError: tagsError,
  } = useGetAllTags(config.CHANNEL);

  const { data: searchResultList = [] } = useKeywordSearch(searchKeyword);

  const mediaLists = tagList?.map((tagName) => {
    return useGetLimitTagMediaList(config.CHANNEL, 3, tagName);
  });

  useEffect(() => {
    console.log("[VIEW] Search");
    Orientation.lockToPortrait();
  }, []);

  if (tagsLoading) {
    return <Loading />;
  }

  if (tagsError) {
    return <Error />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.keywordInputArea}>
        <View
          style={[
            styles.searchKeywordInputArea,
            inputSearchKeyword && styles.searchKeywordInputAreaWithCancelBtn,
          ]}
        >
          <TextInput
            style={styles.searchKeywordInput}
            placeholder="미디어, 채널, 태그 검색"
            placeholderTextColor={"#ffffff"}
            onFocus={() => setInputSearchKeyword(true)}
            onChange={(e) => setSearchKeyword(e.nativeEvent.text)}
            value={searchKeyword}
          />
          {inputSearchKeyword && (
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                setSearchKeyword("");
                setInputSearchKeyword(false);
              }}
            >
              <View style={styles.keywordSearchCancelBtnArea}>
                <Text style={styles.keywordSearchCancelBtn}>취소</Text>
              </View>
            </TouchableOpacity>
          )}
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
            <ScrollView horizontal style={styles.scrollView}>
              {tagList.map((tagName, tagIdx) => {
                const {
                  data: mediaList,
                  isLoading,
                  isError,
                } = mediaLists[tagIdx];

                if (isLoading) {
                  return <Loading key={tagIdx} />;
                }

                if (isError) {
                  return <Error key={tagIdx} />;
                }

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
                    channelId: config.CHANNEL,
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
              <View style={styles.mediaBox}>
                <View style={styles.mediaThumbnailArea}>
                  {!searchResult.poster_url ? (
                    <View style={styles.mediaThumbnailEmptyArea}>
                      <Text style={styles.mediaThumbnailEmptyText}>media</Text>
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
                    {removeFileExtension(searchResult.media_name)}
                  </Text>
                  <Text style={styles.mediaSubText}>
                    {searchResult.duration}
                  </Text>
                </View>
              </View>
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
  searchKeywordInputAreaWithCancelBtn: {
    width: "100%",
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
  },
  searchKeywordInput: {
    flex: 1,
    height: 50,
    borderColor: "#2e2e2e",
    borderWidth: 1,
    backgroundColor: "#2e2e2e",
    borderRadius: 5,
    color: "#fff",
    paddingHorizontal: 15,
  },
  keywordSearchCancelBtnArea: {
    justifyContent: "center",
    width: 80,
    height: 50,
    marginLeft: 10,
    backgroundColor: "#DB202C",
    borderRadius: 5,
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
    fontFamily: "Pretendard-Bold",
    fontSize: 16,
    color: "#fff",
    marginBottom: 4,
  },
  mediaSubText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 13,
    color: "#fff",
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
});

export default Search;
