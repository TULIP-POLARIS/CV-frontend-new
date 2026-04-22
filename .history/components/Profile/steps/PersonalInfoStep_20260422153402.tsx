import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Platform, Image, ActivityIndicator, Alert,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTranslation } from '../../../hooks/useTranslation';
import { useAuth } from '../../../context/AuthContext';

const BASE_URL = 'https://cvapiappservice-dng8e8gmh0hvdbcr.francecentral-01.azurewebsites.net';

export type PersonalData = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  address: string;
  countryOfResidence: string;
  phoneNumber: string;
};

type Props = {
  data: PersonalData;
  onChange: (field: string, value: string) => void;
  avatarUri: string | null;
  onAvatarChange: (uri: string | null) => void;
  errors: string[];
};

const AVATAR_SIZE = 90;

export default function PersonalInfoStep({
  data,
  onChange,
  avatarUri,
  onAvatarChange,
}: Props) {
  const { t } = useTranslation();
  const { token } = useAuth();

  const [avatarLoading, setAvatarLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const GENDERS = [
    t('personalInfo.male'),
    t('personalInfo.female'),
    t('personalInfo.other'),
  ];

  const parsedDate = (() => {
    if (!data.dateOfBirth) return new Date(2000, 0, 1);
    const parts = data.dateOfBirth.split('-');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      const d = new Date(Number(year), Number(month) - 1, Number(day));
      if (!isNaN(d.getTime())) return d;
    }
    return new Date(2000, 0, 1);
  })();

  // ✅ FIXED
  const handleDateChange = (_: any, selected?: Date) => {
    if (Platform.OS === 'ios') {
      setShowDatePicker(false);
    }

    if (selected) {
      const day = String(selected.getDate()).padStart(2, '0');
      const month = String(selected.getMonth() + 1).padStart(2, '0');
      const year = String(selected.getFullYear());

      onChange('dateOfBirth', `${day}-${month}-${year}`);
    }
  };

  const uploadImage = async (uri: string) => {
    try {
      if (avatarLoading) return;

      const formData = new FormData();
      formData.append('file', {
        uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      } as any);

      const res = await fetch(`${BASE_URL}/api/profile/personal/picture`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const text = await res.text();
      if (!res.ok) throw new Error(text);

      return true;
    } catch (e) {
      throw e;
    }
  };

  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setAvatarLoading(true);
      try {
        await uploadImage(result.assets[0].uri);
        onAvatarChange(result.assets[0].uri);
      } catch {
        Alert.alert('Error', 'Upload failed');
      } finally {
        setAvatarLoading(false);
      }
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setAvatarLoading(true);
      try {
        await uploadImage(result.assets[0].uri);
        onAvatarChange(result.assets[0].uri);
      } catch {
        Alert.alert('Error', 'Upload failed');
      } finally {
        setAvatarLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>

      {/* DATE INPUT */}
      <Text style={styles.label}>Date of Birth *</Text>

      <TouchableOpacity
        style={styles.inputRow}
        onPress={() => setShowDatePicker(true)}
      >
        <Icon name="calendar-outline" size={18} color="#90a4ae" />
        <Text style={{ marginLeft: 10 }}>
          {data.dateOfBirth || 'DD-MM-YYYY'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={parsedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          maximumDate={new Date()}
          minimumDate={new Date(1920, 0, 1)}
          onChange={handleDateChange}
        />
      )}

      {/* GENDER */}
      <Text style={styles.label}>Gender *</Text>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {GENDERS.map(g => (
          <TouchableOpacity
            key={g}
            onPress={() => onChange('gender', g)}
            style={[
              styles.genderBtn,
              data.gender === g && styles.genderActive,
            ]}
          >
            <Text>{g}</Text>
          </TouchableOpacity>
        ))}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { marginTop: 15, fontWeight: '600' },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginTop: 8,
  },

  genderBtn: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },

  genderActive: {
    backgroundColor: '#3d6fd8',
    color: '#fff',
  },
});