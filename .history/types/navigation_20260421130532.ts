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
  CVPreview: {
    data: any;
    language: string;          // ← اضافه شد
    theme: {                   // ← جایگزین primaryColor شد
      headerColor:  string;
      sidebarColor: string;
      accentColor:  string;
      sidebarText:  string;
      mainBg:       string;
      sectionColor: string;
    };
  };
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;