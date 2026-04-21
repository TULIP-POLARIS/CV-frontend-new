import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from '../../../hooks/useTranslation';
import { useAuth } from '../../../context/AuthContext';

const BASE_URL = 'https://cvapiappservice-dng8e8gmh0hvdbcr.francecentral-01.azurewebsites.net';

interface ProfileAvatarStepProps {
  onAvatarSelected?: (uri: string) => void;
  initialUri?: string;
}

export default function ProfileAvatarStep({
  onAvatarSelected,
  initialUri,
}: ProfileAvatarStepProps) {
  const { t } = useTranslation();
  const { token } = useAuth();
  const [avatarUri, setAvatarUri] = useState<string | null>(initialUri ?? null);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const uploadImage = async (uri: string) => {
    const filename = uri.split('/').pop() ?? 'photo.jpg';
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image/jpeg';

    const formData = new FormData();
    formData.append('picture', { uri, name: filename, type } as any);

    const response = await fetch(`${BASE_URL}/api/profile/personal/picture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    if (!response.ok) throw new Error('Upload failed');
  };

  const requestPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(t('profileAvatar.permissionTitle'), t('profileAvatar.permissionMessage'));
        return false;
      }
    }
    return true;
  };

  const handleImage = async (uri: string) => {
    setLoading(true);
    setUploadSuccess(false);
    try {
      setAvatarUri(uri);
      onAvatarSelected?.(uri);
      await uploadImage(uri);
      setUploadSuccess(true);
    } catch {
      Alert.alert(t('profileAvatar.errorTitle'), t('profileAvatar.errorMessage'));
    } finally {
      setLoading(false);
    }
  };

  const pickFromGallery = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      await handleImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t('profileAvatar.permissionTitle'), t('profileAvatar.cameraPermissionMessage'));
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      await handleImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>{t('profileAvatar.title')}</Text>
        <Text style={styles.subtitle}>{t('profileAvatar.subtitle')}</Text>
      </View>

      <TouchableOpacity
        style={styles.avatarOuter}
        onPress={pickFromGallery}
        activeOpacity={0.85}
        disabled={loading}
      >
        <View style={styles.ring} />

        <View style={styles.avatarInner}>
          {loading ? (
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color="#3D6FD4" />
              <Text style={styles.loadingText}>{t('profileAvatar.uploading')}</Text>
            </View>
          ) : avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
          ) : (
            <View style={styles.placeholder}>
              <View style={styles.iconCircle}>
                <Ionicons name="person-outline" size={40} color="#3D6FD4" />
              </View>
            </View>
          )}
        </View>

        {!loading && (
          <View style={[styles.badge, uploadSuccess && styles.badgeSuccess]}>
            <Ionicons
              name={uploadSuccess ? 'checkmark' : 'camera'}
              size={14}
              color="#fff"
            />
          </View>
        )}
      </TouchableOpacity>

      {uploadSuccess && (
        <View style={styles.successRow}>
          <Ionicons name="checkmark-circle" size={16} color="#43a047" />
          <Text style={styles.successText}>{t('profileAvatar.uploadSuccess')}</Text>
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.btnPrimary} onPress={pickFromGallery} disabled={loading}>
          <Ionicons name="images-outline" size={18} color="#fff" />
          <Text style={styles.btnPrimaryText}>{t('profileAvatar.gallery')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecondary} onPress={takePhoto} disabled={loading}>
          <Ionicons name="camera-outline" size={18} color="#3D6FD4" />
          <Text style={styles.btnSecondaryText}>{t('profileAvatar.camera')}</Text>
        </TouchableOpacity>
      </View>

      {!avatarUri && (
        <Text style={styles.hint}>{t('profileAvatar.hint')}</Text>
      )}

    </View>
  );
}

const AVATAR_SIZE = 140;
const RING_SIZE   = AVATAR_SIZE + 24;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },

  header: {
    alignItems: 'center',
    marginBottom: 36,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A2E',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#90a4ae',
    textAlign: 'center',
    lineHeight: 20,
  },

  avatarOuter: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  ring: {
    position: 'absolute',
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: 2,
    borderColor: '#dce8fb',
    borderStyle: 'dashed',
  },
  avatarInner: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: '#f0f4ff',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3D6FD4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#e8f0ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingBox: {
    alignItems: 'center',
    gap: 8,
  },
  loadingText: {
    fontSize: 11,
    color: '#3D6FD4',
    fontWeight: '600',
  },

  badge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3D6FD4',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  badgeSuccess: {
    backgroundColor: '#43a047',
  },

  successRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  successText: {
    fontSize: 13,
    color: '#43a047',
    fontWeight: '600',
  },

  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 28,
    width: '100%',
  },
  btnPrimary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#3D6FD4',
    shadowColor: '#3D6FD4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  btnPrimaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  btnSecondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#f0f4ff',
    borderWidth: 1.5,
    borderColor: '#dce8fb',
  },
  btnSecondaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3D6FD4',
  },

  hint: {
    marginTop: 20,
    fontSize: 12,
    color: '#b0bec5',
    textAlign: 'center',
  },
});