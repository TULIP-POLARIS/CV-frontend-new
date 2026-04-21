import React from 'react';
import { View } from 'react-native';
import CVTemplate from '../../components/cv/CVTemplate';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'CVPreview'>;

export default function CVPreviewScreen({ route }: Props) {
  const { data, primaryColor } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <CVTemplate data={data} primaryColor={primaryColor} />
    </View>
  );
}