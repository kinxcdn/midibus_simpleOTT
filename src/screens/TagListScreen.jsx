import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const TagList = (props) => {
  console.log("[VIEW] Tag List");
  const tagList = props.route.params.data;

  const generateRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");
    return `#${randomColor}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollArea}>
        <View style={styles.contentsArea}>
          {tagList.map((tagName, tagIdx) => {
            return (
              <TouchableOpacity
                key={tagIdx}
                onPress={() => {
                  props.navigation.navigate("MediaList", {
                    categorized: "tag",
                    categorizedId: tagName,
                    headerTitle: "#" + tagName,
                  });
                }}
              >
                <View
                  style={[
                    styles.tagBox,
                    {
                      backgroundColor: generateRandomColor(),
                    },
                  ]}
                >
                  <Text style={styles.tagNameText} numberOfLines={1}>
                    {tagName}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  scrollArea: {
    width: "100%",
    flex: 1,
  },
  contentsArea: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    paddingTop: 10,
    justifyContent: "flex-start",
    paddingBottom: 80,
  },
  tagBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: (Dimensions.get("window").width - 30 - 20 - 30) / 2,
    height: (Dimensions.get("window").width - 30 - 20 - 30) / 2,
    margin: 10,
    borderRadius: 7,
  },
  tagNameText: {
    fontSize: 25,
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "600",
  },
});

export default TagList;
