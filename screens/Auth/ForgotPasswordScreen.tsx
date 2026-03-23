import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, SafeAreaView,
  KeyboardAvoidingView, Platform, Image,
  Dimensions, StatusBar,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useTranslation } from '../../hooks/useTranslation';
import ScreenHeader from '../../components/ScreenHeader';

const HEADER_IMAGE = require('../../assets/headerForgotPassword.jpg');
const API_URL = 'https://cvapiappservice-dng8e8gmh0hvdbcr.francecentral-01.azurewebsites.net/api/auth/forgot-password';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;
};

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = width * (220 / 390);

const FieldError = ({ msg }: { msg: string }) =>
  msg ? (
    <View style={styles.fieldErrorRow}>
      <Icon name="alert-circle-outline" size={13} color="#e53935" />
      <Text style={styles.fieldErrorText}>{msg}</Text>
    </View>
  ) : null;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const { t } = useTranslation();

  const [email, setEmail]           = useState('');
  const [loading, setLoading]       = useState(false);
  const [emailError, setEmailError] = useState('');

  const validate = () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(t('forgotPassword.emailError'));
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const contentType = response.headers.get('content-type');
      const data = contentType?.includes('application/json')
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        throw new Error(typeof data === 'string' ? data : data.message || t('forgotPassword.somethingWentWrong'));
      }

      navigation.navigate('CheckEmail', { email });
    } catch (error: any) {
      setEmailError(error.message || t('forgotPassword.somethingWentWrong'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.flex}>
          <Image source={HEADER_IMAGE} style={styles.headerImage} resizeMode="cover" />
          <ScreenHeader showBack tintColor="#ffffff" />

          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.form}>

              <View style={styles.iconWrapper}>
                <Icon name="lock-closed-outline" size={36} color="#3d6fd8" />
              </View>

              <Text style={styles.title}>{t('forgotPassword.title')}</Text>
              <Text style={styles.subtitle}>{t('forgotPassword.subtitle')}</Text>

              <Text style={styles.label}>
                {t('forgotPassword.email')} <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, emailError ? styles.inputError : null]}
                placeholder={t('forgotPassword.emailPlaceholder')}
                placeholderTextColor="#b0bec5"
                value={email}
                onChangeText={v => {
                  setEmail(v);
                  if (emailError) setEmailError('');
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
              />
              <FieldError msg={emailError} />

              <TouchableOpacity
                style={[styles.btnPrimary, loading && styles.btnDisabled]}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <View style={styles.loadingRow}>
                    <Icon name="reload-outline" size={18} color="#fff" />
                    <Text style={styles.btnPrimaryText}>  {t('forgotPassword.sending')}</Text>
                  </View>
                ) : (
                  <Text style={styles.btnPrimaryText}>{t('forgotPassword.sendButton')}</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.backRow}
                onPress={() => navigation.goBack()}
              >
                <Icon name="arrow-back-outline" size={16} color="#3d6fd8" />
                <Text style={styles.backText}>{t('forgotPassword.backToLogin')}</Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: '#ffffff' },
  flex:   { flex: 1 },
  scroll: { paddingBottom: 48 },

  headerImage: { width, height: HEADER_HEIGHT },

  form: { paddingHorizontal: 24, paddingTop: 28 },

  iconWrapper: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: '#eef4ff',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 20, alignSelf: 'center',
  },

  title: {
    fontSize: 24, fontWeight: '700',
    color: '#263238', marginBottom: 8,
    textAlign: 'center', letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 14, color: '#90a4ae',
    textAlign: 'center', lineHeight: 22,
    marginBottom: 28, paddingHorizontal: 8,
  },

  label: {
    fontSize: 13, fontWeight: '600',
    color: '#37474f', marginBottom: 6, letterSpacing: 0.2,
  },
  required: { color: '#e53935' },

  input: {
    backgroundColor: '#dce8fb', borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 15, color: '#263238',
    borderWidth: 1.5, borderColor: 'transparent',
  },
  inputError: { borderColor: '#e53935', backgroundColor: '#fff5f5' },

  fieldErrorRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 4, marginTop: 5, marginLeft: 2,
  },
  fieldErrorText: { fontSize: 12, color: '#e53935' },

  btnPrimary: {
    backgroundColor: '#3d6fd8', borderRadius: 25,
    paddingVertical: 15, alignItems: 'center', marginTop: 24,
    shadowColor: '#3d6fd8', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  btnDisabled:    { backgroundColor: '#90a4ae', shadowOpacity: 0, elevation: 0 },
  btnPrimaryText: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
  loadingRow:     { flexDirection: 'row', alignItems: 'center' },

  backRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 6, marginTop: 24,
  },
  backText: { fontSize: 14, color: '#3d6fd8', fontWeight: '500' },
});