export type ProficiencyLevel = 'Native' | 'Professional' | 'Conversational' | 'Elementary';

export type ResumeType = 'fresher' | 'experienced' | 'academic' | 'technical' | 'internship' | 'general';
export type TemplateId = 'classic' | 'modern' | 'minimal' | 'professional' | 'technical';
export type PageSize = 'a4' | 'letter';
export type ColorTheme = 'monochrome' | 'navy' | 'slate' | 'emerald' | 'burgundy';

export interface PersonalInfo {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  address?: string;
  linkedin: string;
  github: string;
  portfolio: string;
  profilePhoto?: string;
}

export interface CareerInfo {
  targetRole: string;
  careerObjective: string;
  professionalSummary: string;
  yearsOfExperience: string;
  industry: string;
  preferredJobType: string;
  preferredLocation: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  specialization: string;
  institution: string;
  location: string;
  startYear: string;
  endYear: string;
  isCurrentlyStudying?: boolean;
  gpa: string;
  relevantCoursework?: string;
  academicAchievements?: string;
}

export interface TechnicalSkills {
  programmingLanguages: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  frameworks: string[];
  libraries: string[];
  cloud: string[];
  devops: string[];
  tools: string[];
  testing: string[];
  dataAi: string[];
  otherTechnical: string[];
}

export interface WorkExperienceItem {
  id: string;
  jobTitle: string;
  company: string;
  employmentType: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  responsibilities: string[];
  achievements: string[];
  technologiesUsed: string[];
}

export interface InternshipItem {
  id: string;
  internshipTitle: string;
  company: string;
  duration: string;
  startDate: string;
  endDate: string;
  location: string;
  isRemote: boolean;
  responsibilities: string[];
  technologiesUsed: string[];
  projectCompleted: string;
  achievements: string[];
  certificateAvailable: boolean;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  problemStatement?: string;
  solution?: string;
  technologiesUsed: string[];
  frameworks: string[];
  database: string;
  tools: string[];
  role: string;
  keyFeatures: string[];
  challenges?: string;
  achievementsResults: string[];
  githubUrl: string;
  liveDemoUrl: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuingOrg: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl: string;
  skillsLearned: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  category?: 'hackathon' | 'competition' | 'academic' | 'coding' | 'award' | 'other';
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: ProficiencyLevel;
}

export interface ExtracurricularItem {
  id: string;
  activity: string;
  organization: string;
  role: string;
  duration: string;
  description: string;
}

export interface ResponsibilityItem {
  id: string;
  position: string;
  organization: string;
  duration: string;
  responsibilities: string[];
  achievements: string[];
}

export interface PublicationItem {
  id: string;
  title: string;
  authors: string;
  journalConference: string;
  publicationDate: string;
  doi?: string;
  url?: string;
  description?: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  jobTitle: string;
  organization: string;
  email: string;
  phone: string;
  relationship: string;
}

export interface ResumePreferences {
  resumeType: ResumeType;
  template: TemplateId;
  pageSize: PageSize;
  colorTheme: ColorTheme;
  showPhoto: boolean;
  includeReferences: boolean;
  atsOptimizedMode: boolean;
}

export interface ResumeData {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  personalInfo: PersonalInfo;
  careerInfo: CareerInfo;
  education: EducationItem[];
  skills: TechnicalSkills;
  softSkills: string[];
  experience: WorkExperienceItem[];
  internships: InternshipItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  languages: LanguageItem[];
  extracurricular: ExtracurricularItem[];
  positionsOfResponsibility: ResponsibilityItem[];
  publications: PublicationItem[];
  references: ReferenceItem[];
  preferences: ResumePreferences;
}

export interface CompletenessItem {
  section: string;
  isComplete: boolean;
  isOptional: boolean;
  scoreWeight: number;
  tip?: string;
}

export interface KeywordMatchResult {
  matchedSkills: string[];
  missingSkills: string[];
  matchPercentage: number;
  recommendations: string[];
  aiGenerated: boolean;
}
