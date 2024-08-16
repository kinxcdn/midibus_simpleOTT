import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as config from "../constants/properties";
import Icon from "react-native-vector-icons/dist/Ionicons";
import ClassificationCards from "../components/ClassificationCards";
import Orientation from "react-native-orientation-locker";
import { removeFileExtension } from "../constants/removeFileExtension";
import { useGetAllTags } from "../apis/tags/Queries/useGetAllTags";
import { useKeywordSearch } from "../apis/search/Queries/useKeywordSearch";
import Loading from "../components/common/loading";
import Error from "../components/common/Error";
import { SIZES } from "../styles/theme";

const Search = ({ navigation }) => {
  const [inputSearchKeyword, setInputSearchKeyword] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const {
    data: tagList,
    isLoading: tagsLoading,
    isError: tagsError,
  } = useGetAllTags(config.CHANNEL);

  const {
    data: searchResultList = [], // 기본값으로 빈 배열을 설정합니다.
  } = useKeywordSearch(searchKeyword);

  /*
   검색어 입력창에 대한 이벤트 처리 & 검색 수행
  */
  const _onFocus = () => {
    setInputSearchKeyword(true);
  };

  const _onChange = (inputEvent) => {
    setSearchKeyword(inputEvent.nativeEvent.text);
  };

  useEffect(() => {
    console.log("[VIEW] Search");

    Orientation.lockToPortrait();
  }, []);

  // 모든 쿼리가 로딩 중이면 로딩 스피너를 표시
  if (tagsLoading) {
    return <Loading />;
  }

  // 에러 상태 처리
  if (tagsError) {
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
            onFocus={_onFocus}
            onChange={_onChange}
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
      {inputSearchKeyword === false ? (
        <ScrollView style={styles.contentsArea}>
          {/* 태그 */}
          <View style={styles.classificationArea}>
            <View style={styles.titleContainer}>
              <Text style={styles.mainTitle}>태그</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("TagList", {
                    headerTitle: "태그",
                    tagList: tagList,
                  });
                }}
              >
                <Text style={styles.viewMoreText}>모두보기</Text>
              </TouchableOpacity>
            </View>
            <ClassificationCards
              classificationList={tagList}
              navigation={navigation}
            />
          </View>
          {/* // 태그 */}
          {/* 인기 태그 */}
          <View style={styles.classificationArea}>
            <View style={styles.titleContainer}>
              <Text style={styles.mainTitle}>인기태그</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.push("TagList", {
                    headerTitle: "태그",
                    tagList: tagList,
                  });
                }}
              >
                <Text style={styles.viewMoreText}>모두보기</Text>
              </TouchableOpacity>
            </View>
            <ClassificationCards
              classificationList={tagList}
              navigation={navigation}
            />
          </View>
          {/* // 인기 태그 */}
        </ScrollView>
      ) : (
        <ScrollView style={styles.contentsArea}>
          {searchResultList.map((searchResult, searchResultIdx) => (
            <TouchableOpacity
              key={searchResultIdx}
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
                      {removeFileExtension(searchResult.media_name)}
                    </Text>
                    <Text style={styles.mediaSubText}>
                      {searchResult.duration}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.channelTagBox}>
                  <View style={styles.channelTagTextContainer}>
                    <Text style={styles.channelTagMainText}>
                      {searchResult.tagName}
                    </Text>
                    <Text style={styles.channelTagSubText}>태그</Text>
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
  headerArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
    paddingHorizontal: 15,
  },
  logoImage: {
    width: "40%",
    resizeMode: "contain",
  },
  iconContainer: {
    marginRight: 20,
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
    width: SIZES.width - 15,
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
    height: 220,
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
    color: "#fff",
    fontWeight: "800",
    fontSize: 24,
  },
  viewMoreText: {
    fontFamily: "Pretendard-Medium",
    fontSize: 16,
    color: "#898989",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});

export default Search;
