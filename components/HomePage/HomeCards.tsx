import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useTranslation } from '../../hooks/useTranslation';

const ROBOT_IMAGE = require('../../assets/robot.png');

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 24 * 2 - 16) / 2;

type Props = {
  onUploadCV: () => void;
  onShareBackground: () => void;
};

export default function HomeCards({ onUploadCV, onShareBackground }: Props) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.card} onPress={onUploadCV}>
        <View style={styles.iconWrapper}>
          <Icon name="cloud-upload-outline" size={32} color="#3d6fd8" />
        </View>
        <Text style={styles.cardText}>{t('home.uploadCV')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={onShareBackground}>
        <View style={styles.robotWrapper}>
          <Image source={ROBOT_IMAGE} style={styles.robotImage} resizeMode="contain" />
        </View>
        <Text style={styles.cardText}>{t('home.shareBackground')}</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 16,
  },

  card: {
    width: CARD_WIDTH,
    backgroundColor: '#eef4ff',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 14,
    borderWidth: 1.5,
    borderColor: '#dce8fb',
    shadowColor: '#3d6fd8',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },

  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3d6fd8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },

  robotWrapper: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3d6fd8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },

  robotImage: {
    width: 52,
    height: 52,
  },

  cardText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#263238',
    textAlign: 'center',
    lineHeight: 19,
  },
});