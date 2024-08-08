import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigation from './TabNavigator';
import Start from '../screens/Start';
import Login from '../screens/Login';
import TagList from '../screens/TagList';
import MediaList from '../screens/MediaList';
import MediaDetail from '../screens/MediaDetail';

const Stack = createStackNavigator();

// 공통 헤더 설정을 변수로 정의하여 중복을 최소화
const defaultHeaderOptions = {
  headerShown: true,
  headerStyle: {
    backgroundColor: '#000000',
  },
  headerTintColor: '#ffffff',
  headerBackTitleVisible: false,
  animationEnabled: true,
};

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Start"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="TagList"
        component={TagList}
        options={({route}) => ({
          ...defaultHeaderOptions,
          headerTitle: route.params.headerTitle,
        })}
      />
      <Stack.Screen
        name="MediaList"
        component={MediaList}
        options={({route}) => ({
          ...defaultHeaderOptions,
          headerTitle: route.params.headerTitle,
        })}
      />
      <Stack.Screen
        name="MediaDetail"
        component={MediaDetail}
        options={{
          ...defaultHeaderOptions,
          headerTitle: '',
        }}
      />
      <Stack.Screen name="BottomTabs" component={TabNavigation} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
