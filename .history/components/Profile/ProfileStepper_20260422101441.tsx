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

const emptyEducation = (): EducationItem => ({ id: '', degree: '', fieldOfStudy: '', institution: '', startDate: '', endDate: '', description: '' });
const emptyWork = (): WorkItem => ({ id: '', jobTitle: '', company: '', location: '', startDate: '', endDate: '', isCurrent: false, description: '' });
const emptySkill = (): SkillItem => ({ id: '', name: '', level: 'Intermediate' });
const emptyLanguage = (): LanguageItem => ({ id: '', language: '', proficiency: 'B2' });

const isPersonalFilled = (d: PersonalData) =>
  !!(d.firstName || d.lastName || d.dateOfBirth || d.gender || d.nationality || d.countryOfResidence);

const isEducationFilled = (items: EducationItem[]) =>
  items.some(i => i.degree || i.fieldOfStudy || i.institution || i.startDate);

const isWorkFilled = (items: WorkItem[]) =>
  items.some(i => i.jobTitle || i.company || i.startDate);

const isSkillFilled = (items: SkillItem[]) =>
  items.some(i => i.name);

const isLanguageFilled = (items: LanguageItem[]) =>
  items.some(i => i.language);

const validatePersonal = (d: PersonalData): string[] => {
  const errors: string[] = [];
  if (!d.firstName)          errors.push('firstName');
  if (!d.lastName)           errors.push('lastName');
  if (!d.dateOfBirth)        errors.push('dateOfBirth');
  if (!d.gender)             errors.push('gender');
  if (!d.nationality)        errors.push('nationality');
  if (!d.countryOfResidence) errors.push('countryOfResidence');
  return errors;
};

const validateEducation = (items: EducationItem[]): boolean =>
  items.every(i => (!i.degree && !i.fieldOfStudy && !i.institution) || (i.degree && i.fieldOfStudy && i.institution && i.startDate));

