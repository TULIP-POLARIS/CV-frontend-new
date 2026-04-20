import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import HomeHeader from '../../components/HomePage/HomeHeader';
import HomeActions from '../../components/HomePage/HomeActions';
import HomeCards from '../../components/HomePage/HomeCards';
import HomeJobInput from '../../components/HomePage/HomeJobInput';
import HomeFooter from '../../components/HomePage/HomeFooter';

export default function HomePageScreen() {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [uploadedCV, setUploadedCV] = useState<any>(null);
  const [background, setBackground] = useState('');

  const cvData = {
    jobTitle,
    jobDescription,
    uploadedCV: uploadedCV?.name,
    background,
    phone: '',
  };

  return (
    <View style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader />
        <HomeActions defaultActive="generate" />
        <HomeCards
          onUploadCV={(file) => setUploadedCV(file)}
          onShareBackground={(text) => setBackground(text)}
        />
        <HomeJobInput
          jobTitle={jobTitle}
          jobDescription={jobDescription}
          onJobTitleChange={setJobTitle}
          onJobDescriptionChange={setJobDescription}
        />
        <HomeFooter
          onReadPrivacy={() => {}}
          data={cvData} 
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, width: '100%', maxWidth:430 , alignSelf: 'center',backgroundColor: '#ffffff' },
  scroll: { paddingBottom: 48 },
});