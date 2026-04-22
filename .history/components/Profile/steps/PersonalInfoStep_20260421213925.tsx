import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from '../../../hooks/useTranslation';
import { useAuth } from '../../../context/AuthContext';

const BASE_URL =
  'https://cvapiappservice-dng8e8gmh0hvdbcr.francecentral-01.azurewebsites.net';

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

export default function PersonalInfoStep({
  data,
  onChange,
  avatarUri,
  onAvatarChange,
}: Props) {
  const { t } = useTranslation();
  const { token } = useAuth();
  const [avatarLoading, setAvatarLoading] = useState(false);

  const uploadImage = async (uri: string) => {
    try {
      const formData = new FormData();

      // 🔁 اگر کار نکرد فقط این اسم رو عوض کن (file / picture / image)
      formData.append('file', {
        uri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      } as any);

      console.log('URI:', uri);
      console.log('TOKEN:', token);

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

      if (!res.ok) throw new Error('Upload failed');
    } catch (error) {
      console.log('UPLOAD ERROR:', error);
      throw error;
    }
  };

  const pickFromGallery = async () => {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission', 'Gallery access needed');
      return;
    }

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

    if (status !== 'granted') {
      Alert.alert('Permission', 'Camera access needed');
      return;
    }

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
      {/* Header */}
      <View style={styles.header}>
        <Icon name="person-outline" size={18} color="#3d6fd8" />
        <Text style={styles.title}>Personal Info</Text>
      </View>

      {/* Avatar */}
      <View style={styles.avatarSection}>
        <TouchableOpacity onPress={pickFromGallery}>
          {avatarLoading ? (
            <ActivityIndicator />
          ) : avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Icon name="person-outline" size={30} color="#90a4ae" />
            </View>
          )}
        </TouchableOpacity>

        <View style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={pickFromGallery}>
            <Text>Choose from gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={takePhoto}>
            <Text>Take photo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={data.firstName}
        onChangeText={(v) => onChange('firstName', v)}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={data.lastName}
        onChangeText={(v) => onChange('lastName', v)}
      />

      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={data.dateOfBirth}
        onChangeText={(v) => onChange('dateOfBirth', v)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },

  header: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
  },

  avatarSection: {
    alignItems: 'center',
    marginBottom: 20,
  },

  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },

  avatarPlaceholder: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: '#dce8fb',
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
});