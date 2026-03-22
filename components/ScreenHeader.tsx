import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import HamburgerMenu from './HamburgerMenu';

type Props = {
  showBack?: boolean;
  tintColor?: string; 
};

export default function ScreenHeader({ showBack = false, tintColor = '#263238' }: Props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {showBack ? (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back-outline" size={26} color={tintColor} />
        </TouchableOpacity>
      ) : (
        <View style={styles.btnPlaceholder} />
      )}

      <HamburgerMenu tintColor={tintColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 52 : 16,
    left: 0,
    right: 0,
    zIndex: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  btn: {
    width: 40, height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPlaceholder: { width: 40 },
});