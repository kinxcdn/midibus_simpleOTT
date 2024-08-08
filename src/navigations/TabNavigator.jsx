import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';
import Search from '../screens/Search';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();

const tabBarIcon =
  name =>
  ({color}) =>
    <Icon name={name} size={25} color={color} />;

const tabBarOptions = {
  tabBarStyle: {
    backgroundColor: '#000000',
    height: 70,
    paddingTop: 8,
  },
  tabBarActiveTintColor: '#ffffff',
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
          tabBarIcon: tabBarIcon('home-outline'),
        }}
      />
      <Tab.Screen
        name="검색"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: tabBarIcon('search-outline'),
        }}
      />
      <Tab.Screen
        name="설정"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: tabBarIcon('cog-outline'),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
