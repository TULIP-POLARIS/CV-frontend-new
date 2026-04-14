import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import HomeActions from '../../components/HomePage/HomeActions';
import ProfileStepper from '../../components/Profile/ProfileStepper';

type NavProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProfileScreen() {
  const navigation = useNavigation<NavProp>();
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <View style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader />
        <HomeActions
          defaultActive="profile"
          onGeneratePress={() => navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] })}
        />
        <ProfileStepper
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: '#ffffff' },
  scroll: { paddingBottom: 48 },
});