const validateWork = (items: WorkItem[]): boolean =>
  items.every(i => (!i.jobTitle && !i.company) || (i.jobTitle && i.company && i.startDate));

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

  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [personalErrors, setPersonalErrors] = useState<string[]>([]);

  const [personalData, setPersonalData] = useState<PersonalData>({
    firstName: '', lastName: '', dateOfBirth: '',
    gender: '', nationality: '', address: '',
    countryOfResidence: '', phoneNumber: '',
  });
  const [educationData, setEducationData] = useState<EducationItem[]>([emptyEducation()]);
  const [workData,      setWorkData]      = useState<WorkItem[]>([emptyWork()]);
  const [skillsData,    setSkillsData]    = useState<SkillItem[]>([emptySkill()]);
  const [languagesData, setLanguagesData] = useState<LanguageItem[]>([emptyLanguage()]);

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  useEffect(() => { loadAll(); }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [personalRes, educationRes, workRes, skillsRes, languagesRes] = await Promise.all([
        fetch(`${BASE_URL}/api/profile/personal`,  { headers }),
        fetch(`${BASE_URL}/api/profile/education`, { headers }),
        fetch(`${BASE_URL}/api/profile/work`,      { headers }),
        fetch(`${BASE_URL}/api/profile/skills`,    { headers }),
        fetch(`${BASE_URL}/api/profile/languages`, { headers }),
      ]);

      if (personalRes.ok) {
        const p = await personalRes.json();
        setPersonalData({
          firstName:          p.firstName          ?? '',
          lastName:           p.lastName           ?? '',
          dateOfBirth:        p.dateOfBirth        ?? '',
          gender:             p.gender             ?? '',
          nationality:        p.nationality        ?? '',
          address:            p.address            ?? '',
          countryOfResidence: p.countryOfResidence ?? '',
          phoneNumber:        p.phoneNumber        ?? '',
        });
        if (p.profilePictureUrl) setAvatarUri(p.profilePictureUrl);
      }

      if (educationRes.ok) {
        const education = await educationRes.json();
        setEducationData(education?.length ? education : [emptyEducation()]);
      }

      if (workRes.ok) {
        const work = await workRes.json();
        // API از currentlyWorking استفاده میکنه، ما isCurrent داریم
        const mapped = work?.map((w: any) => ({
          id:          w.id          ?? '',
          jobTitle:    w.jobTitle    ?? '',
          company:     w.company     ?? '',
          location:    w.location    ?? '',
          startDate:   w.startDate   ?? '',
          endDate:     w.endDate     ?? '',
          isCurrent:   w.currentlyWorking ?? false,
          description: w.description ?? '',
        }));
        setWorkData(mapped?.length ? mapped : [emptyWork()]);
      }

      if (skillsRes.ok) {
        const skills = await skillsRes.json();
        setSkillsData(skills?.length ? skills : [emptySkill()]);
      }

      if (languagesRes.ok) {
        const languages = await languagesRes.json();
        // API name/level داره، ما language/proficiency داریم
        const mapped = languages?.map((l: any) => ({
          id:          l.id    ?? '',
          language:    l.name  ?? '',
          proficiency: l.level ?? 'B2',
        }));
        setLanguagesData(mapped?.length ? mapped : [emptyLanguage()]);
      }

    } catch (e) {
      console.log('loadAll error:', e);
    } finally {
      setLoading(false);
    }
  };

  const savePersonal = async () => {
    await fetch(`${BASE_URL}/api/profile/personal`, {
      method: 'PUT', headers, body: JSON.stringify(personalData),
    });
  };

  const saveEducation = async () => {
    for (const item of educationData) {
      if (!item.degree && !item.institution) continue;
      const body = {
        degree:      item.degree,
        fieldOfStudy: item.fieldOfStudy,
        institution: item.institution,
        startDate:   item.startDate,
        endDate:     item.endDate,
        description: item.description,
      };
      if (item.id) {
        await fetch(`${BASE_URL}/api/profile/education/${item.id}`, {
          method: 'PUT', headers, body: JSON.stringify(body),
        });
      } else {
        const res = await fetch(`${BASE_URL}/api/profile/education`, {
          method: 'POST', headers, body: JSON.stringify(body),
        });
        if (res.ok) {
          const created = await res.json();
          if (created?.id) item.id = created.id;
        }
      }
    }
  };

  const saveWork = async () => {
    for (const item of workData) {
      if (!item.jobTitle && !item.company) continue;
      const body = {
        jobTitle:          item.jobTitle,
        company:           item.company,
        location:          item.location,
        startDate:         item.startDate,
        endDate:           item.endDate,
        currentlyWorking:  item.isCurrent,  // ← map به فیلد API
        description:       item.description,
      };
      if (item.id) {
        await fetch(`${BASE_URL}/api/profile/work/${item.id}`, {
          method: 'PUT', headers, body: JSON.stringify(body),
        });
      } else {
        const res = await fetch(`${BASE_URL}/api/profile/work`, {
          method: 'POST', headers, body: JSON.stringify(body),
        });
        if (res.ok) {
          const created = await res.json();
          if (created?.id) item.id = created.id;
        }
      }
    }
  };

  const saveSkills = async () => {
    for (const item of skillsData) {
      if (!item.name) continue;
      const body = { name: item.name, level: item.level };
      if (item.id) {
        await fetch(`${BASE_URL}/api/profile/skills/${item.id}`, {
          method: 'PUT', headers, body: JSON.stringify(body),
        });
      } else {
        const res = await fetch(`${BASE_URL}/api/profile/skills`, {
          method: 'POST', headers, body: JSON.stringify(body),
        });
        if (res.ok) {
          const created = await res.json();
          if (created?.id) item.id = created.id;
        }
      }
    }
  };

  const saveLanguages = async () => {
    for (const item of languagesData) {
      if (!item.language) continue;
      const body = {
        name:  item.language,    // ← map به فیلد API
        level: item.proficiency, // ← map به فیلد API
      };
      if (item.id) {
        await fetch(`${BASE_URL}/api/profile/languages/${item.id}`, {
          method: 'PUT', headers, body: JSON.stringify(body),
        });
      } else {
        const res = await fetch(`${BASE_URL}/api/profile/languages`, {
          method: 'POST', headers, body: JSON.stringify(body),
        });
        if (res.ok) {
          const created = await res.json();
          if (created?.id) item.id = created.id;
        }
      }
    }
  };

  const deleteEducation = async (id: string) => {
    if (id) await fetch(`${BASE_URL}/api/profile/education/${id}`, { method: 'DELETE', headers });
    setEducationData(prev => {
      const next = prev.filter(i => i.id !== id);
      return next.length ? next : [emptyEducation()];
    });
  };

  const deleteWork = async (id: string) => {
    if (id) await fetch(`${BASE_URL}/api/profile/work/${id}`, { method: 'DELETE', headers });
    setWorkData(prev => {
      const next = prev.filter(i => i.id !== id);
      return next.length ? next : [emptyWork()];
    });
  };

  const deleteSkill = async (id: string) => {
    if (id) await fetch(`${BASE_URL}/api/profile/skills/${id}`, { method: 'DELETE', headers });
    setSkillsData(prev => {
      const next = prev.filter(i => i.id !== id);
      return next.length ? next : [emptySkill()];
    });
  };

  const deleteLanguage = async (id: string) => {
    if (id) await fetch(`${BASE_URL}/api/profile/languages/${id}`, { method: 'DELETE', headers });
    setLanguagesData(prev => {
      const next = prev.filter(i => i.id !== id);
      return next.length ? next : [emptyLanguage()];
    });
  };

  const handleNext = async () => {
    if (currentStep === 0) {
      if (isPersonalFilled(personalData)) {
        const errors = validatePersonal(personalData);
        if (errors.length > 0) {
          setPersonalErrors(errors);
          Alert.alert(t('profileStepper.validationTitle'), t('profileStepper.validationMessage'));
          return;
        }
        setPersonalErrors([]);
        setSaving(true);
        try { await savePersonal(); } finally { setSaving(false); }
      }
      onStepChange(1);
      return;
    }

    if (currentStep === 1) {
      if (isEducationFilled(educationData) && !validateEducation(educationData)) {
        Alert.alert(t('profileStepper.validationTitle'), t('profileStepper.educationValidation'));
        return;
      }
      if (isEducationFilled(educationData)) {
        setSaving(true);
        try { await saveEducation(); } finally { setSaving(false); }
      }
      onStepChange(2);
      return;
    }

    if (currentStep === 2) {
      if (isWorkFilled(workData) && !validateWork(workData)) {
        Alert.alert(t('profileStepper.validationTitle'), t('profileStepper.workValidation'));
        return;
      }
      if (isWorkFilled(workData)) {
        setSaving(true);
        try { await saveWork(); } finally { setSaving(false); }
      }
      onStepChange(3);
      return;
    }

    if (currentStep === 3) {
      if (isSkillFilled(skillsData)) {
        setSaving(true);
        try { await saveSkills(); } finally { setSaving(false); }
      }
      onStepChange(4);
      return;
    }

    if (currentStep === 4) {
      if (isLanguageFilled(languagesData)) {
        setSaving(true);
        try { await saveLanguages(); } catch { } finally { setSaving(false); }
      }
      Alert.alert(t('profileStepper.successTitle'), t('profileStepper.successMessage'));
      return;
    }
  };

  const progressPercent = (currentStep / (STEPS.length - 1)) * 100;

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
          onChange={(field, value) => {
            setPersonalData(prev => ({ ...prev, [field]: value }));
            setPersonalErrors(prev => prev.filter(e => e !== field));
          }}
          avatarUri={avatarUri}
          onAvatarChange={setAvatarUri}
          errors={personalErrors}
        />
      );
      case 1: return <EducationStep data={educationData} onChange={setEducationData} onDelete={deleteEducation} />;
      case 2: return <WorkStep      data={workData}      onChange={setWorkData}      onDelete={deleteWork} />;
      case 3: return <SkillsStep    data={skillsData}    onChange={setSkillsData}    onDelete={deleteSkill} />;
      case 4: return <LanguagesStep data={languagesData} onChange={setLanguagesData} onDelete={deleteLanguage} />;
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
                {isCompleted
                  ? <Icon name="checkmark" size={14} color="#fff" />
                  : <Icon name={step.icon} size={14} color={isActive ? '#fff' : '#90a4ae'} />}
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
          onPress={handleNext}
        >
          <Text style={styles.btnNextText}>
            {saving
              ? t('profileStepper.saving')
              : currentStep === STEPS.length - 1
                ? t('profileStepper.save')
                : t('profileStepper.next')}
          </Text>
          <Icon
            name={currentStep === STEPS.length - 1 ? 'checkmark-outline' : 'arrow-forward-outline'}
            size={18} color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { paddingHorizontal: 24, paddingTop: 48, paddingBottom: 20, backgroundColor: '#ffffff' },
  loadingBox:   { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 80 },
  stepsRow:     { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  stepItem:     { alignItems: 'center', gap: 6, flex: 1 },
  circle: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#f0f4ff', borderWidth: 2, borderColor: '#dce8fb',
    justifyContent: 'center', alignItems: 'center',
  },
  circleActive:    { backgroundCo