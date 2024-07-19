import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import Home from '../screens/Home';
import Search from '../screens/Search';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#000000',
          height: 90,
        },
        tabBarActiveTintColor: '#ffffff',
        tabBarLabelStyle: {
          fontSize: 13,
          marginBottom: 10,
        },
      }}>
      <Tab.Screen
        name="홈"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name="home-outline" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="검색"
        component={Search}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name="search-outline" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="설정"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Icon name="cog-outline" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
