// ===== BASIC TYPES =====

export type Contact = {
  phone: string;
  email: string;
  address: string;
  linkedin?: string;
};

export type Language = {
  name: string;
  level: string; // e.g. A1, B2, Fluent
};

export type Skill = string;

// ===== EDUCATION =====

export type Education = {
  degree: string;
  field?: string;
  institution: string;
  startDate?: string;
  endDate?: string;
  year?: string;
  description?: string;
};

// ===== EXPERIENCE =====

export type Experience = {
  title: string;
  company?: string;
  duration: string;
  description: string;
};

// ===== MAIN CV DATA =====

export type CVData = {
  name: string;
  title: string;
  image?: string;

  summary: string;

  skills: Skill[];
  languages: Language[];
  education: Education[];
  experience: Experience[];

  contact: Contact;
};

// ===== API RESPONSE TYPES =====

export type GeneratedCVProfile = {
  fullName: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  address?: string;
  nationality?: string;
  gender?: string;
  countryOfResidence?: string;
    email?: string;
  linkedin?: string;
};

export type TextWithSource = {
  text: string;
  source?: any;
};

export type GeneratedCVSection = {
  profile: GeneratedCVProfile;
  summary: string | TextWithSource;
  skills: Array<{ name: string; level: string }>;
  languages: Array<{ name: string; level: string }>;
  education: Array<{
    degree: string;
    fieldOfStudy?: string;
    institution: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }>;
  workExperience: Array<{
    jobTitle: string;
    company?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    currentlyWorking: boolean;
    description?: string;
  }>;
};

export type GeneratedCVMetadata = {
  generatedId: string;
  createdAt: string;
  targetJobTitle: string;
  targetJobDescription: string;
  dataSources?: any;
};

export type GeneratedCV = {
  metadata: GeneratedCVMetadata;
  sections: GeneratedCVSection;
};

export type GenerateCVResponse = {
  id: string;
  message: string;
  generatedCv: GeneratedCV;
};