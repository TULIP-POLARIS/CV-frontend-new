import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import PersonalInfoStep, { PersonalData } from './steps/PersonalInfoStep';
import EducationStep, { EducationItem } from './steps/EducationStep';
import WorkStep, { WorkItem } from './steps/WorkStep';
import SkillsStep, { SkillItem } from './steps/SkillsStep';
import LanguagesStep, { LanguageItem } from './steps/LanguagesStep';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../hooks/useTranslation';

const BASE_URL = 'https://cvapiappservice-dng8e8gmh0hvdbcr.francecentral-01.azurewebsites.net';

type IoniconsName = ComponentProps<typeof Icon>['name'];
type Props = { currentStep: number; onStepChange: (step: number) => void; };

export default function ProfileStepper({ currentStep, onStepChange }: Props) {
  const { token } = useAuth();
  const { t } = useTranslation();

  const STEPS: { icon: IoniconsName; label: string }[] = [
    { icon: 'person-outline',    label: t('profileStepper.steps.personal')  },
    { icon: 'school-outline',    label: t('profileStepper.steps.education') },
    { icon: 'briefcase-outline', label: t('profileStepper.steps.work')      },
    { icon: 'star-outline',      label: t('profileStepper.steps.skills')    },
    { icon: 'language-outline',  label: t('profileStepper.steps.languages') },
  ];

  const progressPercent = (currentStep / (STEPS.length - 1)) * 100;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  const [personalData, setPersonalData] = useState<PersonalData>({
    firstName: '', lastName: '', dateOfBirth: '',
    gender: '', nationality: '', address: '',
    countryOfResidence: '', phoneNumber: '',
  });

  const [educationData, setEducationData] = useState<EducationItem[]>([]);
  const [workData, setWorkData] = useState<WorkItem[]>([]);
  const [skillsData, setSkillsData] = useState<SkillItem[]>([]);
  const [languagesData, setLanguagesData] = useState<LanguageItem[]>([]);

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [personal, education, work, skills, languages, picture] = await Promise.allSettled([
        fetch(`${BASE_URL}/api/profile/personal`,   { headers }).then(r => r.ok ? r.json() : null),
        fetch(`${BASE_URL}/api/profile/education`,  { headers }).then(r => r.ok ? r.json() : null),
        fetch(`${BASE_URL}/api/profile/work`,       { headers }).then(r => r.ok ? r.json() : null),
        fetch(`${BASE_URL}/api/profile/skills`,     { headers }).then(r => r.ok ? r.json() : null),
        fetch(`${BASE_URL}/api/profile/languages`,  { headers }).then(r => r.ok ? r.json() : null),
        fetch(`${BASE_URL}/api/profile/personal/picture`, { headers }).then(r => r.ok ? r.json() : null),
      ]);

      if (personal.status === 'fulfilled' && personal.value) {
        const p = personal.value;
        setPersonalData({
          firstName: p.firstName ?? '',
          lastName: p.lastName ?? '',
          dateOfBirth: p.dateOfBirth ?? '',
          gender: p.gender ?? '',
          nationality: p.nationality ?? '',
          address: p.address ?? '',
          countryOfResidence: p.countryOfResidence ?? '',
          phoneNumber: p.phoneNumber ?? '',
        });
      }
      if (education.status === 'fulfilled' && education.value?.length) setEducationData(education.value);
      else setEducationData([{ id: Date.now().toString(), degree: '', fieldOfStudy: '', institution: '', startDate: '', endDate: '', description: '' }]);

      if (work.status === 'fulfilled' && work.value?.length) setWorkData(work.value);
      else setWorkData([{ id: Date.now().toString(), jobTitle: '', company: '', location: '', startDate: '', endDate: '', isCurrent: false, description: '' }]);

      if (skills.status === 'fulfilled' && skills.value?.length) setSkillsData(skills.value);
      else setSkillsData([{ id: Date.now().toString(), name: '', level: 'Intermediate' }]);

      if (languages.status === 'fulfilled' && languages.value?.length) setLanguagesData(languages.value);
      else setLanguagesData([{ id: Date.now().toString(), language: '', proficiency: 'B2' }]);

      if (picture.status === 'fulfilled' && picture.value?.url) setAvatarUri(picture.value.url);
    } catch (e) {
      Alert.alert(t('profileStepper.errorTitle'), t('profileStepper.errorMessage'));
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch(`${BASE_URL}/api/profile/personal`, {
        method: 'PUT', headers,
        body: JSON.stringify(personalData),
      });
      Alert.alert(t('profileStepper.successTitle'), t('profileStepper.successMessage'));
    } catch {
      Alert.alert(t('profileStepper.errorTitle'), t('profileStepper.errorMessage'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingBox}>
        <ActivityIndicator size="large" color="#3d6fd8" />
      </View>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0: return (
        <PersonalInfoStep
          data={personalData}
          onChange={(field, value) => setPersonalData(prev => ({ ...prev, [field]: value }))}
          avatarUri={avatarUri}
          onAvatarChange={setAvatarUri}
        />
      );
      case 1: return <EducationStep  data={educationData}  onChange={setEducationData} />;
      case 2: return <WorkStep       data={workData}       onChange={setWorkData} />;
      case 3: return <SkillsStep     data={skillsData}     onChange={setSkillsData} />;
      case 4: return <LanguagesStep  data={languagesData}  onChange={setLanguagesData} />;
      default: return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.stepsRow}>
        {STEPS.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive    = index === currentStep;
          return (
            <View key={index} style={styles.stepItem}>
              <View style={[styles.circle, isCompleted && styles.circleCompleted, isActive && styles.circleActive]}>
                {isCompleted ? (
                  <Icon name="checkmark" size={14} color="#ffffff" />
                ) : (
                  <Icon name={step.icon} size={14} color={isActive ? '#ffffff' : '#90a4ae'} />
                )}
              </View>
              <Text style={[styles.label, isActive && styles.labelActive, isCompleted && styles.labelCompleted]}>
                {step.label}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.progressBg}>
        <View style={[styles.progressFill, { width: `${progressPercent}%` as any }]} />
      </View>

      <Text style={styles.stepCount}>
        {t('profileStepper.stepOf')
          .replace('{current}', String(currentStep + 1))
          .replace('{total}', String(STEPS.length))}
      </Text>

      <View style={styles.stepContent}>{renderStep()}</View>

      <View style={styles.navRow}>
        {currentStep > 0 && (
          <TouchableOpacity style={styles.btnBack} onPress={() => onStepChange(currentStep - 1)}>
            <Icon name="arrow-back-outline" size={18} color="#3d6fd8" />
            <Text style={styles.btnBackText}>{t('profileStepper.back')}</Text>
          </TouchableOpacity>
        )}
        <View style={styles.navSpacer} />
        <TouchableOpacity
          style={[styles.btnNext, saving && styles.btnDisabled]}
          disabled={saving}
          onPress={() => {
            if (currentStep < STEPS.length - 1) onStepChange(currentStep + 1);
            else handleSave();
          }}
        >
          <Text style={styles.btnNextText}>
            {saving ? t('profileStepper.saving') : currentStep === STEPS.length - 1 ? t('profileStepper.save') : t('profileStepper.next')}
          </Text>
          <Icon
            name={currentStep === STEPS.length - 1 ? 'checkmark-outline' : 'arrow-forward-outline'}
            size={18} color="#ffffff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 24, paddingTop: 48, paddingBottom: 20, backgroundColor: '#ffffff' },
  loadingBox: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 80 },
  stepsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  stepItem: { alignItems: 'center', gap: 6, flex: 1 },
  circle: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#f0f4ff', borderWidth: 2, borderColor: '#dce8fb',
    justifyContent: 'center', alignItems: 'center',
  },
  circleActive: {
    backgroundColor: '#3d6fd8', borderColor: '#3d6fd8',
    shadowColor: '#3d6fd8', shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35, shadowRadius: 6, elevation: 4,
  },
  circleCompleted: { backgroundColor: '#43a047', borderColor: '#43a047' },
  label:          { fontSize: 10, fontWeight: '500', color: '#90a4ae', textAlign: 'center' },
  labelActive:    { color: '#3d6fd8', fontWeight: '700' },
  labelCompleted: { color: '#43a047', fontWeight: '600' },
  progressBg: { height: 6, backgroundColor: '#dce8fb', borderRadius: 3, overflow: 'hidden', marginBottom: 8 },
  progressFill: { height: 6, backgroundColor: '#3d6fd8', borderRadius: 3 },
  stepCount: { fontSize: 12, color: '#90a4ae', textAlign: 'right', fontWeight: '500', marginBottom: 8 },
  stepContent: { marginTop: 8 },
  navRow: {
    flexDirection: 'row', alignItems: 'center', marginTop: 32,
    paddingTop: 16, borderTopWidth: 1, borderTopColor: '#f0f0f0',
  },
  navSpacer: { flex: 1 },
  btnBack: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 12, paddingHorizontal: 20,
    borderRadius: 25, borderWidth: 1.5, borderColor: '#3d6fd8', backgroundColor: '#ffffff',
  },
  btnBackText: { fontSize: 14, fontWeight: '600', color: '#3d6fd8' },
  btnNext: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 12, paddingHorizontal: 24,
    borderRadius: 25, backgroundColor: '#3d6fd8',
    shadowColor: '#3d6fd8', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  btnDisabled: { backgroundColor: '#90a4ae', shadowOpacity: 0, elevation: 0 },
  btnNextText: { fontSize: 14, fontWeight: '700', color: '#ffffff' },
});