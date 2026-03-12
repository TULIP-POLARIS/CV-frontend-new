import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// Import your screens
import LoginScreen from './screens/Auth/LoginScreen';
import RegisterScreen from './screens/Auth/RegisterScreen';
import HomePage from './screens/HomePage/HomePageScreen';
import ProfileScreen from './screens/Profile/ProfileScreen';
import EditProfileScreen from "./screens/Profile/EditProfileScreen";
// Example screens for tabs
function Settings() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings</Text>
    </View>
  );
}



// 1️⃣ Stack Navigator
const Stack = createNativeStackNavigator();

// 2️⃣ Tab Navigator
const Tab = createBottomTabNavigator();

// Tab Navigator for main app after login
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: '#888',
        tabBarIcon: ({ color, size }) => {
          let iconName: string = '';

          if (route.name === 'Home') {
            iconName = 'home-outline'; // home icon
          } else if (route.name === 'Profile') {
            iconName = 'person-outline'; // profile icon
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline'; // settings icon
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Root App Navigator
export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="MainTabs">
        {/* Authentication Screens */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* Main app after login: Tabs */}
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
  name="EditProfile"
  component={EditProfileScreen}
  options={{ headerShown:false }}
/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}