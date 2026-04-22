import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';

import PersonalInfoStep, { PersonalData } from './steps/PersonalInfoStep';
import EducationStep, { EducationItem } from './steps/EducationStep';
import WorkStep, { WorkItem } from './steps/WorkStep';
import SkillsStep, { SkillItem } from './steps/SkillsStep';
import LanguagesStep, { LanguageItem } from './steps/LanguagesStep';

import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../hooks/useTranslation';

const BASE_URL = 'https://cvapiappservice-dng8e8gmh0hvdbcr.francecentral-01.azurewebsites.net';

type Props = {
  currentStep: number;
  onStepChange: (step: number) => void;
};

const emptyEducation = (): EducationItem => ({
  id: `temp-${Date.now()}`,
  degree: '',
  fieldOfStudy: '',
  institution: '',
  startDate: '',
  endDate: '',
  description: '',
});

const emptyWork = (): WorkItem => ({
  id: `temp-${Date.now()}`,
  jobTitle: '',
  company: '',
  location: '',
  startDate: '',
  endDate: '',
  isCurrent: false,
  description: '',
});

const emptySkill = (): SkillItem => ({
  id: `temp-${Date.now()}`,
  name: '',
  level: 'Intermediate',
});

const emptyLanguage = (): LanguageItem => ({
  id: `temp-${Date.now()}`,
  language: '',
  proficiency: 'B2',
});

export default function ProfileStepper({ currentStep, onStepChange }: Props) {
  const { token } = useAuth();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  // STATES
  const [personalData, setPersonalData] = useState<PersonalData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    address: '',
    countryOfResidence: '',
    phoneNumber: '',
  });

  const [educationData, setEducationData] = useState<EducationItem[]>([emptyEducation()]);
  const [workData, setWorkData] = useState<WorkItem[]>([emptyWork()]);
  const [skillsData, setSkillsData] = useState<SkillItem[]>([emptySkill()]);
  const [languagesData, setLanguagesData] = useState<LanguageItem[]>([emptyLanguage()]);

  // -------------------------
  // LOAD ALL PROFILE
  // -------------------------
  useEffect(() => {
    const load = async () => {
      try {
        const res = await Promise.all([
          fetch(`${BASE_URL}/api/profile/personal`, { headers }).then(r => r.json()),
          fetch(`${BASE_URL}/api/profile/education`, { headers }).then(r => r.json()),
          fetch(`${BASE_URL}/api/profile/work`, { headers }).then(r => r.json()),
          fetch(`${BASE_URL}/api/profile/skills`, { headers }).then(r => r.json()),
          fetch(`${BASE_URL}/api/profile/languages`, { headers }).then(r => r.json()),
        ]);

        const [p, e, w, s, l] = res;

        if (p) setPersonalData(p);
        if (e?.length) setEducationData(e);
        if (w?.length) setWorkData(w);
        if (s?.length) setSkillsData(s);
        if (l?.length) setLanguagesData(l);

      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // -------------------------
  // SAVE HELPERS
  // -------------------------

  const savePersonal = async () => {
    await fetch(`${BASE_URL}/api/profile/personal`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(personalData),
    });
  };

  // GENERIC SAVE FUNCTION
  const saveList = async (
    data: any[],
    endpoint: string,
  ) => {
    for (const item of data) {
      if (!item) continue;

      // CREATE
      if (item.id.startsWith('temp-')) {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
          method: 'POST',
          headers,
          body: JSON.stringify(item),
        });

        const created = await res.json();

        // replace temp id
        item.id = created.id;
      }

      // UPDATE
      else {
        await fetch(`${BASE_URL}${endpoint}/${item.id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(item),
        });
      }
    }
  };

  // -------------------------
  // STEP HANDLER
  // -------------------------
  const handleNext = async () => {
    setSaving(true);

    try {
      if (currentStep === 0) {
        await savePersonal();
      }

      if (currentStep === 1) {
        await saveList(educationData, '/api/profile/education');
      }

      if (currentStep === 2) {
        await saveList(workData, '/api/profile/work');
      }

      if (currentStep === 3) {
        await saveList(skillsData, '/api/profile/skills');
      }

      if (currentStep === 4) {
        await saveList(languagesData, '/api/profile/languages');
        Alert.alert('Success', 'Profile saved successfully!');
      }

      onStepChange(currentStep + 1);

    } catch (e) {
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#3d6fd8" />
      </View>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep data={personalData} onChange={(f, v) => setPersonalData(p => ({ ...p, [f]: v }))} />;
      case 1:
        return <EducationStep data={educationData} onChange={setEducationData} onDelete={() => {}} />;
      case 2:
        return <WorkStep data={workData} onChange={setWorkData} onDelete={() => {}} />;
      case 3:
        return <SkillsStep data={skillsData} onChange={setSkillsData} onDelete={() => {}} />;
      case 4:
        return <LanguagesStep data={languagesData} onChange={setLanguagesData} onDelete={() => {}} />;
    }
  };

  return (
    <View style={styles.container}>

      {renderStep()}

      <TouchableOpacity
        style={[styles.btn, saving && { opacity: 0.6 }]}
        onPress={handleNext}
        disabled={saving}
      >
        <Text style={styles.btnText}>
          {saving ? 'Saving...' : 'Next'}
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  btn: {
    marginTop: 20,
    backgroundColor: '#3d6fd8',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '700' },
});