import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  Profile: undefined;
  ForgotPassword: undefined;
  CheckEmail: { email: string };
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;