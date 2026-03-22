import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  data: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    address: string;
    countryOfResidence: string;
    phoneNumber: string;
  };
  onChange: (field: string, value: string) => void;
};

const GENDERS = ['Male', 'Female', 'Other'];

const FieldError = ({ msg }: { msg: string }) =>
  msg ? (
    <View style={styles.fieldErrorRow}>
      <Icon name="alert-circle-outline" size={13} color="#e53935" />
      <Text style={styles.fieldErrorText}>{msg}</Text>
    </View>
  ) : null;

export default function PersonalInfoStep({ data, onChange }: Props) {
  return (
    <View style={styles.container}>

      <View style={styles.sectionHeader}>
        <View style={styles.sectionIconWrapper}>
          <Icon name="person-outline" size={18} color="#3d6fd8" />
        </View>
        <Text style={styles.sectionTitle}>Personal Information</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.halfField}>
          <Text style={styles.label}>First Name <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="John"
            placeholderTextColor="#b0bec5"
            value={data.firstName}
            onChangeText={v => {
              if (/^[a-zA-ZÀ-ÖØ-öø-ÿ\s\-]*$/.test(v)) onChange('firstName', v);
            }}
            autoCapitalize="words"
          />
        </View>
        <View style={styles.halfField}>
          <Text style={styles.label}>Last Name <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="Doe"
            placeholderTextColor="#b0bec5"
            value={data.lastName}
            onChangeText={v => {
              if (/^[a-zA-ZÀ-ÖØ-öø-ÿ\s\-]*$/.test(v)) onChange('lastName', v);
            }}
            autoCapitalize="words"
          />
        </View>
      </View>

      <Text style={styles.label}>Date of Birth <Text style={styles.required}>*</Text></Text>
      <View style={styles.inputRow}>
        <Icon name="calendar-outline" size={18} color="#90a4ae" style={styles.inputIcon} />
        <TextInput
          style={styles.inputFlex}
          placeholder="DD-MM-YYYY"
          placeholderTextColor="#b0bec5"
          value={data.dateOfBirth}
          onChangeText={v => onChange('dateOfBirth', v)}
          keyboardType="numeric"
        />
      </View>

      <Text style={styles.label}>Gender <Text style={styles.required}>*</Text></Text>
      <View style={styles.genderRow}>
        {GENDERS.map(g => (
          <TouchableOpacity
            key={g}
            style={[styles.genderBtn, data.gender === g && styles.genderBtnActive]}
            onPress={() => onChange('gender', g)}
          >
            <Text style={[styles.genderText, data.gender === g && styles.genderTextActive]}>
              {g}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Nationality <Text style={styles.required}>*</Text></Text>
      <View style={styles.inputRow}>
        <Icon name="flag-outline" size={18} color="#90a4ae" style={styles.inputIcon} />
        <TextInput
          style={styles.inputFlex}
          placeholder="e.g. Finnish"
          placeholderTextColor="#b0bec5"
          value={data.nationality}
          onChangeText={v => onChange('nationality', v)}
          autoCapitalize="words"
        />
      </View>

      <Text style={styles.label}>Address</Text>
      <View style={styles.inputRow}>
        <Icon name="location-outline" size={18} color="#90a4ae" style={styles.inputIcon} />
        <TextInput
          style={styles.inputFlex}
          placeholder="Street, City"
          placeholderTextColor="#b0bec5"
          value={data.address}
          onChangeText={v => onChange('address', v)}
          autoCapitalize="words"
        />
      </View>

      <Text style={styles.label}>Country of Residence <Text style={styles.required}>*</Text></Text>
      <View style={styles.inputRow}>
        <Icon name="earth-outline" size={18} color="#90a4ae" style={styles.inputIcon} />
        <TextInput
          style={styles.inputFlex}
          placeholder="e.g. Finland"
          placeholderTextColor="#b0bec5"
          value={data.countryOfResidence}
          onChangeText={v => onChange('countryOfResidence', v)}
          autoCapitalize="words"
        />
      </View>

      <Text style={styles.label}>Phone Number</Text>
      <View style={styles.inputRow}>
        <Icon name="call-outline" size={18} color="#90a4ae" style={styles.inputIcon} />
        <TextInput
          style={styles.inputFlex}
          placeholder="+358 40 123 4567"
          placeholderTextColor="#b0bec5"
          value={data.phoneNumber}
          onChangeText={v => {
            if (/^[\d\s\+\-]*$/.test(v)) onChange('phoneNumber', v);
          }}
          keyboardType="phone-pad"
        />
      </View>

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

  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfField: { flex: 1 },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#37474f',
    marginTop: 16,
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  required: { color: '#e53935' },

  input: {
    backgroundColor: '#dce8fb',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 13 : 9,
    fontSize: 15,
    color: '#263238',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dce8fb',
    borderRadius: 10,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  inputIcon: { marginRight: 10 },
  inputFlex: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 13 : 9,
    fontSize: 15,
    color: '#263238',
  },

  genderRow: {
    flexDirection: 'row',
    gap: 10,
  },
  genderBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#dce8fb',
    backgroundColor: '#f0f4ff',
    alignItems: 'center',
  },
  genderBtnActive: {
    backgroundColor: '#3d6fd8',
    borderColor: '#3d6fd8',
  },
  genderText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#607d8b',
  },
  genderTextActive: {
    color: '#ffffff',
  },

  fieldErrorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  fieldErrorText: { fontSize: 12, color: '#e53935' },
});