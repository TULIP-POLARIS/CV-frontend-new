import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
  Dimensions,
  Modal,
  FlatList,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useTranslation } from '../../hooks/useTranslation';
import ScreenHeader from '../../components/ScreenHeader';

const HEADER_IMAGE = require('../../assets/headerRegister.jpg');

const API_URL =
  'https://cvapiappservice-dng8e8gmh0hvdbcr.francecentral-01.azurewebsites.net/api/auth/register';

const COUNTRIES = [
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫' },
  { code: 'AL', name: 'Albania', flag: '🇦🇱' },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'AM', name: 'Armenia', flag: '🇦🇲' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿' },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪' },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'GE', name: 'Georgia', flag: '🇬🇪' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'IR', name: 'Iran', flag: '🇮🇷' },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻' },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'RS', name: 'Serbia', flag: '🇷🇸' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'YE', name: 'Yemen', flag: '🇾🇪' },
];

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
};

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = width * (220 / 390);

const CheckItem = ({ ok, text }: { ok: boolean; text: string }) => (
  <View style={styles.checkItem}>
    <Icon
      name={ok ? 'checkmark-circle' : 'ellipse-outline'}
      size={16}
      color={ok ? '#43a047' : '#b0bec5'}
    />
    <Text style={[styles.checkText, ok && styles.checkTextDone]}>{text}</Text>
  </View>
);

const FieldError = ({ msg }: { msg: string }) =>
  msg ? (
    <View style={styles.fieldErrorRow}>
      <Icon name="alert-circle-outline" size={13} color="#e53935" />
      <Text style={styles.fieldErrorText}>{msg}</Text>
    </View>
  ) : null;

