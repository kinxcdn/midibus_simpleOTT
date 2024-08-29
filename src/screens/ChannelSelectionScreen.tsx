import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";

import { storage } from "@/constants/storage";
import { dateFormatting } from "@/constants/dateFormatting";

const channels = [
  {
    channel_id: "ch_190c1550",
    channel_name: "기본 채널",
    created: "20240718175551",
    modified: "20240718175551",
    open: true,
    play_control: false,
    security_list: null,
  },
  {
    channel_id: "ch_190c4a4d",
    channel_name: "라이브 기본 채널",
    created: "20240718175551",
    modified: "20240718175551",
    open: true,
    play_control: false,
    security_list: null,
  },
  {
    channel_id: "ch_19180982",
    channel_name: "CDN 채널",
    created: "20240826171248",
    modified: "20240826171248",
    open: true,
    play_control: false,
    security_list: null,
  },
];

const ChannelItem = ({ channel, isSelected, onSelect }) => (
  <TouchableOpacity onPress={() => onSelect(channel.channel_id)}>
    <LinearGradient
      start={{ x: 0, y: 0 }} // 그라데이션 시작점 (세로 방향)
      end={{ x: 0.2, y: 0 }} // 그라데이션 끝점 (세로 방향)
      colors={isSelected ? ["#2ED88F", "#242C32"] : ["#242C32", "#242C32"]}
      style={[styles.channelItem, isSelected && styles.selectedChannel]}
    >
      <View style={styles.channelInfo}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 20,
          }}
        >
          {isSelected && (
            <Icon
              name="check-circle"
              size={28}
              color="#2ED88F"
              style={{ position: "absolute", zIndex: 3 }}
            />
          )}
          <View style={styles.circleIcon} />
        </View>
        <View>
          <Text style={styles.channelName}>{channel.channel_name}</Text>
          <Text style={styles.channelDate}>
            {dateFormatting(channel.created)}
          </Text>
        </View>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const ChannelSelection = ({ navigation }) => {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  const handleSelectChannel = (channelId) => {
    setSelectedChannel(channelId);
  };

  const handleNavigate = () => {
    if (selectedChannel !== null) {
      console.log(selectedChannel);
      storage.set("channelId", selectedChannel);
      navigation.navigate("BottomTabs");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logo_midibus_small.png")}
          style={styles.logo}
        />
      </View>
      <Text style={styles.headerText}>채널을 선택해주세요</Text>
      <FlatList
        data={channels}
        keyExtractor={(item) => item.channel_id}
        renderItem={({ item }) => (
          <ChannelItem
            channel={item}
            isSelected={item.channel_id === selectedChannel}
            onSelect={handleSelectChannel}
          />
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleNavigate}>
        {!selectedChannel ? (
          <View style={[styles.checkButton, styles.disabledButton]}>
            <Text style={[styles.checkText, styles.disabledButtonText]}>
              이동
            </Text>
          </View>
        ) : (
          <LinearGradient
            colors={["#33AE71", "#9EC95B"]}
            style={styles.checkButton}
          >
            <Text style={styles.checkText}>이동</Text>
          </LinearGradient>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // 검은 배경
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "15%",
    marginTop: 30,
  },
  logo: {
    height: 34,
    width: 210,
    marginVertical: 10,
  },
  headerText: {
    fontFamily: "Pretendard-Bold",
    fontSize: 20,
    color: "#fff",
    marginBottom: 20,
  },
  channelItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#242C32",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedChannel: {
    backgroundColor: "#00543A", // 선택된 채널의 배경색
  },
  channelInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  circleIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#303746",
    borderRadius: 20,
  },
  channelName: {
    fontFamily: "Pretendard-ExtraBold",
    color: "#fff",
    fontSize: 20,
    marginBottom: 5,
  },
  channelDate: {
    fontFamily: "Pretendard-Medium",
    color: "#9E9E9E",
    fontSize: 14,
  },
  button: {
    marginVertical: 40,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  checkButton: {
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkText: {
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

export default ChannelSelection;
