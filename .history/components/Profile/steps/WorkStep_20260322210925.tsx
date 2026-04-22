import React from 'react';
import {
  View, Text, TextInput,
  TouchableOpacity, StyleSheet, Platform,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';

export type WorkItem = {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
};

type Props = {
  data: WorkItem[];
  onChange: (data: WorkItem[]) => void;
};

const emptyItem = (): WorkItem => ({
  id: Date.now().toString(),
  jobTitle: '',
  company: '',
  location: '',
  startDate: '',
  endDate: '',
  isCurrent: false,
  description: '',
});

export default function WorkStep({ data, onChange }: Props) {
  const handleChange = (id: string, field: keyof WorkItem, value: any) => {
    onChange(data.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionIconWrapper}>
          <Icon name="briefcase-outline" size={18} color="#3d6fd8" />
        </View>
        <Text style={styles.sectionTitle}>Work Experience</Text>
      </View>

      {data.map((item, index) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Experience {index + 1}</Text>
            {data.length > 1 && (
              <TouchableOpacity
                onPress={() => onChange(data.filter(i => i.id !== item.id))}
                style={styles.removeBtn}
              >
                <Icon name="trash-outline" size={18} color="#e53935" />
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.label}>Job Title <Text style={styles.required}>*</Text></Text>
          <View style={styles.inputRow}>
            <Icon name="person-outline" size={16} color="#90a4ae" style={styles.inputIcon} />
            <TextInput
              style={styles.inputFlex}
              placeholder="e.g. Frontend Developer"
              placeholderTextColor="#b0bec5"
              value={item.jobTitle}
              onChangeText={v => handleChange(item.id, 'jobTitle', v)}
              autoCapitalize="words"
            />
          </View>

          <Text style={styles.label}>Company <Text style={styles.required}>*</Text></Text>
          <View style={styles.inputRow}>
            <Icon name="business-outline" size={16} color="#90a4ae" style={styles.inputIcon} />
            <TextInput
              style={styles.inputFlex}
              placeholder="e.g. Google"
              placeholderTextColor="#b0bec5"
              value={item.company}
              onChangeText={v => handleChange(item.id, 'company', v)}
              autoCapitalize="words"
            />
          </View>

          <Text style={styles.label}>Location</Text>
          <View style={styles.inputRow}>
            <Icon name="location-outline" size={16} color="#90a4ae" style={styles.inputIcon} />
            <TextInput
              style={styles.inputFlex}
              placeholder="e.g. Helsinki, Finland"
              placeholderTextColor="#b0bec5"
              value={item.location}
              onChangeText={v => handleChange(item.id, 'location', v)}
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
                  placeholder={item.isCurrent ? 'Present' : 'MM/YYYY'}
                  placeholderTextColor="#b0bec5"
                  value={item.endDate}
                  onChangeText={v => handleChange(item.id, 'endDate', v)}
                  keyboardType="numeric"
                  editable={!item.isCurrent}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.currentRow}
            onPress={() => handleChange(item.id, 'isCurrent', !item.isCurrent)}
          >
            <View style={[styles.checkbox, item.isCurrent && styles.checkboxActive]}>
              {item.isCurrent && <Icon name="checkmark" size={12} color="#ffffff" />}
            </View>
            <Text style={styles.currentText}>I currently work here</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Description</Text>
          <View style={[styles.inputRow, styles.textAreaRow]}>
            <Icon name="document-text-outline" size={16} color="#90a4ae" style={[styles.inputIcon, { marginTop: 2 }]} />
            <TextInput
              style={[styles.inputFlex, styles.textArea]}
              placeholder="Describe your responsibilities..."
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

      <TouchableOpacity style={styles.addBtn} onPress={() => onChange([...data, emptyItem()])}>
        <Icon name="add-circle-outline" size={20} color="#3d6fd8" />
        <Text style={styles.addBtnText}>Add Another Experience</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { paddingHorizontal: 24, paddingTop: 8 },
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
  cardTitle:  { fontSize: 14, fontWeight: '700', color: '#3d6fd8' },
  removeBtn:  { padding: 4 },
  row:        { flexDirection: 'row', gap: 12 },
  halfField:  { flex: 1 },
  label: { fontSize: 13, fontWeight: '600', color: '#37474f', marginTop: 12, marginBottom: 6 },
  required: { color: '#e53935' },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#dce8fb', borderRadius: 10,
    paddingHorizontal: 12, borderWidth: 1.5, borderColor: 'transparent',
  },
  textAreaRow: { alignItems: 'flex-start', paddingTop: 10 },
  inputIcon:   { marginRight: 8 },
  inputFlex: {
    flex: 1, paddingVertical: Platform.OS === 'ios' ? 13 : 9,
    fontSize: 14, color: '#263238',
  },
  textArea:    { minHeight: 70, textAlignVertical: 'top' },
  currentRow:  { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 },
  checkbox: {
    width: 20, height: 20, borderRadius: 5,
    borderWidth: 2, borderColor: '#3d6fd8',
    backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center',
  },
  checkboxActive: { backgroundColor: '#3d6fd8', borderColor: '#3d6fd8' },
  currentText:    { fontSize: 13, fontWeight: '500', color: '#455a64' },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 14, borderRadius: 12,
    borderWidth: 1.5, borderColor: '#3d6fd8',
    borderStyle: 'dashed', backgroundColor: '#f0f6ff', marginBottom: 8,
  },
  addBtnText: { fontSize: 14, fontWeight: '600', color: '#3d6fd8' },
});