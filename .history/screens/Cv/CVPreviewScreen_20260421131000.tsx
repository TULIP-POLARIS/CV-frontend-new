import React from 'react';
import { View } from 'react-native';
import CVTemplate from '../../components/cv/CVTemplate';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'CVPreview'>;

export default function CVPreviewScreen({ route }: Props) {
  const { data, theme, language } = route.params; // ← تغییر اینجا

  return (
    <View style={{ flex: 1 }}>
      <CVTemplate data={data} theme={theme} language={language} /> // ← تغییر اینجا
    </View>
  );
}