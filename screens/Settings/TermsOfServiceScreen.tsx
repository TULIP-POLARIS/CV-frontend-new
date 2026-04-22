import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from '../../hooks/useTranslation';
import HamburgerMenu from "../../components/HamburgerMenu";

export default function TermsOfServiceScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        {/* HEADER WITH HAMBURGER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('termsOfService.title')}</Text>
        <HamburgerMenu tintColor="#263238" />
      </View>
      
      <Text style={styles.updated}>{t('termsOfService.updated')}</Text>
      <Section title={t('termsOfService.s1Title')} body={t('termsOfService.s1Body')} />
      <Section title={t('termsOfService.s2Title')} body={t('termsOfService.s2Body')} />
      <Section title={t('termsOfService.s3Title')} body={t('termsOfService.s3Body')} />
      <Section title={t('termsOfService.s4Title')} body={t('termsOfService.s4Body')} />
      <Section title={t('termsOfService.s5Title')} body={t('termsOfService.s5Body')} />
      <Section title={t('termsOfService.s6Title')} body={t('termsOfService.s6Body')} />
      <Section title={t('termsOfService.s7Title')} body={t('termsOfService.s7Body')} />
      <Section title={t('termsOfService.s8Title')} body={t('termsOfService.s8Body')} />
    </ScrollView>
  );
}

const Section = ({ title, body }: { title: string; body: string }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionBody}>{body}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fb' },
  content: { padding: 20, paddingBottom: 48 },
  title: { fontSize: 24, fontWeight: '700', color: '#24313c', marginBottom: 4 },
  updated: { fontSize: 12, color: '#90a4ae', marginBottom: 24 },
  section: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16,
    marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.04,
    shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#3d6fd8', marginBottom: 8 },
  sectionBody: { fontSize: 14, color: '#556070', lineHeight: 22 },
  header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10,
},
headerTitle: {
  fontSize: 24,
  fontWeight: '700',
  color: '#24313c',
},
});