import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  Alert,
  Text,
} from "react-native";
import { Button, Input } from "@rneui/themed";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import base64 from "base-64";
import * as config from "../constants/properties";
import Orientation from "react-native-orientation-locker";
import { storage } from "../constants/storage";

import axios from "axios";

const Login = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userApiKey, setUserApiKey] = useState("");

  const _onPressOut = () => {
    console.log(">> Login");
    console.log(userEmail + " // " + userApiKey);
    if (userEmail.length === 0) {
      Alert.alert(
        "이메일을 입력해주세요.",
        "",
        [
          {
            text: "확인",
            onPress: () => {},
          },
        ],
        { cancelable: false }
      );

      return;
    }
    if (userApiKey.length === 0) {
      Alert.alert(
        "API Key를 입력해주세요.",
        "",
        [
          {
            text: "확인",
            onPress: () => {},
          },
        ],
        { cancelable: false }
      );

      return;
    }

    setAuthKey(userEmail, userApiKey);
  };

  const setAuthKey = async (email, apiKey) => {
    const authHeader = "Basic " + base64.encode(email + ":" + apiKey);
    const currentDate = Math.floor(
      (new Date().getTime() + 60 * 60 * 1000) / 1000
    );

    const tokenUrl = `${config.MIDIBUS_API}/v2/token?expire=${currentDate}`;

    try {
      const response = await axios.get(tokenUrl, {
        headers: {
          Authorization: authHeader,
        },
      });

      const tokenInfo = response.data;

      console.log(tokenInfo);

      if (tokenInfo && tokenInfo.token) {
        await storage.set("authKey", tokenInfo.token);
        await storage.set("channelId", config.CHANNEL);

        navigation.navigate("BottomTabs");
      } else {
        await storage.clearAll();

        Alert.alert(
          tokenInfo.msg || "Error",
          tokenInfo.code || "",
          [
            {
              text: "확인",
              onPress: () => {},
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.error("[ERROR] setAuthKey\n" + error.message);

      Alert.alert(
        error.message,
        "",
        [
          {
            text: "확인",
            onPress: () => {},
          },
        ],
        { cancelable: false }
      );
    }
  };

  useEffect(() => {
    console.log("[VIEW] Login");

    Orientation.lockToPortrait();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 2, backgroundColor: "black" }}></View>
      <View style={{ flex: 4 }}>
        <View
          style={{ flex: 2, backgroundColor: "black", alignContent: "center" }}
        >
          <Image
            source={require("../assets/images/logo_midibus_small.png")}
            style={{
              alignSelf: "center",
              marginTop: 60,
              height: 34,
              width: 210,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            paddingLeft: 40,
            paddingRight: 40,
            backgroundColor: "black",
          }}
        >
          <Input
            placeholder="이메일"
            leftIcon={<Icon name="user" size={24} color="#fff" />}
            inputStyle={{ color: "#fff", paddingLeft: 10 }}
            onChangeText={(text) => setUserEmail(text)}
            value={userEmail}
          />
        </View>
        <View
          style={{
            flex: 1,
            paddingLeft: 40,
            paddingRight: 40,
            backgroundColor: "black",
          }}
        >
          <Input
            placeholder="API Key"
            secureTextEntry={true}
            leftIcon={<Icon name="key" size={24} color="#fff" />}
            inputStyle={{ color: "#fff", paddingLeft: 10 }}
            onChangeText={(text) => setUserApiKey(text)}
            value={userApiKey}
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: "black",
            paddingLeft: 40,
            paddingRight: 40,
          }}
        >
          <Button
            buttonStyle={{
              backgroundColor: "#58C3BB",
              height: 50,
              marginTop: 5,
            }}
            onPressOut={_onPressOut}
          >
            <Text style={styles.LoginText}>로그인</Text>
          </Button>
        </View>
      </View>
      <View style={{ flex: 2, backgroundColor: "black" }}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
  },
  text: {
    color: "blue",
    backgroundColor: "red",
  },
  LoginText: {
    fontWeight: "800",
    color: "#fff",
    fontSize: 14,
  },
  searchKeywordInputArea: {
    width: Dimensions.get("window").width - 80,
    height: 40,
    alignSelf: "flex-start",
    paddingLeft: 30,
    paddingRight: 30,
  },
});

export default Login;
