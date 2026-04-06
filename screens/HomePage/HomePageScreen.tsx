import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import HomeHeader from '../../components/HomePage/HomeHeader';
import HomeActions from '../../components/HomePage/HomeActions';
import HomeCards from '../../components/HomePage/HomeCards';
import HomeJobInput from '../../components/HomePage/HomeJobInput';
import HomeFooter from '../../components/HomePage/HomeFooter';

export default function HomePageScreen() {
  const [jobTitle, setJobTitle]             = useState('');
  const [jobDescription, setJobDescription] = useState('');

  return (
    <View style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <HomeHeader />
        <HomeActions defaultActive="generate" />
        <HomeCards
          onUploadCV={(file) => console.log('Uploaded:', file.name)}
          onShareBackground={(text) => console.log('Background:', text)}
        />
        <HomeJobInput
          jobTitle={jobTitle}
          jobDescription={jobDescription}
          onJobTitleChange={setJobTitle}
          onJobDescriptionChange={setJobDescription}
        />
        <HomeFooter
          onGenerate={() => {}}
          onReadPrivacy={() => {}}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe:   { flex: 1, backgroundColor: '#ffffff' },
  scroll: { paddingBottom: 48 },
});