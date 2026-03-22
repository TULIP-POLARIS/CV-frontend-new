import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/navigation';
import { AuthProvider } from './context/AuthContext';
import LoginScreen from './screens/Auth/LoginScreen';
import RegisterScreen from './screens/Auth/RegisterScreen';
import ProfileScreen from './screens/Profile/PorofileScreen';
import MainTabs from './navigation/MainTabs';
import ForgotPasswordScreen from './screens/Auth/ForgotPasswordScreen';
import CheckEmailScreen from './screens/Auth/CheckEmailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login"          component={LoginScreen} />
          <Stack.Screen name="Register"       component={RegisterScreen} />
          <Stack.Screen name="MainTabs"       component={MainTabs} />
          <Stack.Screen name="Profile"        component={ProfileScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="CheckEmail"     component={CheckEmailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}