import React from "react";
import { View, Text } from "react-native";
import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";

const Error = () => {
  return (
    <View style={styles.errorContainer}>
      <LottieView
        style={styles.errorView}
        source={require("../../assets/images/error.json")}
        autoPlay
        loop={true}
      />
      <Text style={styles.errorText}>데이터를 찾을 수 없습니다...</Text>
      <Text style={styles.errorSubText}>네트워크 연결을 확인해주세요</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorView: {
    width: "70%",
    height: "20%",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  errorText: {
    fontFamily: "Pretendard-Medium",
    color: "#F3564D",
    fontSize: 24,
  },
  errorSubText: {
    fontFamily: "Pretendard-Regular",
    color: "#898989",
    fontSize: 16,
    marginTop: 10,
  },
});

export default Error;
