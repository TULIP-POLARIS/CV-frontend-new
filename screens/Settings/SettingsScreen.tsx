import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { useAuth } from '../../context/AuthContext';
import { useTranslation, setLanguage, Language } from '../../hooks/useTranslation';
import HamburgerMenu from '../../components/HamburgerMenu';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

const LANGUAGES: { code: Language; label: string; name: string }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fi', label: 'FI', name: 'Suomi' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
];

export default function SettingsScreen() {
  const navigation = useNavigation<NavProp>();
  const { logout, email } = useAuth();
  const { t, language } = useTranslation();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [langExpanded, setLangExpanded] = React.useState(false);

  const handleLogout = () => {
    Alert.alert(t('settings.logoutTitle'), t('settings.logoutMessage'), [
      { text: t('settings.cancel'), style: 'cancel' },
      {
        text: t('settings.logoutConfirm'),
        style: 'destructive',
        onPress: async () => {
          await logout();
          navigation.navigate('Login');
        },
      },
    ]);
  };

  const SettingSection = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );

  const SettingItem = ({
    label,
    onPress,
    rightElement,
  }: {
    label: string;
    onPress?: () => void;
    rightElement?: React.ReactNode;
  }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <Text style={styles.settingLabel}>{label}</Text>
      {rightElement}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
{/* HEADER WITH HAMBURGER */}
<View style={styles.header}>
  <Text style={styles.headerTitle}>Settings</Text>
  <HamburgerMenu tintColor="#263238" />
</View>
      <SettingSection title={t('settings.account')}>
        <SettingItem
          label={t('settings.editProfile')}
          onPress={() => navigation.navigate('Profile')}
        />
        <View style={styles.divider} />
        <SettingItem
          label={t('settings.changePassword')}
          onPress={() => navigation.navigate('ResetPassword', { email: email ?? '' })}
          rightElement={
            <Icon name="chevron-forward-outline" size={16} color="#90a4ae" />
          }
        />
        <View style={styles.divider} />
        <SettingItem
          label={`Email: ${email ?? 'Not available'}`}
        />
      </SettingSection>

      <SettingSection title={t('settings.appSettings')}>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>{t('settings.pushNotifications')}</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#767577', true: '#81c784' }}
            thumbColor={notificationsEnabled ? '#4A90E2' : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.divider} />
        <SettingItem
          label={t('settings.usageMetrics')}
          onPress={() => navigation.navigate('UsageMetrics')}
          rightElement={
            <Icon name="stats-chart-outline" size={20} color="#90a4ae" />
          }
        />
        <View style={styles.divider} />
        <SettingItem
          label={t('settings.language')}
          onPress={() => setLangExpanded((value) => !value)}
          rightElement={
            <View style={styles.menuItemRight}>
              <Text style={styles.menuItemBadge}>
                {LANGUAGES.find((l) => l.code === language)?.label}
              </Text>
              <Icon
                name={langExpanded ? 'chevron-up-outline' : 'chevron-down-outline'}
                size={16}
                color="#90a4ae"
                style={styles.menuItemIcon}
              />
            </View>
          }
        />
        {langExpanded && (
          <View style={styles.subMenu}>
            {LANGUAGES.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={styles.subMenuItem}
                onPress={() => {
                  setLanguage(lang.code);
                  setLangExpanded(false);
                }}
              >
                <Text
                  style={[
                    styles.subMenuText,
                    language === lang.code && styles.subMenuTextActive,
                  ]}
                >
                  {lang.name}
                </Text>
                {language === lang.code && (
                  <Icon name="checkmark" size={16} color="#3d6fd8" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </SettingSection>

      <SettingSection title={t('settings.privacySupport')}>
        <SettingItem
          label={t('settings.privacyPolicy')}
          onPress={() => navigation.navigate('PrivacyPolicy')}
          rightElement={
            <Icon name="chevron-forward-outline" size={16} color="#90a4ae" />
          }
        />
        <View style={styles.divider} />
        <SettingItem
          label={t('settings.termsOfService')}
          onPress={() => navigation.navigate('TermsOfService')}
          rightElement={
            <Icon name="chevron-forward-outline" size={16} color="#90a4ae" />
          }
        />
        <View style={styles.divider} />
        <SettingItem
          label={t('settings.helpSupport')}
          onPress={() =>
            Alert.alert('Support', t('settings.supportMessage'))
          }
        />
      </SettingSection>

      <SettingSection title={t('settings.about')}>
        <SettingItem label={t('settings.appVersion')} />
        <View style={styles.divider} />
        <SettingItem
          label={t('settings.checkUpdates')}
          onPress={() => Alert.alert('Updates', t('settings.updatesMessage'))}
        />
      </SettingSection>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>{t('settings.logout')}</Text>
      </TouchableOpacity>

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionContent: {
    paddingBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  settingLabel: {
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  menuItemBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#e8f0ff',
    color: '#3d6fd8',
    fontSize: 12,
    fontWeight: '700',
  },
  menuItemIcon: {
    marginLeft: 8,
  },
  subMenu: {
    backgroundColor: '#f7f8fb',
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  subMenuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e9ef',
  },
  subMenuText: {
    fontSize: 15,
    color: '#455a64',
  },
  subMenuTextActive: {
    color: '#3d6fd8',
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
  },
  logoutButton: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: '#ff6b6b',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  bottomPadding: {
    height: 40,
  },
  header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingVertical: 16,
  marginBottom: 8,
},
headerTitle: {
  fontSize: 24,
  fontWeight: '700',
  color: '#24313c',
},
});