import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const Error = ({ onRetry }) => {
  return (
    <View style={styles.errorContainer}>
      <Image
        style={styles.errorImage}
        source={require("../../assets/images/error.png")}
      />
      <Text style={styles.errorText}>데이터를 찾을 수 없습니다</Text>
      <Text style={styles.errorSubText}>네트워크 연결을 확인해주세요</Text>
      <TouchableOpacity style={styles.refreshButton} onPress={onRetry}>
        <Text style={styles.refreshButtonText}>새로고침</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  errorImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  errorText: {
    fontFamily: "Pretendard-Bold",
    color: "#F3564D",
    fontSize: 26,
    marginTop: 10,
  },
  errorSubText: {
    fontFamily: "Pretendard-Medium",
    color: "#898989",
    fontSize: 16,
    marginTop: 10,
  },
  refreshButton: {
    marginTop: 30,
    backgroundColor: "#F3564D",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  refreshButtonText: {
    fontFamily: "Pretendard-Bold",
    color: "#FFFFFF",
    fontSize: 20,
  },
});

export default Error;
