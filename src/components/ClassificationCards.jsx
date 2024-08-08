import React from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ClassificationCards = props => {
  const classificationType = props.dataType;
  const classificationList = props.data;

  const PRE_SHOW_COUNT = 5;

  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

  return (
    <ScrollView horizontal style={styles.scrollView}>
      {classificationList.slice(0, PRE_SHOW_COUNT).map((tagName, tagIdx) => {
        let paramsForMediaList = {
          categorized: classificationType,
          categorizedId: tagName,
          headerTitle: '#' + tagName,
        };

        return (
          <TouchableOpacity
            key={tagIdx}
            onPress={() => {
              props.navigation.navigate('MediaList', paramsForMediaList);
            }}>
            <View
              style={[
                styles.classificationCard,
                {backgroundColor: generateRandomColor()},
                tagIdx === 0 && styles.firstClassificationCard,
              ]}>
              <Text style={styles.classificationNameText}>{tagName}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginLeft: 20,
    marginTop: 5,
  },
  firstClassificationCard: {
    marginLeft: 0,
  },
  classificationCard: {
    width: 150,
    height: 150,
    margin: 5,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  classificationNameText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '500',
  },
});

export default ClassificationCards;
