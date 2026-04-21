import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  Profile: undefined;
  ForgotPassword: undefined;
  CheckEmail: { email: string };
  TemplateSelect: { data: any };
  CustomizeCV: { data: any };
  CVPreview: { data: any; primaryColor: string };
  UsageMetrics: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;