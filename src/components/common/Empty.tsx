import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Empty = ({ message }) => {
  return (
    <View style={styles.emptyContainer}>
      <Image
        style={styles.emptyImage}
        source={require("../../assets/images/empty.png")}
      />
      <Text style={styles.emptySubText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  emptyImage: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  emptySubText: {
    fontFamily: "Pretendard-ㅠㅐ",
    fontSize: 16,
    color: "#474E61",
    textAlign: "center",
  },
});

export default Empty;
