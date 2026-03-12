import React from "react";
import { ScrollView, StyleSheet } from "react-native";

import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import ProfileCompletion from "./ProfileCompletion";
import PersonalInfoSection from "./PersonalInfoSection";
import SkillsSection from "./SkillsSection";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import LanguagesSection from "./LanguagesSection";

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <ProfileHeader />
      <ProfileStats />
      <ProfileCompletion />
      <PersonalInfoSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <LanguagesSection />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FB",
  },
});