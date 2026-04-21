import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
  Pressable,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useTranslation } from '../../hooks/useTranslation';
import * as DocumentPicker from 'expo-document-picker';
import { useAuth } from '../../context/AuthContext';

const ROBOT_IMAGE = require('../../assets/robot.png');

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 24 * 2 - 16) / 2;

type Props = {
  onUploadCV: (file: DocumentPicker.DocumentPickerAsset) => void;
  onShareBackground: (text: string) => void;
};

export default function HomeCards({ onUploadCV, onShareBackground }: Props) {
  const { t } = useTranslation();
  const { token } = useAuth();

  const [uploadModal, setUploadModal]         = useState(false);
  const [backgroundModal, setBackgroundModal] = useState(false);
  const [selectedFile, setSelectedFile]       = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [uploading, setUploading]             = useState(false);
  const [backgroundText, setBackgroundText]   = useState('');
  const [saving, setSaving]                   = useState(false);

  const handlePickPDF = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });
      if (!result.canceled && result.assets.length > 0) {
        setSelectedFile(result.assets[0]);
      }
    } catch {
      Alert.alert('Error', 'Failed to pick file. Please try again.');
    }
  };


  const handleUpload = async () => {
  if (!selectedFile) return;
  setUploading(true);
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: selectedFile.uri,
      type: 'application/pdf',
      name: selectedFile.name,
    } as any);

      const response = await fetch(
        'https://cvapiappservice-dng8e8gmh0hvdbcr.francecentral-01.azurewebsites.net/api/cv/upload',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        }
      );

      const contentType = response.headers.get('content-type');
      const data = contentType?.includes('application/json')
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        throw new Error(typeof data === 'string' ? data : data.message || 'Upload failed');
      }

      onUploadCV(selectedFile);
      setUploadModal(false);
      setSelectedFile(null);
      Alert.alert('Success', 'CV uploaded successfully!');
    } catch (error: any) {
      Alert.alert('Error', error.message || t('home.errorUpload'));
    } finally {
      setUploading(false);
    }
  };

  const handleSaveBackground = async () => {
    if (!backgroundText.trim()) {
      Alert.alert('Error', 'Please write something about yourself.');
      return;
    }
    setSaving(true);
    try {
      onShareBackground(backgroundText);
      setBackgroundModal(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.card} onPress={() => setUploadModal(true)}>
        <View style={styles.iconWrapper}>
          <Icon name="cloud-upload-outline" size={32} color="#3d6fd8" />
        </View>
        <Text style={styles.cardText}>{t('home.uploadCV')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => setBackgroundModal(true)}>
        <View style={styles.robotWrapper}>
          <Image source={ROBOT_IMAGE} style={styles.robotImage} resizeMode="contain" />
        </View>
        <Text style={styles.cardText}>{t('home.shareBackground')}</Text>
      </TouchableOpacity>

      {/* ── Upload PDF Modal ── */}
      <Modal visible={uploadModal} transparent animationType="slide">
        <Pressable style={styles.overlay} onPress={() => { setUploadModal(false); setSelectedFile(null); }}>
          <Pressable style={styles.sheet} onPress={() => {}}>

            <View style={styles.handle} />

            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Upload CV</Text>
              <TouchableOpacity onPress={() => { setUploadModal(false); setSelectedFile(null); }} style={styles.closeBtn}>
                <Icon name="close" size={22} color="#607d8b" />
              </TouchableOpacity>
            </View>

            <Text style={styles.sheetSubtitle}>Only PDF files are accepted. Max size: 10MB.</Text>

            {!selectedFile ? (
              <TouchableOpacity style={styles.dropZone} onPress={handlePickPDF}>
                <View style={styles.dropIconWrapper}>
                  <Icon name="document-outline" size={40} color="#3d6fd8" />
                </View>
                <Text style={styles.dropTitle}>Tap to select a PDF</Text>
                <Text style={styles.dropSubtitle}>Browse your files</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.fileCard}>
                <View style={styles.fileIconWrapper}>
                  <Icon name="document-text" size={28} color="#e53935" />
                </View>
                <View style={styles.fileInfo}>
                  <Text style={styles.fileName} numberOfLines={1}>{selectedFile.name}</Text>
                  <Text style={styles.fileSize}>
                    {selectedFile.size ? `${(selectedFile.size / 1024).toFixed(1)} KB` : 'Unknown size'}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setSelectedFile(null)} style={styles.fileRemove}>
                  <Icon name="close-circle" size={20} color="#90a4ae" />
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.sheetActions}>
              {selectedFile && (
                <TouchableOpacity style={styles.btnSecondary} onPress={handlePickPDF}>
                  <Icon name="refresh-outline" size={16} color="#3d6fd8" />
                  <Text style={styles.btnSecondaryText}>Change file</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.btnPrimary, (!selectedFile || uploading) && styles.btnDisabled]}
                onPress={handleUpload}
                disabled={!selectedFile || uploading}
              >
                <Icon name="cloud-upload-outline" size={18} color="#ffffff" />
                <Text style={styles.btnPrimaryText}>{uploading ? 'Uploading...' : 'Upload CV'}</Text>
              </TouchableOpacity>
            </View>

          </Pressable>
        </Pressable>
      </Modal>

      {/* ── Share Background Modal ── */}
      <Modal visible={backgroundModal} transparent animationType="slide">
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Pressable style={styles.overlay} onPress={() => setBackgroundModal(false)}>
            <Pressable style={styles.sheet} onPress={() => {}}>

              <View style={styles.handle} />

              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>Share Your Background</Text>
                <TouchableOpacity onPress={() => setBackgroundModal(false)} style={styles.closeBtn}>
                  <Icon name="close" size={22} color="#607d8b" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.bgScrollView} keyboardShouldPersistTaps="handled">

                <View style={styles.bgHintBox}>
                  <Icon name="information-circle-outline" size={18} color="#3d6fd8" />
                  <Text style={styles.bgHintText}>
                    Tell us about yourself — your experience, skills, education, goals, or anything relevant. The more you share, the better your CV will be.
                  </Text>
                </View>

                <View style={styles.bgInputWrapper}>
                  <TextInput
                    style={styles.bgInput}
                    placeholder="e.g. I have 5 years of experience in software development, worked at Nokia as a React Native developer, graduated from Metropolia..."
                    placeholderTextColor="#b0bec5"
                    value={backgroundText}
                    onChangeText={setBackgroundText}
                    multiline
                    numberOfLines={8}
                    textAlignVertical="top"
                  />
                  {backgroundText.length > 0 && (
                    <TouchableOpacity
                      style={styles.bgClearBtn}
                      onPress={() => setBackgroundText('')}
                    >
                      <Icon name="close-circle" size={18} color="#b0bec5" />
                    </TouchableOpacity>
                  )}
                </View>

                <Text style={styles.bgCharCount}>{backgroundText.length} characters</Text>

                <View style={styles.sheetActions}>
                  <TouchableOpacity
                    style={[styles.btnPrimary, (!backgroundText.trim() || saving) && styles.btnDisabled]}
                    onPress={handleSaveBackground}
                    disabled={!backgroundText.trim() || saving}
                  >
                    <Icon name="checkmark-outline" size={18} color="#ffffff" />
                    <Text style={styles.btnPrimaryText}>{saving ? 'Saving...' : 'Save Background'}</Text>
                  </TouchableOpacity>
                </View>

              </ScrollView>

            </Pressable>
          </Pressable>
        </KeyboardAvoidingView>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },

  container: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 16,
  },

  card: {
    width: CARD_WIDTH,
    backgroundColor: '#eef4ff',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 14,
    borderWidth: 1.5,
    borderColor: '#dce8fb',
    shadowColor: '#3d6fd8',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },

  iconWrapper: {
    width: 64, height: 64, borderRadius: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#3d6fd8', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12, shadowRadius: 6, elevation: 3,
  },

  robotWrapper: {
    width: 64, height: 64, borderRadius: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#3d6fd8', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12, shadowRadius: 6, elevation: 3,
    overflow: 'hidden',
  },
  robotImage: { width: 52, height: 52 },

  cardText: {
    fontSize: 13, fontWeight: '600',
    color: '#263238', textAlign: 'center', lineHeight: 19,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
    maxHeight: '85%',
  },
  handle: {
    width: 40, height: 4, backgroundColor: '#e0e0e0',
    borderRadius: 2, alignSelf: 'center', marginTop: 12,
  },
  sheetHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 20,
    paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  sheetTitle:    { fontSize: 17, fontWeight: '700', color: '#263238' },
  closeBtn:      { padding: 4 },
  sheetSubtitle: { fontSize: 13, color: '#90a4ae', paddingHorizontal: 20, marginTop: 12, marginBottom: 4 },

  dropZone: {
    margin: 20,
    borderWidth: 2, borderColor: '#dce8fb', borderStyle: 'dashed',
    borderRadius: 16, paddingVertical: 36,
    alignItems: 'center', gap: 10, backgroundColor: '#f8faff',
  },
  dropIconWrapper: {
    width: 72, height: 72, borderRadius: 20,
    backgroundColor: '#eef4ff',
    justifyContent: 'center', alignItems: 'center', marginBottom: 4,
  },
  dropTitle:    { fontSize: 15, fontWeight: '700', color: '#263238' },
  dropSubtitle: { fontSize: 13, color: '#90a4ae' },

  fileCard: {
    flexDirection: 'row', alignItems: 'center',
    margin: 20, backgroundColor: '#f8faff',
    borderRadius: 14, padding: 14,
    borderWidth: 1, borderColor: '#dce8fb', gap: 12,
  },
  fileIconWrapper: {
    width: 48, height: 48, borderRadius: 12,
    backgroundColor: '#fff5f5',
    justifyContent: 'center', alignItems: 'center',
  },
  fileInfo:   { flex: 1 },
  fileName:   { fontSize: 14, fontWeight: '600', color: '#263238' },
  fileSize:   { fontSize: 12, color: '#90a4ae', marginTop: 2 },
  fileRemove: { padding: 4 },

  sheetActions: { paddingHorizontal: 20, gap: 10 },

  btnPrimary: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 8,
    paddingVertical: 15, borderRadius: 25,
    backgroundColor: '#3d6fd8',
    shadowColor: '#3d6fd8', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  btnDisabled:     { backgroundColor: '#90a4ae', shadowOpacity: 0, elevation: 0 },
  btnPrimaryText:  { fontSize: 15, fontWeight: '700', color: '#ffffff', letterSpacing: 0.5 },

  btnSecondary: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 6,
    paddingVertical: 12, borderRadius: 25,
    borderWidth: 1.5, borderColor: '#3d6fd8', backgroundColor: '#ffffff',
  },
  btnSecondaryText: { fontSize: 14, fontWeight: '600', color: '#3d6fd8' },

  bgScrollView: { paddingHorizontal: 20 },

  bgHintBox: {
    flexDirection: 'row', alignItems: 'flex-start',
    backgroundColor: '#eef4ff', borderRadius: 12,
    padding: 14, gap: 10, marginTop: 16, marginBottom: 12,
  },
  bgHintText: { flex: 1, fontSize: 13, color: '#455a64', lineHeight: 20 },

  bgInputWrapper: {
    backgroundColor: '#dce8fb', borderRadius: 12,
    borderWidth: 1.5, borderColor: 'transparent',
  },
  bgInput: {
    fontSize: 14, color: '#263238',
    padding: 14, minHeight: 160,
    textAlignVertical: 'top', lineHeight: 22,
  },
  bgClearBtn: {
    position: 'absolute', top: 10, right: 10,
  },
  bgCharCount: {
    fontSize: 12, color: '#90a4ae',
    textAlign: 'right', marginTop: 6, marginBottom: 16,
  },
});