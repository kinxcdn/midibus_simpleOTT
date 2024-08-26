import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import TabNavigation from "./TabNavigator";
import Splash from "../screens/SplashScreen";
import Login from "../screens/LoginScreen";
import MediaList from "../screens/MediaListScreen";
import MediaDetail from "../screens/MediaDetailScreen";

// Stack Navigator의 파라미터 리스트 정의
type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  MediaList: { headerTitle: string };
  MediaDetail: undefined;
  BottomTabs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// 공통 헤더 옵션 정의
const defaultHeaderOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: "#000",
  },
  headerTintColor: "#fff",
  headerBackTitleVisible: false,
  animationEnabled: true,
};

const StackNavigation = () => (
  <Stack.Navigator initialRouteName="Splash">
    <Stack.Screen
      name="Splash"
      component={Splash}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MediaList"
      component={MediaList}
      options={({ route }) => ({
        ...defaultHeaderOptions,
        headerTitle: route.params.headerTitle,
      })}
    />
    <Stack.Screen
      name="MediaDetail"
      component={MediaDetail}
      options={{
        ...defaultHeaderOptions,
        headerTitle: "",
      }}
    />
    <Stack.Screen
      name="BottomTabs"
      component={TabNavigation}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default StackNavigation;
