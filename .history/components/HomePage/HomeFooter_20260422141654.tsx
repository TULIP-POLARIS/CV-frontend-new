import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useTranslation } from '../../hooks/useTranslation';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');
const BORDER_RADIUS = 30;

type Props = {
  onReadPrivacy: () => void;
  data?: any;
};

export default function HomeFooter({ onReadPrivacy, data }: Props) {
  const { t } = useTranslation();
  const [allowStorage, setAllowStorage] = useState(false);
  const navigation = useNavigation<RootNavigationProp>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.checkRow}
        onPress={() => setAllowStorage(p => !p)}
        activeOpacity={0.8}
      >
        <View style={[styles.checkbox, allowStorage && styles.checkboxActive]}>
          {allowStorage && <Icon name="checkmark" size={14} color="#ffffff" />}
        </View>
        <Text style={styles.checkText}>{t('home.allowStorage')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnPrivacy} onPress={onReadPrivacy}>
        <Icon name="shield-checkmark-outline" size={16} color="#ffffff" style={styles.icon} />
        <Text style={styles.btnPrivacyText}>{t('home.readPrivacy')}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btnGenerate, !allowStorage && styles.btnDisabled]}
        onPress={() => {
          if (allowStorage) {
            navigation.navigate('TemplateSelect', { data: data || {} });
          }
        }}
        disabled={!allowStorage}
      >
        <Icon name="sparkles-outline" size={18} color="#ffffff" style={styles.icon} />
        <Text style={styles.btnGenerateText}>{t('home.generateButton')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnMatch}
        onPress={() => {
          if (allowStorage) {
            navigation.navigate('JobMatch', { data: data || {} });
          }
        }}
        disabled={!allowStorage}
      >
        <Icon name="analytics-outline" size={16} color="#ffffff" style={styles.icon} />
        <Text style={styles.btnMatchText}>
          {t('home.matchJob')} {/* مثلا "Check Job Fit" */}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 20, paddingBottom: 40, gap: 12 },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 24 },
  checkbox: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: '#3d6fd8', backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' },
  checkboxActive: { backgroundColor: '#3d6fd8', borderColor: '#3d6fd8' },
  checkText: { flex: 1, fontSize: 13, fontWeight: '600', color: '#1a3a6b', lineHeight: 20 },
  btnPrivacy: { flexDirection: 'row', alignItems: 'center', paddingVertical: 13, paddingLeft: 24, paddingRight: 32, borderTopRightRadius: BORDER_RADIUS, borderBottomRightRadius: BORDER_RADIUS, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, backgroundColor: '#7a9cc6', width: width * 0.58, shadowColor: '#7a9cc6', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 3 },
  btnPrivacyText: { fontSize: 14, fontWeight: '600', color: '#ffffff', flex: 1 },
  icon: { marginRight: 10 },
  btnGenerate: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: '#3d6fd8', borderRadius: 25, paddingVertical: 15, marginHorizontal: 24, shadowColor: '#3d6fd8', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  btnDisabled: { backgroundColor: '#90a4ae', shadowOpacity: 0, elevation: 0 },
  btnGenerateText: { fontSize: 15, fontWeight: '700', color: '#ffffff', letterSpacing: 0.5 },
});