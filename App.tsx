import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Auth/LoginScreen';
import RegisterScreen from './screens/Auth/RegisterScreen';

import MainTabs from './navigation/mainTabs'; 
import TemplateSelectScreen from "./screens/Cv/TemplateSelectScreen";
import CustomizeCVScreen from "./screens/Cv/CustomizeCVScreen";
import CVPreviewScreen from "./screens/Cv/CVPreviewScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="MainTabs">
        
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />

      
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      {/* <Stack.Screen name="TemplateSelect" component={TemplateSelectScreen} />
<Stack.Screen name="CustomizeCV" component={CustomizeCVScreen} />
<Stack.Screen
  name="CVPreview"
  component={CVPreviewScreen}
  initialParams={{
    data: {
      name: "Achini Fernando",
      title: "Software Developer",
      image: "https://i.pravatar.cc/150",
      summary:
        "Motivated and detail-oriented individual with strong responsibility and teamwork skills. Fast learner and highly reliable.",

      skills: [
        "React",
        "Node.js",
        "TypeScript",
        "UI Design",
        "Problem Solving",
      ],

      languages: [
        { name: "English", level: "Fluent" },
        { name: "Finnish", level: "A2" },
      ],

      education: [
        {
          degree: "Bachelor of IT",
          institution: "OAMK",
          startDate: "2024",
          endDate: "2028",
        },
      ],

      experience: [
        {
          title: "Intern Developer",
          duration: "2025 - Present",
          description:
            "Worked in a team, developed mobile apps and improved UI performance.",
        },
      ],

      contact: {
        phone: "+358123456",
        email: "test@test.com",
        address: "Oulu, Finland",
      },
    },
    primaryColor: "#2F3E4D",
  }}
/>
  */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}