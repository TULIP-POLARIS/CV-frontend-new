import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomePage from '../screens/HomePage/HomePageScreen';
import ProfileScreen from '../screens/Profile/PorofileScreen';
import Settings from '../screens/Settings/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: '#888',
        tabBarIcon: ({ color, size }) => {
          let iconName: string = '';
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';
          else if (route.name === 'Settings') iconName = 'settings-outline';
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home"     component={HomePage} />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="Profile"  component={ProfileScreen} />
    </Tab.Navigator>
  );
}