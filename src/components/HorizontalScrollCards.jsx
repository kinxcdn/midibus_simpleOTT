import React from 'react';
import {
  ScrollView,
  ImageBackground,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';

const HorizontalScrollCards = props => {
  const channelId = props.channelId;
  const mediaList = props.data;

  Orientation.lockToPortrait();

  return (
    <ScrollView horizontal={true} style={{marginLeft: 0}}>
      {mediaList.map((media, mediaIdx) => {
        return (
          <TouchableOpacity
            key={mediaIdx}
            onPress={() => {
              props.navigation.navigate('MediaDetail', {
                channelId: channelId,
                media: media,
              });
            }}>
            <View style={styles.mediaCard}>
              {typeof media.poster_url === 'undefined' ||
              media.poster_url === null ? (
                <View style={styles.mediaThumbnailEmptyArea}>
                  <Text style={styles.mediaThumbnailEmptyText}>
                    {media.media_name}
                  </Text>
                </View>
              ) : (
                <ImageBackground
                  source={{uri: 'https://' + media.poster_url}}
                  resizeMode="cover"
                  style={styles.mediaThumbnail}
                  imageStyle={{borderRadius: 7}}></ImageBackground>
              )}
            </View>

            <View style={styles.mediaNameArea}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 15,
                }}
                numberOfLines={2}>
                {media.media_name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const getScreenWidthSize = () => {
  const screenSize1 = Dimensions.get('screen').width;
  const screenSize2 = Dimensions.get('screen').height;

  return screenSize1 < screenSize2 ? screenSize1 : screenSize2;
};

const styles = StyleSheet.create({
  mediaCard: {
    width: getScreenWidthSize() - 20 - 30,
    height: ((getScreenWidthSize() - 20) * 9) / 16,
    backgroundColor: '#898989',
    margin: 10,
    borderRadius: 7,
  },
  mediaNameArea: {
    width: getScreenWidthSize() - 30,
    height: 60,
    paddingLeft: 20,
    paddingRight: 20,
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
});

export default HorizontalScrollCards;
