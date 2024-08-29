import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Input } from "@rneui/themed";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import { TouchableOpacity } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import Toast from "react-native-toast-message";
import base64 from "base-64";
import Orientation from "react-native-orientation-locker";

import { useGetLogin } from "@/apis/user/Queries/useGetLogin";

import { storage } from "@/constants/storage";

const Login = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userApiKey, setUserApiKey] = useState("");
  const [authHeader, setAuthHeader] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<number | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const isButtonDisabled = !userEmail || !userApiKey;

  const {
    data: tokenInfo,
    isError,
    refetch,
  } = useGetLogin({ authHeader, currentDate });

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  useEffect(() => {
    if (authHeader && currentDate) {
      refetch();
    }
  }, [authHeader, currentDate]);

  useEffect(() => {
    if (tokenInfo?.token) {
      storage.set("authKey", tokenInfo.token);
      navigation.navigate("ChannelSelection");
    } else if (isError) {
      handleLoginError();
    }
  }, [tokenInfo, isError]);

  const handleLoginError = () => {
    storage.clearAll();
    errorLoginToast();
  };

  const errorLoginToast = () => {
    Toast.show({
      type: "error",
      text1: "로그인 실패",
      text2: "잘못된 이메일 또는 API Key입니다.",
    });
  };

  const handleLogin = () => {
    const header = `Basic ${base64.encode(`${userEmail}:${userApiKey}`)}`;
    const date = Math.floor(Date.now() / 1000) + 3600;

    setAuthHeader(header);
    setCurrentDate(date);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                placeholder="이메일 주소를 입력해주세요"
                leftIcon={<Icon name="user" size={24} color="#fff" />}
                inputStyle={styles.inputText}
                onChangeText={(text) => setUserEmail(text)}
                value={userEmail}
                containerStyle={styles.input}
                inputContainerStyle={styles.customInputContainer}
              />
              <Input
                placeholder="API키를 입력해주세요"
                secureTextEntry={!showPassword}
                rightIcon={
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text style={styles.showPasswordText}>
                      {showPassword ? "숨기기" : "표시"}
                    </Text>
                  </TouchableOpacity>
                }
                leftIcon={<Icon name="lock" size={24} color="#fff" />}
                inputStyle={styles.inputText}
                onChangeText={(text) => setUserApiKey(text)}
                value={userApiKey}
                containerStyle={styles.input}
                inputContainerStyle={styles.customInputContainer}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPressOut={handleLogin}
                disabled={isButtonDisabled}
              >
                {isButtonDisabled ? (
                  <View style={[styles.loginButton, styles.disabledButton]}>
                    <Text style={[styles.loginText, styles.disabledButtonText]}>
                      로그인
                    </Text>
                  </View>
                ) : (
                  <LinearGradient
                    colors={["#33AE71", "#9EC95B"]}
                    style={styles.loginButton}
                  >
                    <Text style={styles.loginText}>로그인</Text>
                  </LinearGradient>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.emptySpace} />
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  emptySpace: {
    flex: 1,
    backgroundColor: "black",
  },
  mainContent: {
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20%",
  },
  logo: {
    height: 34,
    width: 210,
    marginVertical: 10,
  },
  inputContainer: {
    justifyContent: "center",
    marginBottom: 10,
    width: "100%",
  },
  customInputContainer: {
    backgroundColor: "#242C32",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderBottomWidth: 0,
  },
  input: {
    marginBottom: 8,
  },
  inputText: {
    fontFamily: "Pretendard-Medium",
    color: "#fff",
    fontSize: 16,
    paddingLeft: 10,
  },
  showPasswordText: {
    color: "#999999",
    fontSize: 14,
    marginRight: 10,
  },
  buttonContainer: {
    marginTop: 0,
    width: "100%",
  },
  loginButton: {
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontFamily: "Pretendard-Bold",
    color: "#fff",
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: "transparent",
    borderColor: "#A9A9A9",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButtonText: {
    color: "#A9A9A9",
  },
});

export default Login;
