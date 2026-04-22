import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';

import MainTabs from '../navigation/mainTabs';
import TemplateSelectScreen from '../screens/Cv/TemplateSelectScreen';
import CustomizeCVScreen from '../screens/Cv/CustomizeCVScreen';
import CVPreviewScreen from '../screens/Cv/CVPreviewScreen';
import UsageMetricsScreen from '../screens/Settings/UsageMetricsScreen';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="TemplateSelect" component={TemplateSelectScreen} />
      <Stack.Screen name="CustomizeCV" component={CustomizeCVScreen} />
      <Stack.Screen name="CVPreview" component={CVPreviewScreen} />
      <Stack.Screen name="UsageMetrics" component={UsageMetricsScreen} />
    </Stack.Navigator>
  );
}