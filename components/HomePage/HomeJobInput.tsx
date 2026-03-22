import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from '../../hooks/useTranslation';

const { width } = Dimensions.get('window');

type Props = {
  jobTitle: string;
  jobDescription: string;
  onJobTitleChange: (text: string) => void;
  onJobDescriptionChange: (text: string) => void;
};

export default function HomeJobInput({
  jobTitle,
  jobDescription,
  onJobTitleChange,
  onJobDescriptionChange,
}: Props) {
  const { t } = useTranslation();
  const [titleFocused, setTitleFocused] = useState(false);
  const [descFocused, setDescFocused]   = useState(false);

  return (
    <View style={styles.container}>

      <View style={styles.sectionHeader}>
        <View style={styles.sectionIconWrapper}>
          <Icon name="briefcase-outline" size={18} color="#3d6fd8" />
        </View>
        <Text style={styles.sectionTitle}>{t('home.jobSectionTitle')}</Text>
      </View>

      <View style={[styles.inputWrapper, titleFocused && styles.inputWrapperFocused]}>
        <Icon
          name="briefcase-outline"
          size={18}
          color={titleFocused ? '#3d6fd8' : '#90a4ae'}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.titleInput}
          placeholder={t('home.jobTitlePlaceholder')}
          placeholderTextColor="#b0bec5"
          value={jobTitle}
          onChangeText={onJobTitleChange}
          onFocus={() => setTitleFocused(true)}
          onBlur={() => setTitleFocused(false)}
          returnKeyType="next"
        />
        {jobTitle.length > 0 && (
          <TouchableOpacity onPress={() => onJobTitleChange('')} style={styles.clearBtn}>
            <Icon name="close-circle" size={18} color="#b0bec5" />
          </TouchableOpacity>
        )}
      </View>

      <View style={[styles.descWrapper, descFocused && styles.inputWrapperFocused]}>
        <Icon
          name="document-text-outline"
          size={18}
          color={descFocused ? '#3d6fd8' : '#90a4ae'}
          style={styles.descIcon}
        />
        <TextInput
          style={styles.descInput}
          placeholder={t('home.jobDescriptionPlaceholder')}
          placeholderTextColor="#b0bec5"
          value={jobDescription}
          onChangeText={onJobDescriptionChange}
          onFocus={() => setDescFocused(true)}
          onBlur={() => setDescFocused(false)}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.hintRow}>
        <Icon name="information-circle-outline" size={14} color="#90a4ae" />
        <Text style={styles.hintText}>{t('home.jobInputHint')}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  sectionIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#eef4ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#263238',
    letterSpacing: 0.2,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dce8fb',
    borderRadius: 12,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: 'transparent',
    marginBottom: 12,
  },
  inputWrapperFocused: {
    borderColor: '#3d6fd8',
    backgroundColor: '#f0f6ff',
  },
  inputIcon: {
    marginRight: 10,
  },
  titleInput: {
    flex: 1,
    fontSize: 15,
    color: '#263238',
    paddingVertical: 14,
    fontWeight: '500',
  },
  clearBtn: {
    paddingLeft: 8,
  },

  descWrapper: {
    backgroundColor: '#dce8fb',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingTop: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  descIcon: {
    marginTop: 2,
  },
  descInput: {
    flex: 1,
    fontSize: 14,
    color: '#263238',
    minHeight: 120,
    textAlignVertical: 'top',
    lineHeight: 22,
    paddingBottom: 14,
  },

  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  hintText: {
    fontSize: 12,
    color: '#90a4ae',
    flex: 1,
    lineHeight: 18,
  },
});