import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const SearchTagRail = ({ tagList, navigation }) => {
  const scrollViewRef = useRef(null);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.railContainer}
      >
        {tagList.map((tag) => (
          <TouchableOpacity
            key={`tagList${tag}`}
            style={styles.tag}
            onPress={() => {
              navigation.navigate("MediaList", {
                categorizedId: tag,
                headerTitle: "#" + tag,
              });
            }}
          >
            <Text style={styles.tagText}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  railContainer: {
    alignItems: "center",
  },
  tag: {
    backgroundColor: "#242C32",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#2C2C2C",
  },
  tagText: {
    fontFamily: "Pretendard-Medium",
    color: "#fff",
    fontSize: 20,
  },
});

export default SearchTagRail;
