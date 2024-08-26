import React, { useEffect, useRef } from "react";
import { Image, StyleSheet, SafeAreaView, Animated } from "react-native";
import { storage } from "../constants/storage";
import Orientation from "react-native-orientation-locker";

const Splash = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Opacity value for fade-in animation
  const translateYAnim = useRef(new Animated.Value(-50)).current; // Y position for slide-down animation

  useEffect(() => {
    console.log("[VIEW] Start");

    Orientation.lockToPortrait();
    storage.clearAll();

    // Start fade-in and slide-down animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();

    try {
      const authKey = storage.getString("authKey");

      setTimeout(() => {
        if (authKey === null || authKey === undefined) {
          navigation.navigate("Login");
        } else {
          navigation.navigate("BottomTabs");
        }
      }, 3000);
    } catch (error) {
      console.error("[ERROR] retrieving authKey", error);
    }
  }, [navigation, fadeAnim, translateYAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Image
        style={[
          styles.logoImage,
          {
            opacity: fadeAnim,
            transform: [{ translateY: translateYAnim }],
          },
        ]}
        source={require("../assets/images/logo_midibus_small.png")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  logoImage: {
    width: "50%",
    resizeMode: "contain",
  },
});

export default Splash;
