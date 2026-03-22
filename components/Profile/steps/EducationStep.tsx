import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export type EducationItem = {
  id: string;
  degree: string;
  fieldOfStudy: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
};

type Props = {
  data: EducationItem[];
  onChange: (data: EducationItem[]) => void;
};

const emptyItem = (): EducationItem => ({
  id: Date.now().toString(),
  degree: '',
  fieldOfStudy: '',
  institution: '',
  startDate: '',
  endDate: '',
  description: '',
});

export default function EducationStep({ data, onChange }: Props) {

  const handleChange = (id: string, field: keyof EducationItem, value: string) => {
    onChange(data.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleAdd = () => {
    onChange([...data, emptyItem()]);
  };

  const handleRemove = (id: string) => {
    onChange(data.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>

      <View style={styles.sectionHeader}>
        <View style={styles.sectionIconWrapper}>
          <Icon name="school-outline" size={18} color="#3d6fd8" />
        </View>
        <Text style={styles.sectionTitle}>Education</Text>
      </View>

      {data.map((item, index) => (
        <View key={item.id} style={styles.card}>

          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Education {index + 1}</Text>
            {data.length > 1 && (
              <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.removeBtn}>
                <Icon name="trash-outline" size={18} color="#e53935" />
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.label}>Degree <Text style={styles.required}>*</Text></Text>
          <View style={styles.inputRow}>
            <Icon name="ribbon-outline" size={16} color="#90a4ae" style={styles.inputIcon} />
            <TextInput
              style={styles.inputFlex}
              placeholder="e.g. Bachelor's"
              placeholderTextColor="#b0bec5"
              value={item.degree}
              onChangeText={v => handleChange(item.id, 'degree', v)}
            />
          </View>

          <Text style={styles.label}>Field of Study <Text style={styles.required}>*</Text></Text>
          <View style={styles.inputRow}>
            <Icon name="book-outline" size={16} color="#90a4ae" style={styles.inputIcon} />
            <TextInput
              style={styles.inputFlex}
              placeholder="e.g. Computer Science"
              placeholderTextColor="#b0bec5"
              value={item.fieldOfStudy}
              onChangeText={v => handleChange(item.id, 'fieldOfStudy', v)}
              autoCapitalize="words"
            />
          </View>

          <Text style={styles.label}>Institution <Text style={styles.required}>*</Text></Text>
          <View style={styles.inputRow}>
            <Icon name="business-outline" size={16} color="#90a4ae" style={styles.inputIcon} />
            <TextInput
              style={styles.inputFlex}
              placeholder="e.g. University of Helsinki"
              placeholderTextColor="#b0bec5"
              value={item.institution}
              onChangeText={v => handleChange(item.id, 'institution', v)}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.row}>
            <View style={styles.halfField}>
              <Text style={styles.label}>Start Date <Text style={styles.required}>*</Text></Text>
              <View style={styles.inputRow}>
                <Icon name="calendar-outline" size={16} color="#90a4ae" style={styles.inputIcon} />
                <TextInput
                  style={styles.inputFlex}
                  placeholder="MM/YYYY"
                  placeholderTextColor="#b0bec5"
                  value={item.startDate}
                  onChangeText={v => handleChange(item.id, 'startDate', v)}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View style={styles.halfField}>
              <Text style={styles.label}>End Date</Text>
              <View style={styles.inputRow}>
                <Icon name="calendar-outline" size={16} color="#90a4ae" style={styles.inputIcon} />
                <TextInput
                  style={styles.inputFlex}
                  placeholder="MM/YYYY"
                  placeholderTextColor="#b0bec5"
                  value={item.endDate}
                  onChangeText={v => handleChange(item.id, 'endDate', v)}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          <Text style={styles.label}>Description</Text>
          <View style={[styles.inputRow, styles.textAreaRow]}>
            <Icon name="document-text-outline" size={16} color="#90a4ae" style={[styles.inputIcon, { marginTop: 2 }]} />
            <TextInput
              style={[styles.inputFlex, styles.textArea]}
              placeholder="Briefly describe your studies..."
              placeholderTextColor="#b0bec5"
              value={item.description}
              onChangeText={v => handleChange(item.id, 'description', v)}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

        </View>
      ))}

      <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
        <Icon name="add-circle-outline" size={20} color="#3d6fd8" />
        <Text style={styles.addBtnText}>Add Another Education</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  sectionIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#eef4ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#263238',
    letterSpacing: 0.2,
  },

  card: {
    backgroundColor: '#f8faff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#dce8fb',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3d6fd8',
  },
  removeBtn: { padding: 4 },

  row: { flexDirection: 'row', gap: 12 },
  halfField: { flex: 1 },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#37474f',
    marginTop: 12,
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  required: { color: '#e53935' },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dce8fb',
    borderRadius: 10,
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  textAreaRow: { alignItems: 'flex-start', paddingTop: 10 },
  inputIcon:   { marginRight: 8 },
  inputFlex: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 13 : 9,
    fontSize: 14,
    color: '#263238',
  },
  textArea: {
    minHeight: 70,
    textAlignVertical: 'top',
  },

  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#3d6fd8',
    borderStyle: 'dashed',
    backgroundColor: '#f0f6ff',
    marginBottom: 8,
  },
  addBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3d6fd8',
  },
});