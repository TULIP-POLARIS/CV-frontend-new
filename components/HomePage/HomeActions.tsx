import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from '../../hooks/useTranslation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type NavProp = NativeStackNavigationProp<RootStackParamList>;
type ActiveButton = 'profile' | 'previousCVs' | 'generate';

type Props = {
  defaultActive?: ActiveButton;
  onGeneratePress?: () => void;
};

const { width } = Dimensions.get('window');
const BORDER_RADIUS = 30;

export default function HomeActions({ defaultActive = 'generate', onGeneratePress }: Props) {
  const { t } = useTranslation();
  const navigation = useNavigation<NavProp>();
  const [active, setActive] = useState<ActiveButton>(defaultActive);

  const isActive = (btn: ActiveButton) => active === btn;

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={[styles.btn, styles.btnSmall, isActive('profile') && styles.btnActive]}
        onPress={() => {
          setActive('profile');
          navigation.navigate('Profile');
        }}
      >
        <Icon
          name="person-outline"
          size={16}
          color={isActive('profile') ? '#ffffff' : '#3d6fd8'}
          style={styles.icon}
        />
        <Text style={[styles.btnText, isActive('profile') && styles.btnTextActive]}>
          {t('home.myProfile')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, styles.btnMedium, isActive('previousCVs') && styles.btnActive]}
        onPress={() => setActive('previousCVs')}
      >
        <Icon
          name="document-text-outline"
          size={16}
          color={isActive('previousCVs') ? '#ffffff' : '#3d6fd8'}
          style={styles.icon}
        />
        <Text style={[styles.btnText, isActive('previousCVs') && styles.btnTextActive]}>
          {t('home.myPreviousCVs')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, styles.btnLarge, isActive('generate') && styles.btnActive]}
        onPress={() => {
          setActive('generate');
          if (onGeneratePress) onGeneratePress();
        }}
      >
        <Icon
          name="sparkles-outline"
          size={18}
          color={isActive('generate') ? '#ffffff' : '#3d6fd8'}
          style={styles.icon}
        />
        <Text style={[styles.btnText, isActive('generate') && styles.btnTextActive]}>
          {t('home.generateNew')}
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    gap: 10,
    alignItems: 'flex-end',
  },

  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingLeft: 20,
    paddingRight: 28,
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderRightWidth: 0,
    borderColor: '#3d6fd8',
    shadowColor: '#3d6fd8',
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },

  btnActive: {
    backgroundColor: '#3d6fd8',
    borderColor: '#3d6fd8',
    shadowOpacity: 0.35,
    elevation: 5,
  },

  btnSmall:  { width: width * 0.52 },
  btnMedium: { width: width * 0.64 },
  btnLarge:  { width: width * 0.78 },

  icon: { marginRight: 10 },

  btnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3d6fd8',
    textAlign: 'left',
    flex: 1,
  },

  btnTextActive: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});