export default function RegisterScreen({ navigation }: Props) {
  const { t } = useTranslation();

  const [firstName, setFirstName]     = useState('');
  const [lastName, setLastName]       = useState('');
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry]         = useState<typeof COUNTRIES[0] | null>(null);
  const [countrySearch, setCountrySearch] = useState('');
  const [countryModal, setCountryModal]   = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [loading, setLoading]         = useState(false);

  const [errors, setErrors] = useState({
    firstName: '', lastName: '', email: '', password: '', country: '',
  });

  const passwordChecks = {
    length:    password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number:    /[0-9]/.test(password),
    symbol:    /[^a-zA-Z0-9]/.test(password),
  };
  const passedCount = Object.values(passwordChecks).filter(Boolean).length;

  const passwordStrength = () => {
    if (!password) return { label: '', color: '#e0e0e0', percent: 0 };
    if (passedCount <= 2) return { label: 'Weak',   color: '#e53935', percent: 20 };
    if (passedCount === 3) return { label: 'Fair',   color: '#fb8c00', percent: 50 };
    if (passedCount === 4) return { label: 'Good',   color: '#43a047', percent: 75 };
    return                        { label: 'Strong', color: '#1b5e20', percent: 100 };
  };
  const strength = passwordStrength();

  const validate = () => {
    const e = { firstName: '', lastName: '', email: '', password: '', country: '' };
    let valid = true;

    if (!firstName.trim()) {
      e.firstName = 'First name is required'; valid = false;
    } else if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s\-]+$/.test(firstName)) {
      e.firstName = 'Only letters, spaces and hyphens allowed'; valid = false;
    }

    if (!lastName.trim()) {
      e.lastName = 'Last name is required'; valid = false;
    } else if (!/^[a-zA-ZÀ-ÖØ-öø-ÿ\s\-]+$/.test(lastName)) {
      e.lastName = 'Only letters, spaces and hyphens allowed'; valid = false;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      e.email = 'Enter a valid email address'; valid = false;
    }

    if (!passwordChecks.length || !passwordChecks.uppercase) {
      e.password = 'Password does not meet requirements'; valid = false;
    }

    if (!country) {
      e.country = 'Please select your country'; valid = false;
    }

    setErrors(e);
    return valid;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const name = `${firstName} ${lastName}`.trim();
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, password,
          phoneNumber: phoneNumber || undefined,
          country: country?.code,
        }),
      });
      const contentType = response.headers.get('content-type');
      const data = contentType?.includes('application/json')
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        throw new Error(typeof data === 'string' ? data : data.message || 'Registration failed');
      }
      Alert.alert(t('register.successTitle'), t('register.successMessage'), [
        { text: t('register.ok'), onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error: any) {
      Alert.alert(t('register.registrationFailed'), error.message || t('register.somethingWentWrong'));
    } finally {
      setLoading(false);
    }
  };

  const filteredCountries = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.flex}>

          <Image source={HEADER_IMAGE} style={styles.headerImage} resizeMode="cover" />
          <ScreenHeader showBack tintColor="#01131b" />

          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >

            <View style={styles.form}>

              <Text style={styles.label}>
                {t('register.firstName')} <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.firstName ? styles.inputError : null]}
                placeholder={t('register.firstNamePlaceholder')}
                placeholderTextColor="#b0bec5"
                value={firstName}
                onChangeText={v => {
                  if (/^[a-zA-ZÀ-ÖØ-öø-ÿ\s\-]*$/.test(v)) setFirstName(v);
                }}
                autoCapitalize="words"
                returnKeyType="next"
              />
              <FieldError msg={errors.firstName} />

              <Text style={styles.label}>
                {t('register.lastName')} <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.lastName ? styles.inputError : null]}
                placeholder={t('register.lastNamePlaceholder')}
                placeholderTextColor="#b0bec5"
                value={lastName}
                onChangeText={v => {
                  if (/^[a-zA-ZÀ-ÖØ-öø-ÿ\s\-]*$/.test(v)) setLastName(v);
                }}
                autoCapitalize="words"
                returnKeyType="next"
              />
              <FieldError msg={errors.lastName} />

              <Text style={styles.label}>
                {t('register.email')} <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.email ? styles.inputError : null]}
                placeholder={t('register.emailPlaceholder')}
                placeholderTextColor="#b0bec5"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
              />
              <FieldError msg={errors.email} />

              <Text style={styles.label}>
                {t('register.password')} <Text style={styles.required}>*</Text>
              </Text>
              <View style={[styles.inputRow, errors.password ? styles.inputError : null]}>
                <TextInput
                  style={styles.inputFlex}
                  placeholder={t('register.passwordPlaceholder')}
                  placeholderTextColor="#b0bec5"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  returnKeyType="next"
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

              {password.length > 0 && (
                <View style={styles.strengthWrapper}>
                  <View style={styles.strengthBarRow}>
                    <View style={styles.strengthBarBg}>
                      <View style={[
                        styles.strengthBarFill,
                        { width: `${strength.percent}%` as any, backgroundColor: strength.color }
                      ]} />
                    </View>
                    <Text style={[styles.strengthLabel, { color: strength.color }]}>
                      {strength.label}
                    </Text>
                  </View>
                  <View style={styles.checkList}>
                    <CheckItem ok={passwordChecks.length}    text="At least 12 characters" />
                    <CheckItem ok={passwordChecks.uppercase} text="One uppercase letter (A-Z)" />
                    <CheckItem ok={passwordChecks.lowercase} text="One lowercase letter (a-z)" />
                    <CheckItem ok={passwordChecks.number}    text="One number (0-9)" />
                    <CheckItem ok={passwordChecks.symbol}    text="One symbol (!@#$...)" />
                  </View>
                </View>
              )}
              <FieldError msg={errors.password} />

              <Text style={styles.label}>
                {t('register.phoneNumber')}
                <Text style={styles.optional}> (optional)</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder={t('register.phoneNumberPlaceholder')}
                placeholderTextColor="#b0bec5"
                value={phoneNumber}
                onChangeText={v => { if (/^\d*$/.test(v)) setPhoneNumber(v); }}
                keyboardType="number-pad"
                returnKeyType="next"
              />

              <Text style={styles.label}>
                {t('register.country')} <Text style={styles.required}>*</Text>
              </Text>
              <TouchableOpacity
                style={[styles.input, styles.countryPicker, errors.country ? styles.inputError : null]}
                onPress={() => setCountryModal(true)}
              >
                <Text style={country ? styles.countrySelected : styles.countryPlaceholder}>
                  {country ? `${country.flag}  ${country.name}` : t('register.countryPlaceholder')}
                </Text>
                <Icon name="chevron-down-outline" size={18} color="#90a4ae" />
              </TouchableOpacity>
              <FieldError msg={errors.country} />

              <View style={styles.privacyRow}>
                <Switch
                  value={acceptedPrivacy}
                  onValueChange={setAcceptedPrivacy}
                  trackColor={{ false: '#cfd8dc', true: '#3d6fd8' }}
                  thumbColor="#ffffff"
                />
                <Text style={styles.privacyText}>{t('register.acceptPrivacy')}</Text>
              </View>

              <TouchableOpacity
                style={[styles.btnPrimary, (!acceptedPrivacy || loading) && styles.btnDisabled]}
                onPress={handleRegister}
                disabled={!acceptedPrivacy || loading}
              >
                {loading ? (
                  <View style={styles.loadingRow}>
                    <Icon name="reload-outline" size={18} color="#fff" />
                    <Text style={styles.btnPrimaryText}>  Please wait...</Text>
                  </View>
                ) : (
                  <Text style={styles.btnPrimaryText}>{t('register.registerButton')}</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnSecondary}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.btnSecondaryText}>{t('register.alreadyHaveAccount')}</Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>

      <Modal visible={countryModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <TouchableOpacity
                onPress={() => { setCountryModal(false); setCountrySearch(''); }}
                style={styles.modalCloseBtn}
              >
                <Icon name="close" size={22} color="#607d8b" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalSearchWrapper}>
              <Icon name="search-outline" size={18} color="#90a4ae" style={styles.searchIcon} />
              <TextInput
                style={styles.modalSearch}
                placeholder="Search country..."
                placeholderTextColor="#b0bec5"
                value={countrySearch}
                onChangeText={setCountrySearch}
                autoCapitalize="none"
              />
              {countrySearch.length > 0 && (
                <TouchableOpacity onPress={() => setCountrySearch('')}>
                  <Icon name="close-circle" size={18} color="#b0bec5" />
                </TouchableOpacity>
              )}
            </View>

            <FlatList
              data={filteredCountries}
              keyExtractor={item => item.code}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.countryItem,
                    country?.code === item.code && styles.countryItemActive,
                  ]}
                  onPress={() => {
                    setCountry(item);
                    setCountryModal(false);
                    setCountrySearch('');
                    setErrors(e => ({ ...e, country: '' }));
                  }}
                >
                  <Text style={styles.countryItemFlag}>{item.flag}</Text>
                  <Text style={[
                    styles.countryItemName,
                    country?.code === item.code && styles.countryItemNameActive,
                  ]}>
                    {item.name}
                  </Text>
                  {country?.code === item.code && (
                    <Icon name="checkmark-circle" size={20} color="#3d6fd8" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: '#ffffff' },
  flex:   { flex: 1 },
  scroll: { paddingBottom: 48 },

  headerImage: { width, height: HEADER_HEIGHT },

  form: { paddingHorizontal: 24, paddingTop: 8 },
  label: {
    fontSize: 13, fontWeight: '600',
    color: '#37474f', marginTop: 16, marginBottom: 6,
    letterSpacing: 0.2,
  },
  required: { color: '#e53935' },
  optional: { color: '#90a4ae', fontWeight: '400', fontSize: 12 },

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

  strengthWrapper: {
    marginTop: 10, backgroundColor: '#f5f7fb',
    borderRadius: 10, padding: 12,
    borderWidth: 1, borderColor: '#e8edf5',
  },
  strengthBarRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 10, marginBottom: 10,
  },
  strengthBarBg: {
    flex: 1, height: 6,
    backgroundColor: '#e0e0e0', borderRadius: 3, overflow: 'hidden',
  },
  strengthBarFill: { height: 6, borderRadius: 3 },
  strengthLabel:   { fontSize: 12, fontWeight: '700', width: 52, textAlign: 'right' },
  checkList:       { gap: 6 },
  checkItem:       { flexDirection: 'row', alignItems: 'center', gap: 8 },
  checkText:       { fontSize: 12.5, color: '#90a4ae' },
  checkTextDone:   { color: '#43a047', fontWeight: '600' },

  countryPicker: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  countrySelected:    { fontSize: 15, color: '#263238', flex: 1 },
  countryPlaceholder: { fontSize: 15, color: '#b0bec5', flex: 1 },

  privacyRow: {
    flexDirection: 'row', alignItems: 'center',
    marginTop: 20, marginBottom: 6, gap: 10,
  },
  privacyText: { fontSize: 13, color: '#3d6fd8' },

  btnPrimary: {
    backgroundColor: '#3d6fd8', borderRadius: 25,
    paddingVertical: 15, alignItems: 'center', marginTop: 20,
    shadowColor: '#3d6fd8', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  btnDisabled:    { backgroundColor: '#90a4ae', shadowOpacity: 0, elevation: 0 },
  btnPrimaryText: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
  loadingRow:     { flexDirection: 'row', alignItems: 'center' },

  btnSecondary: {
    borderWidth: 1.5, borderColor: '#3d6fd8',
    borderRadius: 25, paddingVertical: 13,
    alignItems: 'center', marginTop: 12, backgroundColor: '#fff',
  },
  btnSecondaryText: { color: '#3d6fd8', fontSize: 14, fontWeight: '600' },

  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingBottom: 32, maxHeight: '82%',
  },
  modalHandle: {
    width: 40, height: 4, backgroundColor: '#e0e0e0',
    borderRadius: 2, alignSelf: 'center', marginTop: 12,
  },
  modalHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 20,
    paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  modalTitle:    { fontSize: 17, fontWeight: '700', color: '#263238' },
  modalCloseBtn: { padding: 4 },

  modalSearchWrapper: {
    flexDirection: 'row', alignItems: 'center',
    margin: 16, marginBottom: 8,
    backgroundColor: '#f5f7fb', borderRadius: 10,
    paddingHorizontal: 12, borderWidth: 1, borderColor: '#e0e0e0',
  },
  searchIcon:  { marginRight: 8 },
  modalSearch: {
    flex: 1, fontSize: 15, color: '#263238',
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
  },

  countryItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 13,
    borderBottomWidth: 1, borderBottomColor: '#f5f5f5',
  },
  countryItemActive:     { backgroundColor: '#eef4ff' },
  countryItemFlag:       { fontSize: 22, marginRight: 12 },
  countryItemName:       { fontSize: 15, color: '#37474f', flex: 1 },
  countryItemNameActive: { color: '#3d6fd8', fontWeight: '600' },
});