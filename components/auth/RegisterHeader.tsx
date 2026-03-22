import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = width * (220 / 390); 

export default function RegisterHeader() {
  return (
    <Image
      source={require('../../assets/headerRegister.jpg')}
      style={styles.image}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: width,
    height: HEADER_HEIGHT,
  },
});