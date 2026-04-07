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