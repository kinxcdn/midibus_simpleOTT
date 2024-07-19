import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import * as config from '../assets/properties';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import ClassificationCards from '../components/ClassificationCards';
import Orientation from 'react-native-orientation-locker';
import {authAxios} from '../utils/axios';

const Search = props => {
  const [tagList, setTagList] = useState([]);

  const [inputSearchKeyword, setInputSearchKeyword] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResultList, setSearchResultList] = useState([]);

  /*
   * 전체 태그 리스트
   */
  const getAllTags = async () => {
    console.log('>> getAllTags');

    console.log(config.CHANNEL);
    // 수정해야함
    try {
      const response = await authAxios.get(`/v2/channel/${config.CHANNEL}/tag`);

      const _tagList = response.data;

      if (typeof _tagList !== 'undefined' && _tagList !== null) {
        if (
          typeof _tagList.tag_list !== 'undefined' &&
          _tagList.tag_list !== null &&
          _tagList.tag_list.length > 0
        ) {
          setTagList(_tagList.tag_list);
        } else {
          //
        }
      } else {
        //
      }
    } catch (error) {
      console.error('Error fetching tag list:', error);
      // 에러 처리 로직 추가 (필요 시)
    }
  };

  /*
   검색어 입력창에 대한 이벤트 처리 & 검색 수행
  */
  const _onFocus = () => {
    console.log('>>> onFocus [input]');
    setInputSearchKeyword(true);
  };

  const _onChange = inputEvent => {
    console.log('>>> onChante [input]');
    setSearchKeyword(inputEvent.nativeEvent.text);
    executeKeywordSearch(inputEvent.nativeEvent.text);
  };

  const executeKeywordSearch = async _searchKeyword => {
    let _searchResultList = [];

    console.log(
      `${config.MIDIBUS_API}/v2/channel/${config.CHANNEL}/tag?keyword=${_searchKeyword}`,
    );

    // 수정해야함
    try {
      const tagResponse = await authAxios.get(
        `/v2/channel/${config.CHANNEL}/tag?keyword=${_searchKeyword}`,
      );

      const _keywordSearchTagList = tagResponse.data;

      if (_keywordSearchTagList && _keywordSearchTagList.tag_list) {
        const searchResultTagList = _keywordSearchTagList.tag_list;

        if (searchResultTagList.length > 0) {
          for (const tag of searchResultTagList) {
            _searchResultList.push({
              tagName: tag,
              resultType: 'tag',
            });
          }
        }
      }

      const objectResponse = await authAxios.get(
        `/v2/channel/${config.CHANNEL}?keyword=${_searchKeyword}`,
      );

      const _keywordSearchObjectList = objectResponse.data;

      if (_keywordSearchObjectList && _keywordSearchObjectList.object_list) {
        const searchResultObjectList = _keywordSearchObjectList.object_list;

        if (searchResultObjectList.length > 0) {
          for (const obj of searchResultObjectList) {
            obj.resultType = 'media';
            _searchResultList.push(obj);
          }
        }
      }

      setSearchResultList(_searchResultList);
    } catch (error) {
      console.error('Error executing keyword search:', error);
      // 필요한 경우 추가 에러 처리 로직
    }
  };

  useEffect(() => {
    console.log('[VIEW] Search');

    Orientation.lockToPortrait();

    // 전체 태그 리스트
    getAllTags();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerArea}>
        <View style={{alignItems: 'flex-end', marginRight: 30, marginTop: 20}}>
          <Icon name="person-circle-outline" size={35} color={'#ffffff'} />
        </View>
      </View>
      <View style={styles.keywordInputArea}>
        <View
          style={
            inputSearchKeyword === false
              ? styles.searchKeywordInputAreaWithCancelBtn
              : styles.searchKeywordInputArea
          }>
          <TextInput
            style={styles.searchKeywordInput}
            placeholder="미디어, 채널, 태그 검색"
            placeholderTextColor={'#ffffff'}
            onFocus={_onFocus}
            onChange={_onChange}
            value={searchKeyword}></TextInput>
        </View>
        {inputSearchKeyword === false ? null : (
          <View style={styles.keywordSearchCancelBtnArea}>
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                setSearchKeyword('');
                setInputSearchKeyword(false);
                setSearchResultList([]);
              }}>
              <Text style={styles.keywordSearchCancelBtn}>취소</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {inputSearchKeyword === false ? (
        <ScrollView style={styles.contentsArea}>
          {/* 태그 */}
          <View style={styles.classificationArea}>
            <View style={styles.classificationHeaderArea}>
              <View style={styles.classificationTitleArea}>
                <Text style={styles.classificationTitle}>태그</Text>
              </View>
              <View style={styles.viewAllBtnArea}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('TagList', {
                      headerTitle: '태그',
                      data: tagList,
                    });
                  }}>
                  <Text style={styles.viewAllBtn}>모두보기</Text>
                </TouchableOpacity>
              </View>
            </View>
            <ClassificationCards
              dataType={'tag'}
              data={tagList}
              navigation={props.navigation}
            />
          </View>
          {/* // 태그 */}
          {/* 인기 태그 */}
          <View style={styles.classificationArea}>
            <View style={styles.classificationHeaderArea}>
              <View style={styles.classificationTitleArea}>
                <Text style={styles.classificationTitle}>인기 태그</Text>
              </View>
              <View style={styles.viewAllBtnArea}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.push('TagList', {
                      headerTitle: '태그',
                      data: tagList,
                    });
                  }}>
                  <Text style={styles.viewAllBtn}>모두보기</Text>
                </TouchableOpacity>
              </View>
            </View>
            <ClassificationCards
              dataType={'tag'}
              data={tagList}
              navigation={props.navigation}
            />
          </View>
          {/* // 인기 태그 */}
        </ScrollView>
      ) : (
        <ScrollView style={styles.contentsArea}>
          {searchResultList.map((searchResult, searchResultIdx) => {
            return (
              <TouchableOpacity
                key={searchResultIdx}
                onPress={() => {
                  if (searchResult.resultType === 'media') {
                    props.navigation.navigate('MediaDetail', {
                      channelId: config.CHANNEL,
                      media: searchResult,
                    });
                  } else {
                    props.navigation.navigate('MediaList', {
                      categorized: 'tag',
                      categorizedId: searchResult.tagName,
                      headerTitle: '#' + searchResult.tagName,
                    });
                  }
                }}>
                {searchResult.resultType === 'media' ? (
                  <View style={styles.mediaBox}>
                    <View style={styles.mediaThumbnailArea}>
                      {typeof searchResult.poster_url === 'undefined' ||
                      searchResult.resultImg === null ? (
                        <View style={styles.mediaThumbnailEmptyArea}>
                          <Text style={styles.mediaThumbnailEmptyText}>
                            media
                          </Text>
                        </View>
                      ) : (
                        <ImageBackground
                          source={{uri: 'https://' + searchResult.poster_url}}
                          resizeMode="cover"
                          style={styles.mediaThumbnail}
                          imageStyle={{borderRadius: 7}}></ImageBackground>
                      )}
                    </View>
                    <View style={styles.mediaTextArea}>
                      <View style={{flex: 1}}>
                        <Text style={styles.mediaMainText}>
                          {searchResult.media_name}
                        </Text>
                      </View>
                      <View style={{flex: 1}}>
                        <Text style={styles.mediaSubText}>
                          {searchResult.duration}
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View style={styles.channelTagBox}>
                    <View
                      style={{
                        flex: 8,
                        flexDirection: 'column',
                      }}>
                      <View style={{flex: 1}}>
                        <Text style={styles.channelTagMainText}>
                          {searchResult.tagName}
                        </Text>
                      </View>
                      <View style={{flex: 1}}>
                        <Text style={styles.channelTagSubText}>태그</Text>
                      </View>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
  },
  headerArea: {
    width: '100%',
    height: 80,
  },
  keywordInputArea: {
    width: '100%',
    height: 40,
    marginBottom: 30,
    flextDirection: 'row',
  },
  searchKeywordInputArea: {
    width: Dimensions.get('window').width - 80,
    height: 40,
    alignSelf: 'flex-start',
    paddingLeft: 30,
    paddingRight: 30,
  },
  searchKeywordInputAreaWithCancelBtn: {
    width: Dimensions.get('window').width,
    height: 40,
    alignSelf: 'flex-start',
    paddingLeft: 30,
    paddingRight: 30,
  },
  searchKeywordInput: {
    width: '100%',
    height: 40,
    borderColor: '#2e2e2e',
    borderWidth: 1,
    backgroundColor: '#2e2e2e',
    borderRadius: 5,
    color: '#ffffff',
    paddingLeft: 10,
    paddingRight: 10,
  },
  keywordSearchCancelBtnArea: {
    width: 80,
    height: 40,
    alignSelf: 'flex-end',
    marginTop: -40,
    paddingRight: 30,
  },
  keywordSearchCancelBtn: {
    fontSize: 18,
    color: '#ffffff',
    marginTop: 7,
  },
  contentsArea: {
    width: '100%',
    flex: 1,
  },
  classificationArea: {
    width: '100%',
    height: 220,
  },
  classificationHeaderArea: {
    width: '100%',
    height: 50,
  },
  classificationTitleArea: {
    marginTop: 10,
    width: 100,
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  classificationTitle: {
    color: '#ffffff',
    fontSize: 25,
    textAlign: 'left',
  },
  viewAllBtnArea: {
    marginTop: -20,
    width: 80,
    alignSelf: 'flex-end',
    marginRight: 30,
  },
  viewAllBtn: {
    color: '#ffffff',
    textAlign: 'right',
    fontSize: 18,
    color: '#898989',
  },
  channelTagBox: {
    width: '100%',
    height: 70,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: 'row',
  },
  channelTagIconArea: {
    flex: 1,
    backgroundColor: '#242527',
    borderRadius: 5,
  },
  channelTagIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  channelTagMainText: {
    // fontWeight: 600,
    fontSize: 15,
    color: '#ffffff',
    textAlign: 'left',
    marginLeft: 10,
  },
  channelTagSubText: {
    fontSize: 13,
    color: '#ffffff',
    textAlign: 'left',
    marginLeft: 10,
  },
  mediaBox: {
    width: '100%',
    height: 101,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: 'row',
  },
  mediaThumbnailArea: {
    flex: 1,
    backgroundColor: '#242527',
    borderRadius: 5,
  },
  mediaThumbnail: {
    flex: 1,
    justifyContent: 'center',
  },
  mediaThumbnailEmptyArea: {
    backgroundColor: '#28292c',
    height: '100%',
    borderRadius: 7,
    justifyContent: 'center',
  },
  mediaThumbnailEmptyText: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    marginTop: -10,
  },
  mediaTextArea: {
    flex: 2,
    flexDirection: 'column',
  },
  mediaMainText: {
    // fontWeight: 600,
    fontSize: 15,
    color: '#ffffff',
    textAlign: 'left',
    marginTop: 18,
    marginLeft: 10,
  },
  mediaSubText: {
    fontSize: 13,
    color: '#ffffff',
    textAlign: 'left',
    marginLeft: 10,
  },
});

export default Search;
