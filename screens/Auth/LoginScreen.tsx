import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../hooks/useTranslation';
import ScreenHeader from '../../components/ScreenHeader';

const HEADER_IMAGE = require('../../assets/headerLogin.jpg');
const API_URL = 'https://cvapiappservice-dng8e8gmh0hvdbcr.francecentral-01.azurewebsites.net/api/auth/login';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
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

export default function LoginScreen({ navigation }: Props) {
  const { login } = useAuth();
  const { t } = useTranslation();

  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [errors, setErrors]             = useState({ email: '', password: '' });

  const validate = () => {
    const e = { email: '', password: '' };
    let valid = true;

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      e.email = t('login.emailError');
      valid = false;
    }
    if (!password.trim()) {
      e.password = t('login.passwordError');
      valid = false;
    }

    setErrors(e);
    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const contentType = response.headers.get('content-type');
      const data = contentType?.includes('application/json')
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid email or password. Please try again.');
        }
        throw new Error(
          typeof data === 'string'
            ? data
            : data.message || data.title || 'Login failed'
        );
      }

      await login(data.token, email);
      navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
    } catch (error: any) {
      Alert.alert(t('login.loginFailed'), error.message || t('login.somethingWentWrong'));
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
          <ScreenHeader showBack={false} tintColor="#020b16" />

          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.form}>

              <Text style={styles.welcomeTitle}>{t('login.welcomeTitle')}</Text>
              <Text style={styles.welcomeSubtitle}>{t('login.welcomeSubtitle')}</Text>

              <Text style={styles.label}>
                {t('login.email')} <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.email ? styles.inputError : null]}
                placeholder={t('login.emailPlaceholder')}
                placeholderTextColor="#b0bec5"
                value={email}
                onChangeText={v => {
                  setEmail(v);
                  if (errors.email) setErrors(e => ({ ...e, email: '' }));
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
              />
              <FieldError msg={errors.email} />

              <Text style={styles.label}>
                {t('login.password')} <Text style={styles.required}>*</Text>
              </Text>
              <View style={[styles.inputRow, errors.password ? styles.inputError : null]}>
                <TextInput
                  style={styles.inputFlex}
                  placeholder={t('login.passwordPlaceholder')}
                  placeholderTextColor="#b0bec5"
                  value={password}
                  onChangeText={v => {
                    setPassword(v);
                    if (errors.password) setErrors(e => ({ ...e, password: '' }));
                  }}
                  secureTextEntry={!showPassword}
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(p => !p)}
                  style={styles.eyeBtn}
                >
                  <Icon
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={22}
                    color="#90a4ae"
                  />
                </TouchableOpacity>
              </View>
              <FieldError msg={errors.password} />

              <TouchableOpacity
                style={styles.forgotRow}
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text style={styles.forgotText}>{t('login.forgotPassword')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btnPrimary, loading && styles.btnDisabled]}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <View style={styles.loadingRow}>
                    <Icon name="reload-outline" size={18} color="#fff" />
                    <Text style={styles.btnPrimaryText}>  {t('login.pleaseWait')}</Text>
                  </View>
                ) : (
                  <Text style={styles.btnPrimaryText}>{t('login.loginButton')}</Text>
                )}
              </TouchableOpacity>

              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              <TouchableOpacity
                style={styles.btnSecondary}
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={styles.btnSecondaryText}>{t('login.createAccount')}</Text>
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

  form: { paddingHorizontal: 24, paddingTop: 20 },

  welcomeTitle: {
    fontSize: 26, fontWeight: '700',
    color: '#263238', marginBottom: 6, letterSpacing: 0.2,
  },
  welcomeSubtitle: {
    fontSize: 14, color: '#90a4ae',
    marginBottom: 24, lineHeight: 20,
  },

  label: {
    fontSize: 13, fontWeight: '600',
    color: '#37474f', marginTop: 16,
    marginBottom: 6, letterSpacing: 0.2,
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

  inputRow: {
    backgroundColor: '#dce8fb', borderRadius: 10,
    flexDirection: 'row', alignItems: 'center',
    borderWidth: 1.5, borderColor: 'transparent',
  },
  inputFlex: {
    flex: 1, paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 15, color: '#263238',
  },
  eyeBtn: { paddingHorizontal: 14, paddingVertical: 10 },

  forgotRow:  { alignItems: 'flex-end', marginTop: 10 },
  forgotText: { fontSize: 13, color: '#3d6fd8', fontWeight: '500' },

  btnPrimary: {
    backgroundColor: '#3d6fd8', borderRadius: 25,
    paddingVertical: 15, alignItems: 'center', marginTop: 24,
    shadowColor: '#3d6fd8', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  btnDisabled:    { backgroundColor: '#90a4ae', shadowOpacity: 0, elevation: 0 },
  btnPrimaryText: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
  loadingRow:     { flexDirection: 'row', alignItems: 'center' },

  dividerRow: {
    flexDirection: 'row', alignItems: 'center',
    marginTop: 24, gap: 12,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#e0e0e0' },
  dividerText: { fontSize: 13, color: '#90a4ae', fontWeight: '500' },

  btnSecondary: {
    borderWidth: 1.5, borderColor: '#3d6fd8',
    borderRadius: 25, paddingVertical: 13,
    alignItems: 'center', marginTop: 12, backgroundColor: '#fff',
  },
  btnSecondaryText: { color: '#3d6fd8', fontSize: 14, fontWeight: '600' },
});