import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import TabNavigation from './TabNavigator';
import Start from '../screens/Start';
import Login from '../screens/Login';
import TagList from '../screens/TagList';
import MediaList from '../screens/MediaList';
import MediaDetail from '../screens/MediaDetail';

const Stack = createStackNavigator();

const BottomTabs = () => {
  return <TabNavigation />;
};

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Start"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Start"
        component={Start}
        options={{
          headerShown: false,
          animationEnabled: true,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          animationEnabled: true,
        }}
      />
      <Stack.Screen
        name="TagList"
        component={TagList}
        options={({route}) => ({
          animationEnabled: true,
          headerShown: true,
          headerTitle: route.params.headerTitle,
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#ffffff',
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name="MediaList"
        component={MediaList}
        options={({route}) => ({
          animationEnabled: true,
          headerShown: true,
          headerTitle: route.params.headerTitle,
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#ffffff',
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name="MediaDetail"
        component={MediaDetail}
        options={{
          animationEnabled: true,
          headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#000000',
          },
          headerTintColor: '#ffffff',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
