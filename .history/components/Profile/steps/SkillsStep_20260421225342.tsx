import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useTranslation } from '../../../hooks/useTranslation';

export type SkillItem = {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
};

type Props = {
  data: PersonalData;
  onChange: (field: string, value: string) => void;
  avatarUri: string | null;
  onAvatarChange: (uri: string | null) => void;
  errors: string[];   // 👈 اینو اضافه کن
};

const LEVELS: SkillItem['level'][] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const emptyItem = (): SkillItem => ({
  id: Date.now().toString(),
  name: '',
  level: 'Intermediate',
});

export default function SkillsStep({ data, onChange, onDelete }: Props) {
  const { t } = useTranslation();

  const handleChange = (id: string, field: keyof SkillItem, value: any) =>
    onChange(data.map(item => item.id === id ? { ...item, [field]: value } : item));

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionIconWrapper}>
          <Icon name="star-outline" size={18} color="#3d6fd8" />
        </View>
        <Text style={styles.sectionTitle}>{t('skills.title')}</Text>
      </View>

      {data.map((item, index) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{t('skills.item')} {index + 1}</Text>
            {data.length > 1 && (
              <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.removeBtn}>
                <Icon name="trash-outline" size={18} color="#e53935" />
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.label}>{t('skills.name')} <Text style={styles.required}>*</Text></Text>
          <View style={styles.inputRow}>
            <Icon name="star-outline" size={16} color="#90a4ae" style={styles.inputIcon} />
            <TextInput
              style={styles.inputFlex}
              placeholder={t('skills.namePlaceholder')}
              placeholderTextColor="#b0bec5"
              value={item.name}
              onChangeText={v => handleChange(item.id, 'name', v)}
              autoCapitalize="words"
            />
          </View>

          <Text style={styles.label}>{t('skills.level')} <Text style={styles.required}>*</Text></Text>
          <View style={styles.levelsRow}>
            {LEVELS.map(level => (
              <TouchableOpacity
                key={level}
                style={[styles.levelBtn, item.level === level && styles.levelBtnActive]}
                onPress={() => handleChange(item.id, 'level', level)}
              >
                <Text style={[styles.levelText, item.level === level && styles.levelTextActive]}>
                  {t(`skills.levels.${level.toLowerCase()}`)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.addBtn} onPress={() => onChange([...data, emptyItem()])}>
        <Icon name="add-circle-outline" size={20} color="#3d6fd8" />
        <Text style={styles.addBtnText}>{t('skills.addAnother')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 24, paddingTop: 8 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  sectionIconWrapper: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: '#eef4ff', justifyContent: 'center', alignItems: 'center',
  },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#263238', letterSpacing: 0.2 },
  card: {
    backgroundColor: '#f8faff', borderRadius: 16,
    padding: 16, marginBottom: 16,
    borderWidth: 1, borderColor: '#dce8fb',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#3d6fd8' },
  removeBtn: { padding: 4 },
  label: { fontSize: 13, fontWeight: '600', color: '#37474f', marginTop: 12, marginBottom: 6 },
  required: { color: '#e53935' },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#dce8fb', borderRadius: 10,
    paddingHorizontal: 12, borderWidth: 1.5, borderColor: 'transparent',
  },
  inputIcon: { marginRight: 8 },
  inputFlex: {
    flex: 1, paddingVertical: Platform.OS === 'ios' ? 13 : 9,
    fontSize: 14, color: '#263238',
  },
  levelsRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  levelBtn: {
    paddingVertical: 8, paddingHorizontal: 14,
    borderRadius: 20, borderWidth: 1.5,
    borderColor: '#dce8fb', backgroundColor: '#f0f4ff',
  },
  levelBtnActive: { backgroundColor: '#3d6fd8', borderColor: '#3d6fd8' },
  levelText: { fontSize: 12, fontWeight: '600', color: '#607d8b' },
  levelTextActive: { color: '#ffffff' },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 14, borderRadius: 12,
    borderWidth: 1.5, borderColor: '#3d6fd8',
    borderStyle: 'dashed', backgroundColor: '#f0f6ff', marginBottom: 8,
  },
  addBtnText: { fontSize: 14, fontWeight: '600', color: '#3d6fd8' },
});