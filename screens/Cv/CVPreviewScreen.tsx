import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CVTemplate from '../../components/cv/CVTemplate';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

type Props = NativeStackScreenProps<RootStackParamList, 'CVPreview'>;

export default function CVPreviewScreen({ route, navigation }: Props) {
  const { data, theme, language } = route.params;

  const handleDownload = async () => {
    try {
      // Use the theme from route params
      const pdfTheme = theme || {
        headerColor: '#2F3E4D',
        sidebarColor: '#263545',
        accentColor: '#4A90D9',
        sidebarText: '#C8D8E8',
        mainBg: '#FFFFFF',
        sectionColor: '#2F3E4D',
      };

      // Build HTML that matches the CV template exactly
      const html = `
        <html>
          <head>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; }
              .wrapper { background: #eee; padding: 10px; }
              .container { 
                margin: 0; 
                border-radius: 10px; 
                overflow: hidden; 
                background: ${pdfTheme.mainBg};
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              }
              .header { 
                background: ${pdfTheme.headerColor}; 
                padding: 20px; 
                display: flex; 
                align-items: center; 
                color: white;
              }
              .avatar { 
                width: 80px; 
                height: 80px; 
                border-radius: 40px; 
                border: 3px solid white; 
                margin-right: 15px; 
                flex-shrink: 0;
              }
              .header-text h1 { 
                font-size: 22px; 
                font-weight: bold; 
                margin: 0; 
                color: white;
              }
              .header-text p { 
                font-size: 14px; 
                color: #ddd; 
                margin: 0;
              }
              .body { display: flex; min-height: 400px; }
              .sidebar { 
                width: 35%; 
                background: ${pdfTheme.sidebarColor}; 
                padding: 15px; 
                color: ${pdfTheme.sidebarText};
              }
              .main { width: 65%; padding: 15px; }
              .section-heading { 
                font-weight: bold; 
                font-size: 13px; 
                margin-top: 20px; 
                margin-bottom: 5px; 
                color: ${pdfTheme.accentColor};
                text-transform: uppercase;
                letter-spacing: 1px;
              }
              .divider { 
                height: 1px; 
                background: ${pdfTheme.accentColor}; 
                margin-bottom: 10px; 
                opacity: 0.5;
              }
              .skill-item { 
                color: ${pdfTheme.sidebarText}; 
                font-size: 12px; 
                margin: 5px 0;
              }
              .contact-item { 
                display: flex; 
                align-items: center; 
                color: ${pdfTheme.sidebarText}; 
                font-size: 11px; 
                margin: 8px 0; 
                gap: 8px;
              }
              .main-heading { 
                font-weight: bold; 
                font-size: 14px; 
                margin-top: 15px; 
                margin-bottom: 5px; 
                color: ${pdfTheme.sectionColor};
                text-transform: uppercase;
                letter-spacing: 1px;
              }
              .main-divider { 
                height: 1px; 
                background: ${pdfTheme.accentColor}; 
                margin-bottom: 10px;
              }
              .summary-text { 
                font-size: 12px; 
                line-height: 1.5; 
                margin-bottom: 15px;
              }
              .timeline-item { 
                display: flex; 
                margin-bottom: 15px; 
                position: relative;
              }
              .timeline-marker { 
                width: 20px; 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                flex-shrink: 0;
              }
              .circle { 
                width: 8px; 
                height: 8px; 
                background: ${pdfTheme.accentColor}; 
                border-radius: 50%; 
                margin-top: 2px;
              }
              .line { 
                width: 2px; 
                background: #ccc; 
                flex: 1; 
                margin-top: 8px;
              }
              .timeline-content { 
                flex: 1; 
                padding-left: 10px;
              }
              .item-title { 
                font-weight: bold; 
                font-size: 13px; 
                margin-bottom: 2px;
              }
              .item-subtitle { 
                font-size: 12px; 
                color: #666; 
                margin-bottom: 2px;
              }
              .item-date { 
                font-size: 11px; 
                color: #999; 
                margin-bottom: 5px;
              }
              .item-description { 
                font-size: 12px; 
                line-height: 1.4;
              }
              .language-item {
                font-size: 12px;
                margin: 5px 0;
                color: ${pdfTheme.sidebarText};
              }
            </style>
          </head>
          <body>
            <div class="wrapper">
              <div class="container">
                <!-- HEADER -->
                <div class="header">
                  ${data?.image ? `<img src="${data.image}" class="avatar" />` : ''}
                  <div class="header-text">
                    <h1>${data?.name || 'CV'}</h1>
                    <p>${data?.title || ''}</p>
                  </div>
                </div>

                <!-- BODY: SIDEBAR + MAIN -->
                <div class="body">
                  <!-- LEFT SIDEBAR -->
                  <div class="sidebar">
                    <!-- SKILLS -->
                    <div class="section-heading">Skills</div>
                    <div class="divider"></div>
                    ${
                      data?.skills && data.skills.length > 0
                        ? data.skills
                            .slice(0, 8)
                            .map((skill: any) => `<div class="skill-item">• ${typeof skill === 'string' ? skill : skill.name || skill}</div>`)
                            .join('')
                        : '<div class="skill-item">No skills listed</div>'
                    }

                    <!-- LANGUAGES -->
                    <div class="section-heading">Languages</div>
                    <div class="divider"></div>
                    ${
                      data?.languages && data.languages.length > 0
                        ? data.languages
                            .map(
                              (lang: any) =>
                                `<div class="language-item">${lang.name} – ${lang.level}</div>`
                            )
                            .join('')
                        : '<div class="language-item">No languages listed</div>'
                    }

                    <!-- CONTACT -->
                    ${
                      data?.contact
                        ? `
                      <div class="section-heading">Contact</div>
                      <div class="divider"></div>
                      ${data.contact.phone ? `<div class="contact-item"><strong>Phone:</strong> ${data.contact.phone}</div>` : ''}
                      ${data.contact.email ? `<div class="contact-item"><strong>Email:</strong> ${data.contact.email}</div>` : ''}
                      ${data.contact.address ? `<div class="contact-item"><strong>Address:</strong> ${data.contact.address}</div>` : ''}
                      ${data.contact.linkedin ? `<div class="contact-item"><strong>LinkedIn:</strong> ${data.contact.linkedin}</div>` : ''}
                    `
                        : ''
                    }
                  </div>

                  <!-- MAIN CONTENT -->
                  <div class="main">
                    <!-- PROFILE/SUMMARY -->
                    <div class="main-heading">Profile</div>
                    <div class="main-divider"></div>
                    <div class="summary-text">${data?.summary || 'No summary provided'}</div>

                    <!-- EDUCATION -->
                    <div class="main-heading">Education</div>
                    <div class="main-divider"></div>
                    ${
                      data?.education && data.education.length > 0
                        ? data.education
                            .map(
                              (edu: any) => `
                        <div class="timeline-item">
                          <div class="timeline-marker">
                            <div class="circle"></div>
                            <div class="line"></div>
                          </div>
                          <div class="timeline-content">
                            <div class="item-title">${edu.degree}${edu.field ? ' in ' + edu.field : ''}</div>
                            <div class="item-subtitle">${edu.institution}</div>
                            <div class="item-date">${edu.startDate || ''} - ${edu.endDate || ''}</div>
                          </div>
                        </div>
                      `
                            )
                            .join('')
                        : '<div class="item-description">No education listed</div>'
                    }

                    <!-- WORK EXPERIENCE -->
                    <div class="main-heading">Work Experience</div>
                    <div class="main-divider"></div>
                    ${
                      data?.experience && data.experience.length > 0
                        ? data.experience
                            .map(
                              (job: any) => `
                        <div class="timeline-item">
                          <div class="timeline-marker">
                            <div class="circle"></div>
                            <div class="line"></div>
                          </div>
                          <div class="timeline-content">
                            <div class="item-title">${job.title}</div>
                            <div class="item-subtitle">${job.company || ''}</div>
                            <div class="item-date">${job.duration}</div>
                            <div class="item-description">${job.description}</div>
                          </div>
                        </div>
                      `
                            )
                            .join('')
                        : '<div class="item-description">No experience listed</div>'
                    }
                  </div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;

      // Generate PDF
      const { uri } = await Print.printToFileAsync({ html });

      // Share / download
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: `${data?.name || 'CV'}.pdf`,
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      Alert.alert('Error', 'Failed to generate PDF');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CV Preview</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <CVTemplate data={data} theme={theme} language={language} />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.downloadBtn, { backgroundColor: theme?.headerColor || '#3d6fd8' }]}
          onPress={handleDownload}
          activeOpacity={0.85}
        >
          <Ionicons name="download-outline" size={20} color="#fff" />
          <Text style={styles.downloadBtnText}>Download CV</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FC' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
  },
  backBtn: { padding: 8 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#1A1A2E' },
  content: { flex: 1 },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F5',
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
  },
  downloadBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});