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

const emptyEducation = (): EducationItem => ({ id: Date.now().toString(), degree: '', fieldOfStudy: '', institution: '', startDate: '', endDate: '', description: '' });
const emptyWork = (): WorkItem => ({ id: Date.now().toString(), jobTitle: '', company: '', location: '', startDate: '', endDate: '', isCurrent: false, description: '' });
const emptySkill = (): SkillItem => ({ id: Date.now().toString(), name: '', level: 'Intermediate' });
const emptyLanguage = (): LanguageItem => ({ id: Date.now().toString(), language: '', proficiency: 'B2' });

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
      const [personal, education, work, skills, languages, picture] = await Promise.allSettled([
        fetch(`${BASE_URL}/api/profile/personal`,         { headers }).then(r => r.ok ? r.json() : null),
        fetch(`${BASE_URL}/api/profile/education`,        { headers }).then(r => r.ok ? r.json() : null),
        fetch(`${BASE_URL}/api/profile/work`,             { headers }).then(r => r.ok ? r.json() : null),
        fetch(`${BASE_URL}/api/profile/skills`,           { headers }).then(r => r.ok ? r.json() : null),
        fetch(`${BASE_URL}/api/profile/languages`,        { headers }).then(r => r.ok ? r.json() : null),
        fetch(`${BASE_URL}/api/profile/personal/picture`, { headers }).then(r => r.ok ? r.json() : null),
      ]);

      if (personal.status === 'fulfilled' && personal.value) {
        const p = personal.value;
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
      }
      if (education.status === 'fulfilled' && education.value?.length) setEducationData(education.value);
      if (work.status      === 'fulfilled' && work.value?.length)      setWorkData(work.value);
      if (skills.status    === 'fulfilled' && skills.value?.length)    setSkillsData(skills.value);
      if (languages.status === 'fulfilled' && languages.value?.length) setLanguagesData(languages.value);
      if (picture.status   === 'fulfilled' && picture.value?.url)      setAvatarUri(picture.value.url);
    } catch {
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
      if (item.id.length > 15) {
        await fetch(`${BASE_URL}/api/profile/education/${item.id}`, {
          method: 'PUT', headers, body: JSON.stringify(item),
        });
      } else {
        const res = await fetch(`${BASE_URL}/api/profile/education`, {
          method: 'POST', headers, body: JSON.stringify(item),
        });
        const created = await res.json();
        if (created?.id) item.id = created.id;
      }
    }
  };

  const saveWork = async () => {
    for (const item of workData) {
      if (!item.jobTitle && !item.company) continue;
      if (item.id.length > 15) {
        await fetch(`${BASE_URL}/api/profile/work/${item.id}`, {
          method: 'PUT', headers, body: JSON.stringify(item),
        });
      } else {
        const res = await fetch(`${BASE_URL}/api/profile/work`, {
          method: 'POST', headers, body: JSON.stringify(item),
        });
        const created = await res.json();
        if (c