import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.updated}>Last updated: April 2025</Text>

      <Section title="1. Information We Collect">
        We collect information you provide directly to us, such as your name, email address, and any CV data you submit through the app.
      </Section>

      <Section title="2. How We Use Your Information">
        We use the information we collect to provide, maintain, and improve our services, generate your CV, and communicate with you.
      </Section>

      <Section title="3. Data Storage">
        Your data is stored securely on our servers. We do not sell your personal information to third parties.
      </Section>

      <Section title="4. Cookies">
        We may use cookies and similar tracking technologies to track activity on our service and hold certain information.
      </Section>

      <Section title="5. Third-Party Services">
        We may employ third-party companies to facilitate our service. These third parties have access to your data only to perform tasks on our behalf.
      </Section>

      <Section title="6. Security">
        The security of your data is important to us. We strive to use commercially acceptable means to protect your personal information.
      </Section>

      <Section title="7. Contact Us">
        If you have any questions about this Privacy Policy, please contact us at FontysOulu@crosschecker.io
      </Section>
    </ScrollView>
  );
}

const Section = ({ title, children }: { title: string; children: string }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionBody}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fb' },
  content: { padding: 20, paddingBottom: 48 },
  title: { fontSize: 24, fontWeight: '700', color: '#24313c', marginBottom: 4 },
  updated: { fontSize: 12, color: '#90a4ae', marginBottom: 24 },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#3d6fd8', marginBottom: 8 },
  sectionBody: { fontSize: 14, color: '#556070', lineHeight: 22 },
});