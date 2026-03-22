import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ScreenHeader from '../ScreenHeader';
import { useTranslation } from '../../hooks/useTranslation';

const HEADER_IMAGE = require('../../assets/headerProfile.jpg');
const LOGO = require('../../assets/Logo.png');

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = width * (220 / 390);
const LOGO_SIZE = 80;

export default function ProfileHeader() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Image source={HEADER_IMAGE} style={styles.headerImage} resizeMode="cover" />
      <ScreenHeader showBack tintColor="#ffffff" />

      <View style={styles.textWrapper}>
        <Text style={styles.welcome}>{t('profile.title')}</Text>
      </View>

      <View style={styles.logoWrapper}>
        <Image source={LOGO} style={styles.logo} resizeMode="cover" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height: HEADER_HEIGHT,
    overflow: 'visible',
  },
  headerImage: {
    width,
    height: HEADER_HEIGHT,
    position: 'absolute',
  },

  textWrapper: {
    position: 'absolute',
    bottom: LOGO_SIZE / 2 + 36,
    left: 20,
    right: '40%',
  },

  welcome: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 24,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 17,
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },

  logoWrapper: {
    position: 'absolute',
    bottom: -(LOGO_SIZE / 2),
    left: 20,
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: LOGO_SIZE / 2,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#ffffff',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  logo: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
  },
});