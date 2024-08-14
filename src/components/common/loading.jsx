import { View } from "react-native";
import LottieView from "lottie-react-native";
import { StyleSheet } from "react-native";

const Loading = () => {
  return (
    <View style={styles.loaderContainer}>
      <LottieView
        style={styles.lottieView}
        source={require("../../assets/images/loading.json")}
        autoPlay
        loop={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  lottieView: {
    width: "30%",
    height: "30%",
  },
});

export default Loading;
