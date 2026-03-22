import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PersonalInfoStep from './steps/PersonalInfoStep';
import EducationStep, { EducationItem } from './steps/EducationStep';
import WorkStep, { WorkItem } from './steps/WorkStep';
import SkillsStep, { SkillItem } from './steps/SkillsStep';
import LanguagesStep, { LanguageItem } from './steps/LanguagesStep';
import { useAuth } from '../../context/AuthContext';

const BASE_URL = 'https://cvapiappservice-dng8e8gmh0hvdbcr.francecentral-01.azurewebsites.net';

const STEPS = [
  { icon: 'person-outline',    label: 'Personal'  },
  { icon: 'school-outline',    label: 'Education' },
  { icon: 'briefcase-outline', label: 'Work'      },
  { icon: 'star-outline',      label: 'Skills'    },
  { icon: 'language-outline',  label: 'Languages' },
];

type Props = {
  currentStep: number;
  onStepChange: (step: number) => void;
};

export default function ProfileStepper({ currentStep, onStepChange }: Props) {
  const { token } = useAuth();
  const progressPercent = (currentStep / (STEPS.length - 1)) * 100;

  const [personalData, setPersonalData] = useState({
    firstName: '', lastName: '', dateOfBirth: '',
    gender: '', nationality: '', address: '',
    countryOfResidence: '', phoneNumber: '',
  });

  const [educationData, setEducationData] = useState<EducationItem[]>([{
    id: Date.now().toString(),
    degree: '', fieldOfStudy: '', institution: '',
    startDate: '', endDate: '', description: '',
  }]);

  const [workData, setWorkData] = useState<WorkItem[]>([{
    id: Date.now().toString(),
    jobTitle: '', company: '', location: '',
    startDate: '', endDate: '', isCurrent: false, description: '',
  }]);

  const [skillsData, setSkillsData] = useState<SkillItem[]>([{
    id: Date.now().toString(),
    name: '', level: 'Intermediate',
  }]);

  const [languagesData, setLanguagesData] = useState<LanguageItem[]>([{
    id: Date.now().toString(),
    language: '', proficiency: 'B2',
  }]);

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        personal:  personalData,
        education: educationData,
        work:      workData,
        skills:    skillsData,
        languages: languagesData,
      };

      const response = await fetch(`${BASE_URL}/api/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      Alert.alert('Success', 'Profile saved successfully!');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <PersonalInfoStep data={personalData} onChange={(field, value) =>
        setPersonalData(prev => ({ ...prev, [field]: value }))} />;
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
              <View style={[
                styles.circle,
                isCompleted && styles.circleCompleted,
                isActive    && styles.circleActive,
              ]}>
                {isCompleted ? (
                  <Icon name="checkmark" size={14} color="#ffffff" />
                ) : (
                  <Icon name={step.icon} size={14} color={isActive ? '#ffffff' : '#90a4ae'} />
                )}
              </View>
              <Text style={[
                styles.label,
                isActive    && styles.labelActive,
                isCompleted && styles.labelCompleted,
              ]}>
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
        Step {currentStep + 1} of {STEPS.length}
      </Text>

      <View style={styles.stepContent}>
        {renderStep()}
      </View>

      <View style={styles.navRow}>
        {currentStep > 0 && (
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => onStepChange(currentStep - 1)}
          >
            <Icon name="arrow-back-outline" size={18} color="#3d6fd8" />
            <Text style={styles.btnBackText}>Back</Text>
          </TouchableOpacity>
        )}

        <View style={styles.navSpacer} />

        <TouchableOpacity
          style={[styles.btnNext, saving && styles.btnDisabled]}
          disabled={saving}
          onPress={() => {
            if (currentStep < STEPS.length - 1) {
              onStepChange(currentStep + 1);
            } else {
              handleSave();
            }
          }}
        >
          <Text style={styles.btnNextText}>
            {saving ? 'Saving...' : currentStep === STEPS.length - 1 ? 'Save' : 'Next'}
          </Text>
          <Icon
            name={currentStep === STEPS.length - 1 ? 'checkmark-outline' : 'arrow-forward-outline'}
            size={18}
            color="#ffffff"
          />
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
  },

  stepsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  stepItem: { alignItems: 'center', gap: 6, flex: 1 },

  circle: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#f0f4ff', borderWidth: 2,
    borderColor: '#dce8fb', justifyContent: 'center', alignItems: 'center',
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

  progressBg: {
    height: 6, backgroundColor: '#dce8fb',
    borderRadius: 3, overflow: 'hidden', marginBottom: 8,
  },
  progressFill: { height: 6, backgroundColor: '#3d6fd8', borderRadius: 3 },

  stepCount: {
    fontSize: 12, color: '#90a4ae',
    textAlign: 'right', fontWeight: '500', marginBottom: 8,
  },

  stepContent: { marginTop: 8 },

  navRow: {
    flexDirection: 'row', alignItems: 'center',
    marginTop: 32, paddingTop: 16,
    borderTopWidth: 1, borderTopColor: '#f0f0f0',
  },
  navSpacer: { flex: 1 },

  btnBack: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingVertical: 12, paddingHorizontal: 20,
    borderRadius: 25, borderWidth: 1.5,
    borderColor: '#3d6fd8', backgroundColor: '#ffffff',
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