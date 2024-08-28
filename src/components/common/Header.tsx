import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/dist/Ionicons";

const Header = ({ navigation }) => {
  return (
    <View style={styles.headerArea}>
      <Image
        source={require("../../assets/images/logo_midibus_small.png")}
        style={styles.logoImage}
      />
      <TouchableOpacity onPress={() => navigation.navigate("ChannelSelection")}>
        <View style={styles.iconContainer}>
          <Icon name="albums-outline" size={35} color={"#9E9E9E"} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 70,
  },
  logoImage: {
    width: "40%",
    objectFit: "contain",
    marginLeft: 15,
  },
  iconContainer: {
    alignItems: "flex-end",
    marginRight: 20,
  },
});

export default Header;
