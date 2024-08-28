import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const TagEmpty = () => {
  return (
    <View style={styles.emptyContainer}>
      <Image
        style={styles.emptyImage}
        source={require("../../assets/images/tag_empty.png")}
      />
      <Text style={styles.emptyMainText}>현재 태그가 없습니다</Text>
      <Text style={styles.emptySubText}>미디어에 태그를 넣어주세요</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  emptyImage: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginTop: 60,
  },
  emptyMainText: {
    fontFamily: "Pretendard-Black",
    fontSize: 28,
    color: "#474E61",
    textAlign: "center",
    marginVertical: 10,
  },
  emptySubText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 18,
    color: "#474E61",
    textAlign: "center",
  },
});

export default TagEmpty;
