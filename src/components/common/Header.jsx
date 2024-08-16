import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/dist/Ionicons";

const Header = () => {
  return (
    <View style={styles.headerArea}>
      <Image
        source={require("../../assets/images/logo_midibus_small.png")}
        style={styles.logoImage}
      />
      <View style={styles.iconContainer}>
        <Icon name="person-circle-outline" size={35} color={"#ffffff"} />
      </View>
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
