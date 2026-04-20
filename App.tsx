import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import { AuthProvider } from './context/AuthContext';
import { useFonts } from 'expo-font';
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
  Entypo,
  Feather,
} from '@expo/vector-icons';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Ionicons: require('./assets/fonts/Ionicons.ttf'),
    MaterialIcons: require('./assets/fonts/MaterialIcons.ttf'),
    FontAwesome: require('./assets/fonts/FontAwesome.ttf'),
    FontAwesome5_Brands: require('./assets/fonts/FontAwesome5_Brands.ttf'),
    FontAwesome5_Regular: require('./assets/fonts/FontAwesome5_Regular.ttf'),
    FontAwesome5_Solid: require('./assets/fonts/FontAwesome5_Solid.ttf'),
    MaterialCommunityIcons: require('./assets/fonts/MaterialCommunityIcons.ttf'),
    AntDesign: require('./assets/fonts/AntDesign.ttf'),
    Entypo: require('./assets/fonts/Entypo.ttf'),
    Feather: require('./assets/fonts/Feather.ttf'),
  });
  const [fontLoadTimeout, setFontLoadTimeout] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => setFontLoadTimeout(true), 5000);
    return () => clearTimeout(timeout);
  }, []);

  if (fontError) {
    console.error('Font loading error:', fontError);
  }

  if (!fontsLoaded && !fontLoadTimeout) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading application...</Text>
      </View>
    );
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
