import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Alert,
  Text,
} from "react-native";
import { Button, Input } from "@rneui/themed";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import base64 from "base-64";
import * as config from "../constants/properties";
import Orientation from "react-native-orientation-locker";
import { storage } from "../constants/storage";
import { useGetLogin } from "../apis/user/Queries/useGetLogin";

const Login = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userApiKey, setUserApiKey] = useState("");
  const [authHeader, setAuthHeader] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);

  const {
    data: tokenInfo,
    isError,
    refetch,
  } = useGetLogin(authHeader, currentDate);

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  useEffect(() => {
    if (tokenInfo && tokenInfo.token) {
      storage.set("authKey", tokenInfo.token);
      storage.set("channelId", config.CHANNEL);
      navigation.navigate("BottomTabs");
    } else if (isError) {
      handleLoginError();
    }
  }, [tokenInfo, isError]);

  const handleLoginError = () => {
    storage.clearAll();
    Alert.alert("로그인 실패", "잘못된 이메일 또는 API Key입니다.", [
      { text: "확인" },
    ]);
  };

  const handleLogin = () => {
    if (!userEmail || !userApiKey) {
      Alert.alert(
        "입력 오류",
        userEmail ? "API Key를 입력해주세요." : "이메일을 입력해주세요.",
        [{ text: "확인" }]
      );
      return;
    }

    const header = `Basic ${base64.encode(`${userEmail}:${userApiKey}`)}`;
    const date = Math.floor(Date.now() / 1000) + 3600;

    setAuthHeader(header);
    setCurrentDate(date);

    refetch();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.emptySpace} />
      <View style={styles.mainContent}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/logo_midibus_small.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="이메일"
            leftIcon={<Icon name="user" size={24} color="#fff" />}
            inputStyle={styles.inputText}
            onChangeText={(text) => setUserEmail(text)}
            value={userEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="API Key"
            secureTextEntry={true}
            leftIcon={<Icon name="key" size={24} color="#fff" />}
            inputStyle={styles.inputText}
            onChangeText={(text) => setUserApiKey(text)}
            value={userApiKey}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button buttonStyle={styles.loginButton} onPressOut={handleLogin}>
            <Text style={styles.loginText}>로그인</Text>
          </Button>
        </View>
      </View>
      <View style={styles.emptySpace} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
  },
  emptySpace: {
    flex: 2,
    backgroundColor: "black",
  },
  mainContent: {
    flex: 4,
  },
  logoContainer: {
    flex: 2,
    backgroundColor: "black",
    alignContent: "center",
  },
  logo: {
    alignSelf: "center",
    marginTop: 60,
    height: 34,
    width: 210,
  },
  inputContainer: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: "black",
  },
  inputText: {
    fontFamily: "Pretendard-Medium",
    color: "#fff",
    paddingLeft: 10,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "black",
    paddingLeft: 40,
    paddingRight: 40,
  },
  loginButton: {
    backgroundColor: "#58C3BB",
    height: 50,
    marginTop: 5,
    borderRadius: 5,
  },
  loginText: {
    fontFamily: "Pretendard-Bold",
    color: "#fff",
    fontSize: 16,
  },
});

export default Login;
