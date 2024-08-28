import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";
import TabNavigation from "./TabNavigator";
import Splash from "../screens/SplashScreen";
import Login from "../screens/LoginScreen";
import MediaList from "../screens/MediaListScreen";
import MediaDetail from "../screens/MediaDetailScreen";
import ChannelSelection from "../screens/ChannelSelectionScreen";

// Stack Navigator의 파라미터 리스트 정의
type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  ChannelSelection: undefined;
  MediaList: { headerTitle: string };
  MediaDetail: undefined;
  BottomTabs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// 공통 헤더 옵션 정의
const defaultHeaderOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: "#000",
    height: 60,
  },
  headerTintColor: "#fff",
  headerBackTitleVisible: false,
  animationEnabled: true,
  headerTitleStyle: {
    fontFamily: "Pretendard-Bold",
  },
  transitionSpec: {
    open: {
      animation: "timing",
      config: {
        duration: 300,
      },
    },
    close: {
      animation: "timing",
      config: {
        duration: 300,
      },
    },
  },
};

const StackNavigation = () => (
  <Stack.Navigator
    initialRouteName="Splash"
    screenOptions={{
      ...defaultHeaderOptions,
      ...TransitionPresets.SlideFromRightIOS,
    }}
  >
    <Stack.Screen
      name="Splash"
      component={Splash}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        headerShown: false,
        ...TransitionPresets.FadeFromBottomAndroid,
      }}
    />
    <Stack.Screen
      name="ChannelSelection"
      component={ChannelSelection}
      options={{
        headerTitle: "",
        ...TransitionPresets.FadeFromBottomAndroid,
      }}
    />
    <Stack.Screen
      name="MediaList"
      component={MediaList}
      options={({ route }) => ({
        headerTitle: route.params.headerTitle,
      })}
    />
    <Stack.Screen
      name="MediaDetail"
      component={MediaDetail}
      options={{
        headerTitle: "",
        ...TransitionPresets.ModalSlideFromBottomIOS, // 모달 슬라이드 애니메이션 적용
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
