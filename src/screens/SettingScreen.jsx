import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Linking,
  SafeAreaView,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { storage } from "../constants/storage";
import RNFS from "react-native-fs";
import Orientation from "react-native-orientation-locker";
import Icon from "react-native-vector-icons/Ionicons";

// cache data 처리 로직
const convertHumanbytes = (bytesValue, decimals = 2) => {
  if (!bytesValue) return "0 bytes";
  const k = 1024;
  const sizes = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytesValue) / Math.log(k));
  return `${parseFloat((bytesValue / Math.pow(k, i)).toFixed(decimals))} ${
    sizes[i]
  }`;
};

const Settings = ({ navigation }) => {
  useEffect(() => {
    console.log("[VIEW] Settings");
    Orientation.lockToPortrait();
  }, []);

  // 이용 약관 관련
  const showTermsAlert = () => {
    const terms = [
      {
        text: "개인정보처리 방침",
        url: "https://www.kinx.net/agreements/agreements-3/policy01/",
      },
      {
        text: "KINX CDN(미디버스) 서비스 이용약관",
        url: "https://www.kinx.net/agreements/agreements/agreement03/",
      },
    ];

    Alert.alert(
      "약관 원문 보기",
      null,
      [
        ...terms.map((term) => ({
          text: term.text,
          onPress: () => Linking.openURL(term.url),
        })),
        {
          text: "취소",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const handleClearCache = () => {
    RNFS.exists(RNFS.CachesDirectoryPath).then((exists) => {
      if (!exists) {
        return Alert.alert(
          "저장된 캐시 데이터 삭제",
          "캐시에 임시 저장된 데이터(0 bytes)를 삭제합니다.",
          [{ text: "확인", style: "cancel" }],
          { cancelable: false }
        );
      }

      RNFS.readDir(RNFS.CachesDirectoryPath).then((cacheFiles) => {
        const cacheFileSize = cacheFiles.reduce(
          (acc, file) => acc + file.size,
          0
        );

        const deleteFiles = () => {
          cacheFiles.forEach((file) => {
            RNFS.unlink(file.path).catch((err) =>
              console.error("Failed to delete file", err)
            );
          });
        };

        Alert.alert(
          "저장된 캐시 데이터 삭제",
          `캐시에 임시 저장된 데이터(${convertHumanbytes(
            cacheFileSize
          )})를 삭제합니다.`,
          [
            {
              text: "취소",
              style: "cancel",
            },
            {
              text: "삭제",
              onPress: deleteFiles,
            },
          ],
          { cancelable: false }
        );
      });
    });
  };

    // 로그아웃 관련 로직
  const handleLogout = () => {
    Alert.alert(
      "로그아웃",
      "정말 로그아웃 하시겠어요?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "로그아웃",
          onPress: () => {
            storage.clearAll();
            navigation.navigate("Login");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerArea}>
        <Text style={styles.headerText}>설정</Text>
      </View>
      <ScrollView style={styles.contentsArea}>
        <View style={styles.settingsMenu}>
          <Text style={styles.settingsMenuName}>버전정보</Text>
          <Text style={styles.version}>0.0.1</Text>
        </View>
        <TouchableOpacity onPress={showTermsAlert}>
          <View style={styles.settingsMenu}>
            <Text style={styles.settingsMenuName}>약관</Text>
            <Icon name="chevron-forward-outline" size={20} color={"#7A8287"} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleClearCache}>
          <View style={styles.settingsMenu}>
            <Text style={styles.settingsMenuName}>저장된 캐시 데이터 삭제</Text>
            <Icon name="chevron-forward-outline" size={20} color={"#7A8287"} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.settingsMenu}>
            <Text style={styles.settingsMenuName}>로그아웃</Text>
            <Icon name="chevron-forward-outline" size={20} color={"#7A8287"} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  headerArea: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    paddingLeft: 30,
    backgroundColor: "#1C2022",
  },
  headerText: {
    fontFamily: "Pretendard-Bold",
    fontSize: 30,
    color: "#fff",
  },
  contentsArea: {
    width: "100%",
    flex: 1,
    marginTop: 20,
  },
  settingsMenu: {
    backgroundColor: "#1C2022",
    height: 60,
    marginBottom: 5,
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settingsMenuName: {
    fontFamily: "Pretendard-SemiBold",
    color: "#fff",
    fontSize: 18,
  },
  version: {
    fontFamily: "Pretendard-Medium",
    color: "#fff",
    fontSize: 16,
  },
});

export default Settings;
