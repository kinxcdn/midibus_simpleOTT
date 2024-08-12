import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import Home from "../screens/HomeScreen";
import Search from "../screens/SearchScreen";
import Settings from "../screens/SettingScreen";

const Tab = createBottomTabNavigator();

// 기본적으로 이름만 변경할 수 있도록 정의하여 재사용 가능하게 정의
const tabBarIcon =
  (name) =>
  ({ color }) =>
    <Icon name={name} size={25} color={color} />;

// 공통 설정을 변수로 정의하여 알아보기 쉽게 설계
const tabBarOptions = {
  tabBarStyle: {
    backgroundColor: "#000000",
    height: 70,
    paddingTop: 8,
  },
  tabBarActiveTintColor: "#ffffff",
  tabBarLabelStyle: {
    fontSize: 13,
    marginBottom: 10,
  },
};

const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={tabBarOptions}>
      <Tab.Screen
        name="홈"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: tabBarIcon("home-outline"),
        }}
      />
      <Tab.Screen
        name="검색"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: tabBarIcon("search-outline"),
        }}
      />
      <Tab.Screen
        name="설정"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: tabBarIcon("cog-outline"),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
