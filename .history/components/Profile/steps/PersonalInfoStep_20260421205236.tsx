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

export default function PersonalInfoStep({
  data,
  onChange,
  avatarUri,
  onAvatarChange,
}: Props) {
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

      const text = await res.text();
      console.log('UPLOAD RESPONSE:', res.status, text);

      if (!res.ok) throw new Error('Upload failed');
    } catch (error) {
      console.log('UPLOAD ERROR:', error);
      throw error;
    }
  };

  const pickFromGallery = async () => {
    if (Platform.OS !== 'web') {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          t('personalInfo.permissionTitle'),
          t('personalInfo.permissionMessage')
        );
        return;
      }
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
        Alert.alert(
          t('personalInfo.uploadError'),
          t('personalInfo.uploadErrorMessage')
        );
      } finally {
        setAvatarLoading(false);
      }
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        t('personalInfo.permissionTitle'),
        t('personalInfo.cameraPermissionMessage')
      );
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
        Alert.alert(
          t('personalInfo.uploadError'),
          t('personalInfo.uploadErrorMessage')
        );
      } finally {
        setAvatarLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarRow}>
        <TouchableOpacity
          onPress={pickFromGallery}
          disabled={avatarLoading}
        >
          {avatarLoading ? (
            <ActivityIndicator />
          ) : avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Icon name="person-outline" size={32} color="#90a4ae" />
            </View>
          )}
        </TouchableOpacity>
      </View>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  avatarRow: {
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});