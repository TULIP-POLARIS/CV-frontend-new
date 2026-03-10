import React from 'react';
import { View } from 'react-native';
import LoginForm from '../../components/auth/LoginForm';

export default function LoginScreen() {
    console.log("LOGIN SCREEN RENDERED");
  return (
    <View>
      <LoginForm />
    </View>
  );
}