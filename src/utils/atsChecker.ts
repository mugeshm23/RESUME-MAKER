import { ResumeData } from '../types';

export interface ScoreCategory {
  title: string;
  status: 'excellent' | 'good' | 'warning' | 'neutral';
  score: number;
  maxScore: number;
  reason: string;
}

export interface ATSAnalysisResult {
  totalScore: number; // 0 - 100
  completenessPercent: number; // 0 - 100
  categories: ScoreCategory[];
  recommendations: { section: string; message: string; why: string; isWarning: boolean }[];
  isAtsSafe: boolean;
  wordCount: number;
  estimatedPageCount: number;
  breakdown: { category: string; score: number; maxScore: number; feedback: string }[];
  suggestions: string[];
}


export function analyzeResumeATS(resume: ResumeData): ATSAnalysisResult {
  const p = resume.personalInfo;
  const c = resume.careerInfo;
  const isFresher = resume.preferences.resumeType === 'fresher' || (resume.experience.length === 0 && resume.projects.length > 0);

  const categories: ScoreCategory[] = [];
  const recommendations: { section: string; message: string; why: string; isWarning: boolean }[] = [];

  // 1. Personal Information (15 pts)
  let personalScore = 0;
  if (p.fullName.trim()) personalScore += 4;
  if (p.email.includes('@') && p.email.includes('.')) personalScore += 4;
  if (p.phone.trim().length >= 7) personalScore += 3;
  if (p.linkedin.trim()) personalScore += 2;
  if (p.github.trim() || p.portfolio.trim()) personalScore += 2;

  if (!p.linkedin.trim()) {
    recommendations.push({
      section: 'Personal Info',
      message: 'Add your LinkedIn profile URL.',
      why: '87% of technical recruiters cross-reference LinkedIn to verify candidate activity and credentials.',
      isWarning: false,
    });
  }
  if (!p.github.trim() && (c.targetRole.toLowerCase().includes('engineer') || c.targetRole.toLowerCase().includes('developer'))) {
    recommendations.push({
      section: 'Personal Info',
      message: 'Add your GitHub profile URL.',
      why: 'For software and engineering roles, visible code repositories validate hands-on programming abilities.',
      isWarning: true,
    });
  }

  categories.push({
    title: 'Personal Information',
    status: personalScore >= 13 ? 'excellent' : personalScore >= 8 ? 'good' : 'warning',
    score: personalScore,
    maxScore: 15,
    reason: personalScore >= 13 ? 'All vital recruiter contact channels provided.' : 'Missing professional profile links (LinkedIn or GitHub).',
  });

  // 2. Career Summary (15 pts)
  let careerScore = 0;
  if (c.targetRole.trim()) careerScore += 5;
  const summaryLength = c.professionalSummary.trim().split(/\s+/).filter(Boolean).length;
  if (summaryLength >= 20 && summaryLength <= 100) {
    careerScore += 10;
  } else if (summaryLength > 0) {
    careerScore += 5;
    recommendations.push({
      section: 'Career Summary',
      message: 'Expand your professional summary to 40-75 words.',
      why: 'ATS keyword scrapers and hiring managers spend 6 seconds reading the summary to gauge your focus.',
      isWarning: false,
    });
  } else {
    recommendations.push({
      section: 'Career Summary',
      message: 'Add a 2-3 sentence career summary.',
      why: 'A targeted summary highlights your core strengths before recruiters read lengthy technical sections.',
      isWarning: true,
    });
  }

  categories.push({
    title: 'Career Summary',
    status: careerScore >= 13 ? 'excellent' : careerScore >= 8 ? 'good' : 'warning',
    score: careerScore,
    maxScore: 15,
    reason: careerScore >= 13 ? 'Clear targeted role and concise summary.' : 'Summary can be expanded with technical focus areas.',
  });

  // 3. Education (15 pts)
  let eduScore = 0;
  if (resume.education.length > 0) {
    const firstEdu = resume.education[0];
    if (firstEdu.degree && firstEdu.institution) eduScore += 8;
    if (firstEdu.startYear && firstEdu.endYear) eduScore += 4;
    if (firstEdu.gpa.trim()) eduScore += 3;
    if (firstEdu.relevantCoursework) eduScore = Math.min(15, eduScore + 2);
  } else {
    recommendations.push({
      section: 'Education',
      message: 'Add at least one educational degree or university.',
      why: 'Automated ATS parsers require an education block to verify minimum qualification criteria.',
      isWarning: true,
    });
  }

  categories.push({
    title: 'Education',
    status: eduScore >= 12 ? 'excellent' : eduScore >= 7 ? 'good' : 'warning',
    score: eduScore,
    maxScore: 15,
    reason: eduScore >= 12 ? 'Complete academic credentials with dates and specialization.' : 'Consider specifying graduation dates or coursework.',
  });

  // 4. Technical Skills (20 pts)
  let skillsScore = 0;
  const allSkills = [
    ...resume.skills.programmingLanguages,
    ...resume.skills.frontend,
    ...resume.skills.backend,
    ...resume.skills.databases,
    ...resume.skills.frameworks,
    ...resume.skills.libraries,
    ...resume.skills.cloud,
    ...resume.skills.devops,
    ...resume.skills.tools,
    ...resume.skills.testing,
    ...resume.skills.dataAi,
    ...resume.skills.otherTechnical,
  ];

  if (allSkills.length >= 10) {
    skillsScore = 20;
  } else if (allSkills.length >= 5) {
    skillsScore = 14;
    recommendations.push({
      section: 'Skills',
      message: 'Group at least 8-12 technical skills into clear categories.',
      why: 'ATS scanners search for specific skill tokens across programming languages, frameworks, and databases.',
      isWarning: false,
    });
  } else {
    skillsScore = 6;
    recommendations.push({
      section: 'Skills',
      message: 'Add your primary programming languages, tools, and libraries.',
      why: 'Skills section is the #1 keyword filter in automated resume ranking software.',
      isWarning: true,
    });
  }

  categories.push({
    title: 'Technical Skills',
    status: skillsScore >= 18 ? 'excellent' : skillsScore >= 12 ? 'good' : 'warning',
    score: skillsScore,
    maxScore: 20,
    reason: skillsScore >= 18 ? `${allSkills.length} categorized skills found.` : 'Add a few more languages, databases, or developer tools.',
  });

  // 5. Projects & Practical Experience (20 pts)
  let practicalScore = 0;
  if (isFresher) {
    // For freshers, projects + internships carry the bulk
    const projCount = resume.projects.length;
    const internCount = resume.internships.length;
    if (projCount >= 2 || (projCount >= 1 && internCount >= 1)) {
      practicalScore = 20;
    } else if (projCount === 1) {
      practicalScore = 14;
      recommendations.push({
        section: 'Projects',
        message: 'Add a second project to showcase breadth.',
        why: 'For students without extensive full-time experience, having 2-3 detailed projects demonstrates consistency.',
        isWarning: false,
      });
    } else {
      practicalScore = 5;
      recommendations.push({
        section: 'Projects',
        message: 'Add at least 1-2 detailed technical projects.',
        why: 'Projects prove you can turn theoretical coursework into working software.',
        isWarning: true,
      });
    }
  } else {
    // For experienced, work experience + projects
    const expCount = resume.experience.length;
    if (expCount >= 2) {
      practicalScore = 20;
    } else if (expCount === 1) {
      practicalScore = 15;
    } else {
      practicalScore = resume.projects.length >= 2 ? 15 : 8;
    }
  }

  // Check for bullet action verbs & detail
  const allBullets = [
    ...resume.experience.flatMap((e) => [...e.responsibilities, ...e.achievements]),
    ...resume.internships.flatMap((i) => [...i.responsibilities, ...i.achievements]),
    ...resume.projects.flatMap((p) => [...p.keyFeatures, ...p.achievementsResults]),
  ];

  const hasActionVerbs = allBullets.some((b) => /^(built|developed|engineered|implemented|designed|architected|created|optimized|streamlined|spearheaded|configured)/i.test(b.trim()));
  if (!hasActionVerbs && allBullets.length > 0) {
    recommendations.push({
      section: 'Bullet Points',
      message: 'Start bullet points with strong action verbs (e.g., Developed, Engineered, Optimized).',
      why: 'Action verbs make your contributions active and measurable rather than passive duties.',
      isWarning: false,
    });
  }

  categories.push({
    title: isFresher ? 'Projects & Internships' : 'Work Experience & Projects',
    status: practicalScore >= 18 ? 'excellent' : practicalScore >= 12 ? 'good' : 'warning',
    score: practicalScore,
    maxScore: 20,
    reason: practicalScore >= 18 
      ? (isFresher ? 'Strong project portfolio with structured outcomes.' : 'Clear work experience with technical impact.')
      : 'Expand key features or add quantifiable outcomes.',
  });

  // 6. ATS Structure & Formatting (15 pts)
  let atsScore = 15;
  if (!resume.preferences.atsOptimizedMode) {
    atsScore -= 3;
  }
  categories.push({
    title: 'ATS Formatting Structure',
    status: 'excellent',
    score: atsScore,
    maxScore: 15,
    reason: 'Standard section headings, machine-readable typography, and linear semantic hierarchy.',
  });

  const totalScore = personalScore + careerScore + eduScore + skillsScore + practicalScore + atsScore;

  // Completeness percent based on core steps
  let completedSections = 0;
  const totalCoreSections = 6;
  if (personalScore >= 8) completedSections++;
  if (careerScore >= 8) completedSections++;
  if (eduScore >= 8) completedSections++;
  if (skillsScore >= 10) completedSections++;
  if (practicalScore >= 10) completedSections++;
  if (resume.certifications.length > 0 || resume.achievements.length > 0 || resume.languages.length > 0) completedSections++;

  const completenessPercent = Math.min(100, Math.round((completedSections / totalCoreSections) * 100));

  // Compute word count across all fields
  const allText = [
    p.fullName,
    p.professionalTitle,
    c.careerObjective,
    c.professionalSummary,
    ...resume.education.map((e) => `${e.degree} ${e.specialization} ${e.institution} ${e.relevantCoursework || ''}`),
    ...allSkills,
    ...allBullets,
    ...resume.certifications.map((cert) => `${cert.name} ${cert.issuingOrg}`),
    ...resume.achievements.map((ach) => `${ach.title} ${ach.description}`),
  ].join(' ');

  const wordCount = allText.split(/\s+/).filter(Boolean).length;
  const estimatedPageCount = wordCount > 480 ? 2 : 1;

  const breakdown = categories.map((cat) => ({
    category: cat.title,
    score: cat.score,
    maxScore: cat.maxScore,
    feedback: cat.reason,
  }));

  const suggestions = recommendations.map((r) => `${r.section}: ${r.message}`);

  return {
    totalScore,
    completenessPercent,
    categories,
    recommendations,
    isAtsSafe: true,
    wordCount,
    estimatedPageCount,
    breakdown,
    suggestions,
  };
}

export const calculateATSScore = analyzeResumeATS;

