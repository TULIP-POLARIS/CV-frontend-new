import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Platform, Image, ActivityIndicator, Alert,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
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
  onAvatarChange: (uri: string) => void;
};

const AVATAR_SIZE = 90;

export default function PersonalInfoStep({ data, onChange, avatarUri, onAvatarChange }: Props) {
  const { t } = useTranslation();
  const { token } = useAuth();
  const [avatarLoading, setAvatarLoading] = useState(false);

  const GENDERS = [
    t('personalInfo.male'),
    t('personalInfo.female'),
    t('personalInfo.other'),
  ];

  const uploadImage = async (uri: string) => {
    try {
      const filename = uri.split('/').pop() ?? 'photo.jpg';

      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image/jpeg';

      const formData = new FormData();

      formData.append('picture', {
        uri,
        name: filename,
        type,
      } as any);

      const res = await fetch(`${BASE_URL}/api/profile/personal/picture`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,    
        },
        body: formData,
      });

      // برای دیباگ
      const responseText = await res.text();
      console.log('UPLOAD RESPONSE:', res.status, responseText);

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      return true;
    } catch (error) {
      console.log('UPLOAD ERROR:', error);
      throw error;
    }
  };

  const pickFromGallery = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(t('personalInfo.permissionTitle'), t('personalInfo.permissionMessage'));
        return;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, aspect: [1, 1], quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setAvatarLoading(true);
      try {
        await uploadImage(result.assets[0].uri);
        onAvatarChange(result.assets[0].uri);
      } catch {
        Alert.alert(t('personalInfo.uploadError'), t('personalInfo.uploadErrorMessage'));
      } finally {
        setAvatarLoading(false);
      }
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t('personalInfo.permissionTitle'), t('personalInfo.cameraPermissionMessage'));
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true, aspect: [1, 1], quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setAvatarLoading(true);
      try {
        await uploadImage(result.assets[0].uri);
        onAvatarChange(result.assets[0].uri);
      } catch {
        Alert.alert(t('personalInfo.uploadError'), t('personalInfo.uploadErrorMessage'));
      } finally {
        setAvatarLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionIconWrapper}>
          <Icon name="person-outline" size={18} color="#3d6fd8" />
        </View>
        <Text style={styles.sectionTitle}>{t('personalInfo.title')}</Text>
      </View>

      <View style={styles.avatarRow}>
        <TouchableOpacity onPress={pickFromGallery} disabled={avatarLoading} style={styles.avatarWrapper}>
          {avatarLoading ? (
            <View style={styles.avatarPlaceholder}>
              <ActivityIndicator color="#3d6fd8" />
            </View>
          ) : avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Icon name="person-outline" size={32} color="#90a4ae" />
            </View>
          )}
          <View style={styles.cameraBadge}>
            <Icon name="camera" size={12} color="#fff" />
          </View>
        </TouchableOpacity>
        <View style={styles.avatarButtons}>
          <TouchableOpacity style={styles.avatarBtn} onPress={pickFromGallery} disabled={avatarLoading}>
            <Icon name="images-outline" size={15} color="#3d6fd8" />
            <Text style={styles.avatarBtnText}>{t('personalInfo.gallery')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatarBtn} onPress={takePhoto} disabled={avatarLoading}>
            <Icon name="camera-outline" size={15} color="#3d6fd8" />
            <Text style={styles.avatarBtnText}>{t('personalInfo.camera')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfField}>
          <Text style={styles.label}>{t('personalInfo.firstName')} <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder={t('personalInfo.firstNamePlaceholder')}
            placeholderTextColor="#b0bec5"
            value={data.firstName}
            onChangeText={v => { if (/^[a-zA-ZÀ-ÖØ-öø-ÿ\s\-]*$/.test(v)) onChange('firstName', v); }}
            autoCapitalize="words"
          />
        </View>
        <View style={styles.halfField}>
          <Text style={styles.label}>{t('personalInfo.lastName')} <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder={t('personalInfo.lastNamePlaceholder')}
            placeholderTextColor="#b0bec5"
            value={data.lastName}
            onChangeText={v => { if (/^[a-zA-ZÀ-ÖØ-öø-ÿ\s\-]*$/.test(v)) onChange('lastName', v); }}
            autoCapitalize="words"
          />
        </View>
      </View>

      <Text style={styles.label}>{t('personalInfo.dateOfBirth')} <Text style={styles.required}>*</Text></Text>
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

      <Text style={styles.label}>{t('personalInfo.gender')} <Text style={styles.required}>*</Text></Text>
      <View style={styles.genderRow}>
        {GENDERS.map(g => (
          <TouchableOpacity
            key={g}
            style={[styles.genderBtn, data.gender === g && styles.genderBtnActive]}
            onPress={() => onChange('gender', g)}
          >
            <Text style={[styles.genderText, data.gender === g && styles.genderTextActive]}>{g}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>{t('personalInfo.nationality')} <Text style={styles.required}>*</Text></Text>
      <View style={styles.inputRow}>
        <Icon name="flag-outline" size={18} color="#90a4ae" style={styles.inputIcon} />
        <TextInput
          style={styles.inputFlex}
          placeholder={t('personalInfo.nationalityPlaceholder')}
          placeholderTextColor="#b0bec5"
          value={data.nationality}
          onChangeText={v => onChange('nationality', v)}
          autoCapitalize="words"
        />
      </View>

      <Text style={styles.label}>{t('personalInfo.address')}</Text>
      <View style={styles.inputRow}>
        <Icon name="location-outline" size={18} color="#90a4ae" style={styles.inputIcon} />
        <TextInput
          style={styles.inputFlex}
          placeholder={t('personalInfo.addressPlaceholder')}
          placeholderTextColor="#b0bec5"
          value={data.address}
          onChangeText={v => onChange('address', v)}
          autoCapitalize="words"
        />
      </View>

      <Text style={styles.label}>{t('personalInfo.countryOfResidence')} <Text style={styles.required}>*</Text></Text>
      <View style={styles.inputRow}>
        <Icon name="earth-outline" size={18} color="#90a4ae" style={styles.inputIcon} />
        <TextInput
          style={styles.inputFlex}
          placeholder={t('personalInfo.countryPlaceholder')}
          placeholderTextColor="#b0bec5"
          value={data.countryOfResidence}
          onChangeText={v => onChange('countryOfResidence', v)}
          autoCapitalize="words"
        />
      </View>

      <Text style={styles.label}>{t('personalInfo.phoneNumber')}</Text>
      <View style={styles.inputRow}>
        <Icon name="call-outline" size={18} color="#90a4ae" style={styles.inputIcon} />
        <TextInput
          style={styles.inputFlex}
          placeholder={t('personalInfo.phonePlaceholder')}
          placeholderTextColor="#b0bec5"
          value={data.phoneNumber}
          onChangeText={v => { if (/^[\d\s\+\-]*$/.test(v)) onChange('phoneNumber', v); }}
          keyboardType="phone-pad"
        />
      </View>
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
  avatarRow: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    backgroundColor: '#f8faff', borderRadius: 16, padding: 16,
    borderWidth: 1, borderColor: '#dce8fb', marginBottom: 8,
  },
  avatarWrapper: { position: 'relative' },
  avatar: { width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE / 2 },
  avatarPlaceholder: {
    width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE / 2,
    backgroundColor: '#dce8fb', alignItems: 'center', justifyContent: 'center',
  },
  cameraBadge: {
    position: 'absolute', bottom: 0, right: 0,
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: '#3d6fd8', alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: '#fff',
  },
  avatarButtons: { flex: 1, gap: 8 },
  avatarBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 9, paddingHorizontal: 14, borderRadius: 10,
    borderWidth: 1.5, borderColor: '#dce8fb', backgroundColor: '#f0f4ff',
  },
  avatarBtnText: { fontSize: 13, fontWeight: '600', color: '#3d6fd8' },
  row: { flexDirection: 'row', gap: 12 },
  halfField: { flex: 1 },
  label: { fontSize: 13, fontWeight: '600', color: '#37474f', marginTop: 16, marginBottom: 6, letterSpacing: 0.2 },
  required: { color: '#e53935' },
  input: {
    backgroundColor: '#dce8fb', borderRadius: 10,
    paddingHorizontal: 14, paddingVertical: Platform.OS === 'ios' ? 13 : 9,
    fontSize: 15, color: '#263238', borderWidth: 1.5, borderColor: 'transparent',
  },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#dce8fb', borderRadius: 10,
    paddingHorizontal: 14, borderWidth: 1.5, borderColor: 'transparent',
  },
  inputIcon: { marginRight: 10 },
  inputFlex: { flex: 1, paddingVertical: Platform.OS === 'ios' ? 13 : 9, fontSize: 15, color: '#263238' },
  genderRow: { flexDirection: 'row', gap: 10 },
  genderBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 10,
    borderWidth: 1.5, borderColor: '#dce8fb', backgroundColor: '#f0f4ff', alignItems: 'center',
  },
  genderBtnActive: { backgroundColor: '#3d6fd8', borderColor: '#3d6fd8' },
  genderText: { fontSize: 13, fontWeight: '600', color: '#607d8b' },
  genderTextActive: { color: '#ffffff' },
});