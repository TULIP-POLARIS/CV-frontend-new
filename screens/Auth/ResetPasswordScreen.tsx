import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, SafeAreaView,
  KeyboardAvoidingView, Platform, StatusBar,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';

const RESET_API_URL = 'https://cvapiappservice-dng8e8gmh0hvdbcr.francecentral-01.azurewebsites.net/api/auth/reset-password';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ResetPassword'>;
  route: RouteProp<RootStackParamList, 'ResetPassword'>;
};

const FieldError = ({ msg }: { msg: string }) =>
  msg ? (
    <View style={styles.fieldErrorRow}>
      <Icon name="alert-circle-outline" size={13} color="#e53935" />
      <Text style={styles.fieldErrorText}>{msg}</Text>
    </View>
  ) : null;

export default function ResetPasswordScreen({ navigation, route }: Props) {
  const { email } = route.params;

 
  const [newPassword, setNewPassword]   = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew]           = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [loading, setLoading]           = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const validate = () => {
    let valid = true;

    

    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (newPassword !== confirmPassword) {
      setConfirmError('Passwords do not match.');
      valid = false;
    } else {
      setConfirmError('');
    }

    return valid;
  };

  const handleReset = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      
const response = await fetch(`${RESET_API_URL}?email=${encodeURIComponent(email)}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ newPassword }),
});

      const contentType = response.headers.get('content-type');
      const data = contentType?.includes('application/json')
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        throw new Error(typeof data === 'string' ? data : data.message || 'Something went wrong.');
      }

      // ✅ Password reset successful → go back to Login
      navigation.navigate('Login');

    } catch (error: any) {
      setPasswordError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.form}>

            <View style={styles.iconWrapper}>
              <Icon name="key-outline" size={36} color="#3d6fd8" />
            </View>

            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>
              Enter the token sent to <Text style={styles.emailHighlight}>{email}</Text> and choose a new password.
            </Text>

            

            {/* New Password Field */}
            <Text style={[styles.label, { marginTop: 16 }]}>
              New Password <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.inputPassword, passwordError ? styles.inputError : null]}
                placeholder="Enter new password"
                placeholderTextColor="#b0bec5"
                value={newPassword}
                onChangeText={v => { setNewPassword(v); if (passwordError) setPasswordError(''); }}
                secureTextEntry={!showNew}
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowNew(!showNew)}>
                <Icon name={showNew ? 'eye-outline' : 'eye-off-outline'} size={20} color="#90a4ae" />
              </TouchableOpacity>
            </View>
            <FieldError msg={passwordError} />

            {/* Confirm Password Field */}
            <Text style={[styles.label, { marginTop: 16 }]}>
              Confirm Password <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.inputPassword, confirmError ? styles.inputError : null]}
                placeholder="Confirm new password"
                placeholderTextColor="#b0bec5"
                value={confirmPassword}
                onChangeText={v => { setConfirmPassword(v); if (confirmError) setConfirmError(''); }}
                secureTextEntry={!showConfirm}
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirm(!showConfirm)}>
                <Icon name={showConfirm ? 'eye-outline' : 'eye-off-outline'} size={20} color="#90a4ae" />
              </TouchableOpacity>
            </View>
            <FieldError msg={confirmError} />

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.btnPrimary, loading && styles.btnDisabled]}
              onPress={handleReset}
              disabled={loading}
            >
              {loading ? (
                <View style={styles.loadingRow}>
                  <Icon name="reload-outline" size={18} color="#fff" />
                  <Text style={styles.btnPrimaryText}>  Resetting...</Text>
                </View>
              ) : (
                <Text style={styles.btnPrimaryText}>Reset Password</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.backRow} onPress={() => navigation.goBack()}>
              <Icon name="arrow-back-outline" size={16} color="#3d6fd8" />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: '#ffffff' },
  flex:   { flex: 1 },
  scroll: { paddingBottom: 48 },
  form:   { paddingHorizontal: 24, paddingTop: 48 },

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
  emailHighlight: { color: '#3d6fd8', fontWeight: '600' },

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

  passwordWrapper: { position: 'relative' },
  inputPassword: {
    backgroundColor: '#dce8fb', borderRadius: 10,
    paddingHorizontal: 14, paddingRight: 46,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 15, color: '#263238',
    borderWidth: 1.5, borderColor: 'transparent',
  },
  eyeIcon: {
    position: 'absolute', right: 14,
    top: 0, bottom: 0, justifyContent: 'center',
  },

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