import React from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, SafeAreaView, Image,
  Dimensions, StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { useTranslation } from '../../hooks/useTranslation';
import ScreenHeader from '../../components/ScreenHeader';

const HEADER_IMAGE = require('../../assets/headerLogin.jpg');

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CheckEmail'>;
  route: RouteProp<RootStackParamList, 'CheckEmail'>;
};

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = width * (220 / 390);

export default function CheckEmailScreen({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { email } = route.params;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.flex}>
        <Image source={HEADER_IMAGE} style={styles.headerImage} resizeMode="cover" />
        <ScreenHeader showBack={false} tintColor="#ffffff" />

        <View style={styles.content}>

          <View style={styles.iconWrapper}>
            <Icon name="mail-outline" size={40} color="#3d6fd8" />
          </View>

          <Text style={styles.title}>{t('checkEmail.title')}</Text>
          <Text style={styles.subtitle}>{t('checkEmail.subtitle')}</Text>
          <Text style={styles.emailText}>{email}</Text>

          <View style={styles.infoBox}>
            <Icon name="information-circle-outline" size={18} color="#3d6fd8" />
            <Text style={styles.infoText}>{t('checkEmail.infoText')}</Text>
          </View>

          <TouchableOpacity
            style={styles.btnPrimary}
            onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })}
          >
            <Text style={styles.btnPrimaryText}>{t('checkEmail.backToLogin')}</Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#ffffff' },
  flex: { flex: 1 },

  headerImage: { width, height: HEADER_HEIGHT },

  content: {
    flex: 1, paddingHorizontal: 24,
    paddingTop: 40, alignItems: 'center',
  },

  iconWrapper: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#eef4ff',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 24,
  },

  title: {
    fontSize: 24, fontWeight: '700',
    color: '#263238', marginBottom: 10,
    textAlign: 'center', letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 14, color: '#90a4ae',
    textAlign: 'center', lineHeight: 22,
  },
  emailText: {
    fontSize: 15, fontWeight: '700',
    color: '#3d6fd8', marginTop: 4,
    marginBottom: 28, textAlign: 'center',
  },

  infoBox: {
    flexDirection: 'row', alignItems: 'flex-start',
    backgroundColor: '#eef4ff', borderRadius: 12,
    padding: 14, gap: 10,
    width: '100%', marginBottom: 32,
  },
  infoText: {
    flex: 1, fontSize: 13,
    color: '#455a64', lineHeight: 20,
  },

  btnPrimary: {
    backgroundColor: '#3d6fd8', borderRadius: 25,
    paddingVertical: 15, alignItems: 'center',
    width: '100%',
    shadowColor: '#3d6fd8', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  btnPrimaryText: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
});