import React from 'react';
import { View } from 'react-native';
import CVTemplate from '../../components/cv/CVTemplate';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'CVPreview'>;

export default function CVPreviewScreen({ route }: Props) {
  // language هم از params می‌آید — از CustomizeCVScreen پاس داده شده
  const { data, theme, language } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <CVTemplate data={data} theme={theme} language={language} />
    </View>
  );
}