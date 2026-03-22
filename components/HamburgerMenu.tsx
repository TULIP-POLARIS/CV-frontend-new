import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, Modal,
  StyleSheet, Pressable, Platform,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../context/AuthContext';
import { useTranslation, setLanguage, Language } from '../hooks/useTranslation';

const LANGUAGES: { code: Language; label: string; name: string }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fi', label: 'FI', name: 'Suomi' },
  { code: 'de', label: 'DE', name: 'Deutsch' },
];

type Props = {
  tintColor?: string;
};

export default function HamburgerMenu({ tintColor = '#263238' }: Props) {
  const [visible, setVisible]         = useState(false);
  const [langExpanded, setLangExpanded] = useState(false);
  const { isLoggedIn, logout }        = useAuth();
  const { language }                  = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const close = () => { setVisible(false); setLangExpanded(false); };

  const handleLogout = async () => {
    close();
    await logout();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  return (
    <>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.hamburger}>
        <Icon name="menu-outline" size={28} color={tintColor} />
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={close}>
          <Pressable style={styles.drawer} onPress={() => {}}>

            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle}>Menu</Text>
              <TouchableOpacity onPress={close} style={styles.closeBtn}>
                <Icon name="close" size={22} color="#607d8b" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => setLangExpanded(p => !p)}
            >
              <View style={styles.menuItemLeft}>
                <Icon name="language-outline" size={20} color="#3d6fd8" />
                <Text style={styles.menuItemText}>Language</Text>
              </View>
              <View style={styles.menuItemRight}>
                <Text style={styles.menuItemBadge}>
                  {LANGUAGES.find(l => l.code === language)?.label}
                </Text>
                <Icon
                  name={langExpanded ? 'chevron-up-outline' : 'chevron-down-outline'}
                  size={16} color="#90a4ae"
                />
              </View>
            </TouchableOpacity>

            {langExpanded && (
              <View style={styles.subMenu}>
                {LANGUAGES.map(lang => (
                  <TouchableOpacity
                    key={lang.code}
                    style={styles.subMenuItem}
                    onPress={() => { setLanguage(lang.code); setLangExpanded(false); }}
                  >
                    <Text style={[
                      styles.subMenuText,
                      language === lang.code && styles.subMenuTextActive,
                    ]}>
                      {lang.name}
                    </Text>
                    {language === lang.code && (
                      <Icon name="checkmark" size={16} color="#3d6fd8" />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <View style={styles.divider} />

            {isLoggedIn && (
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => { close(); navigation.navigate('Profile'); }}
              >
                <View style={styles.menuItemLeft}>
                  <Icon name="person-outline" size={20} color="#3d6fd8" />
                  <Text style={styles.menuItemText}>Profile</Text>
                </View>
                <Icon name="chevron-forward-outline" size={16} color="#90a4ae" />
              </TouchableOpacity>
            )}

            {isLoggedIn && (
              <TouchableOpacity style={styles.menuItem} onPress={close}>
                <View style={styles.menuItemLeft}>
                  <Icon name="settings-outline" size={20} color="#3d6fd8" />
                  <Text style={styles.menuItemText}>Settings</Text>
                </View>
                <Icon name="chevron-forward-outline" size={16} color="#90a4ae" />
              </TouchableOpacity>
            )}

            {isLoggedIn && <View style={styles.divider} />}

            {isLoggedIn ? (
              <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <View style={styles.menuItemLeft}>
                  <Icon name="log-out-outline" size={20} color="#e53935" />
                  <Text style={[styles.menuItemText, { color: '#e53935' }]}>Logout</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => { close(); navigation.navigate('Login'); }}
                >
                  <View style={styles.menuItemLeft}>
                    <Icon name="log-in-outline" size={20} color="#3d6fd8" />
                    <Text style={styles.menuItemText}>Login</Text>
                  </View>
                  <Icon name="chevron-forward-outline" size={16} color="#90a4ae" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => { close(); navigation.navigate('Register'); }}
                >
                  <View style={styles.menuItemLeft}>
                    <Icon name="person-add-outline" size={20} color="#3d6fd8" />
                    <Text style={styles.menuItemText}>Register</Text>
                  </View>
                  <Icon name="chevron-forward-outline" size={16} color="#90a4ae" />
                </TouchableOpacity>
              </>
            )}

          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  hamburger: { padding: 8 },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  drawer: {
    width: 280,
    backgroundColor: '#fff',
    minHeight: '100%',
    paddingTop: Platform.OS === 'ios' ? 56 : 40,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },

  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 8,
  },
  drawerTitle: { fontSize: 18, fontWeight: '700', color: '#263238' },
  closeBtn:    { padding: 4 },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  menuItemLeft:  { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuItemRight: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  menuItemText:  { fontSize: 15, color: '#263238', fontWeight: '500' },
  menuItemBadge: {
    fontSize: 12, fontWeight: '700',
    color: '#3d6fd8', backgroundColor: '#eef4ff',
    paddingHorizontal: 8, paddingVertical: 2,
    borderRadius: 10,
  },

  subMenu: {
    backgroundColor: '#f8faff',
    marginHorizontal: 16,
    borderRadius: 10,
    marginBottom: 4,
    overflow: 'hidden',
  },
  subMenuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  subMenuText:       { fontSize: 14, color: '#455a64' },
  subMenuTextActive: { color: '#3d6fd8', fontWeight: '700' },

  divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 8 },
});