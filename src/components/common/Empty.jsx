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
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  emptySubText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
});

export default Empty;
