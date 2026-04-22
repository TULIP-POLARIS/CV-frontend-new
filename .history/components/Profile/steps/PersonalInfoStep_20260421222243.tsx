import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Platform, Image, ActivityIndicator, Alert,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from '../../../hooks/useTranslation';
import { useAuth } from '../../../context/AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker';

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
  onAvatarChange: (uri: string) => void;
};

const AVATAR_SIZE = 90;

export default function PersonalInfoStep({ data, onChange, avatarUri, onAvatarChange }: Props) {
  const { t } = useTranslation();
  const { token } = useAuth();
  const [avatarLoading, setAvatarLoading] = useState(false);

  // ✅ FIXED DATE PICKER STATE
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const GENDERS = [
    t('personalInfo.male'),
    t('personalInfo.female'),
    t('personalInfo.other'),
  ];

  const uploadImage = async (uri: string) => {
    try {
      const formData = new FormData();

      formData.append('file', {
        uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      } as any);

      const res = await fetch(`${BASE_URL}/api/profile/personal/picture`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const text = await res.text();

      console.log('STATUS:', res.status);
      console.log('RESPONSE:', text);

      if (!res.ok) throw new Error(text);

      return true;
    } catch (error) {
      console.log('UPLOAD ERROR:', error);
      throw error;
    }
  };

  // ✅ FIXED DATE HANDLER
  const onDateChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'dismissed') {
      setShowDatePicker(false);
      return;
    }

    const currentDate = selectedDate || tempDate;
    setTempDate(currentDate);

    const d = String(currentDate.getDate()).padStart(2, '0');
    const m = String(currentDate.getMonth() + 1).padStart(2, '0');
    const y = currentDate.getFullYear();

    onChange('dateOfBirth', `${d}-${m}-${y}`);

    setShowDatePicker(false);
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
      } finally {
        setAvatarLoading(false);
      }
    }
  };

  const takePhoto = async () => {
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
      } finally {
        setAvatarLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>

      {/* DATE OF BIRTH */}
      <Text style={styles.label}>
        {t('personalInfo.dateOfBirth')} <Text style={styles.required}>*</Text>
      </Text>

      <TouchableOpacity
        style={styles.inputRow}
        onPress={() => setShowDatePicker(true)}
      >
        <Icon name="calendar-outline" size={18} color="#90a4ae" style={styles.inputIcon} />

        <Text style={{ flex: 1, paddingVertical: 12, color: data.dateOfBirth ? '#263238' : '#b0bec5' }}>
          {data.dateOfBirth || 'DD-MM-YYYY'}
        </Text>
      </TouchableOpacity>

      {/* ✅ FIXED DATE PICKER */}
      {showDatePicker && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          maximumDate={new Date()}
          onChange={onDateChange}
        />
      )}

      {/* باقی کد شما بدون تغییر */}
      <View style={styles.avatarRow}>
        <TouchableOpacity onPress={pickFromGallery} disabled={avatarLoading}>
          {avatarLoading ? (
            <ActivityIndicator color="#3d6fd8" />
          ) : (
            avatarUri ? (
              <Image source={{ uri: avatarUri }} style={{ width: 90, height: 90, borderRadius: 45 }} />
            ) : (
              <View style={{ width: 90, height: 90, borderRadius: 45, backgroundColor: '#dce8fb' }} />
            )
          )}
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 24, paddingTop: 8 },
  label: { fontSize: 13, fontWeight: '600', marginTop: 16 },
  required: { color: '#e53935' },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dce8fb',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  inputIcon: { marginRight: 10 },

  avatarRow: {
    marginTop: 20,
  }
});r