import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";

const TagRail = ({ tagList, onTagSelect }) => {
  const [selectedTag, setSelectedTag] = useState("전체");
  const scrollViewRef = useRef(null);
  const tags = ["전체", ...tagList];

  const handleTagPress = (tag) => {
    setSelectedTag(tag);
    onTagSelect(tag); // 선택된 태그를 부모 컴포넌트로 전달
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.railContainer}
      >
        {tags.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[
              selectedTag === tag
                ? tag === "전체"
                  ? styles.selectedAllTag
                  : styles.selectedTag
                : styles.tag,
            ]}
            onPress={() => handleTagPress(tag)}
          >
            {tag === "전체" ? (
              <View style={styles.iconTextContainer}>
                {selectedTag === tag ? (
                  <LinearGradient
                    colors={["#9EC95B", "#33AE71"]}
                    style={styles.gradientBackground}
                  >
                    <Icon name="pricetags" size={18} color="#fff" />
                    <Text style={styles.selectedAllTagText}>{tag}</Text>
                  </LinearGradient>
                ) : (
                  <>
                    <Icon name="pricetags" size={18} color="#fff" />
                    <Text style={styles.allTagText}>{tag}</Text>
                  </>
                )}
              </View>
            ) : (
              <Text
                style={[
                  styles.tagText,
                  selectedTag === tag && styles.selectedTagText,
                ]}
              >
                {tag}
              </Text>
            )}
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
    paddingVertical: 10,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  railContainer: {
    alignItems: "center",
  },
  tag: {
    backgroundColor: "#272727",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#272727",
  },
  selectedTag: {
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  selectedAllTag: {
    borderColor: "transparent",
    paddingHorizontal: 0,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tagText: {
    fontFamily: "Pretendard-Medium",
    color: "#fff",
    fontSize: 20,
  },
  selectedTagText: {
    color: "#000",
  },
  allTagText: {
    color: "#fff",
    fontFamily: "Pretendard-Medium",
    fontSize: 20,
    textAlign: "center",
    marginLeft: 10,
  },
  gradientBackground: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  selectedAllTagText: {
    color: "#fff", // Text color on top of the gradient
    fontFamily: "Pretendard-Medium",
    fontSize: 20,
    textAlign: "center",
    marginLeft: 10,
  },
});

export default TagRail;
