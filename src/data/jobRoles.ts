export const TARGET_JOB_ROLES = [
  'Software Engineer',
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Data Analyst',
  'Data Scientist',
  'Cybersecurity Engineer',
  'UI/UX Designer',
  'DevOps Engineer',
  'Cloud Engineer',
  'Mobile App Developer (Flutter/React Native/Android)',
  'QA / Automation Engineer',
  'AI / Machine Learning Engineer',
  'System Administrator',
  'Embedded Systems Engineer',
  'Technical Consultant',
];

export const SKILL_CATEGORIES = [
  { key: 'programmingLanguages', label: 'Programming Languages', placeholder: 'Java, Python, C++, JavaScript, TypeScript' },
  { key: 'frontend', label: 'Frontend', placeholder: 'HTML, CSS, React, Next.js, Tailwind CSS, Vue' },
  { key: 'backend', label: 'Backend', placeholder: 'Node.js, Express, Python/Django, Spring Boot, Go' },
  { key: 'databases', label: 'Databases', placeholder: 'PostgreSQL, MySQL, MongoDB, SQLite, Redis' },
  { key: 'frameworks', label: 'Frameworks', placeholder: 'React, Spring, Express, FastAPI, Django, Flask' },
  { key: 'libraries', label: 'Libraries', placeholder: 'Redux, Motion, Zod, Pandas, NumPy, Axios' },
  { key: 'cloud', label: 'Cloud', placeholder: 'AWS (S3, EC2), Google Cloud Platform, Azure, Vercel' },
  { key: 'devops', label: 'DevOps', placeholder: 'Git, GitHub Actions, Docker, CI/CD, Kubernetes' },
  { key: 'tools', label: 'Tools', placeholder: 'VS Code, Postman, Linux, Figma, Jira, Terminal' },
  { key: 'testing', label: 'Testing', placeholder: 'Jest, Playwright, Selenium, Postman, JUnit' },
  { key: 'dataAi', label: 'Data / AI', placeholder: 'Pandas, NumPy, Gemini API, PyTorch, Scikit-learn' },
  { key: 'otherTechnical', label: 'Other Technical Skills', placeholder: 'OOP, REST APIs, System Design, DSA' },
] as const;

export const POPULAR_SOFT_SKILLS = [
  'Communication',
  'Leadership',
  'Teamwork & Collaboration',
  'Problem Solving',
  'Time Management',
  'Adaptability',
  'Critical Thinking',
  'Attention to Detail',
  'Active Listening',
  'Work Ethic',
];

export const STEP_CONFIG = [
  { step: 1, title: 'Personal Information', short: 'Personal', description: "Let's start with your contact and profile details." },
  { step: 2, title: 'Career Summary & Objective', short: 'Career', description: 'What type of job are you looking for?' },
  { step: 3, title: 'Education', short: 'Education', description: 'Tell us about your college, degree, and academic background.' },
  { step: 4, title: 'Skills (Technical & Soft)', short: 'Skills', description: 'Add your programming languages, tools, and competencies.' },
  { step: 5, title: 'Work Experience', short: 'Experience', description: 'Any past employment or company experience? (Optional for freshers)' },
  { step: 6, title: 'Internships', short: 'Internships', description: 'Detail your internships, client work, or summer training.' },
  { step: 7, title: 'Projects', short: 'Projects', description: 'Detail your best academic, capstone, or personal projects.' },
  { step: 8, title: 'Certifications', short: 'Certifications', description: 'Official courses, badges, and verified credentials.' },
  { step: 9, title: 'Achievements & Awards', short: 'Achievements', description: 'Hackathons, coding contests, scholarships, and honors.' },
  { step: 10, title: 'Languages', short: 'Languages', description: 'Spoken and written languages with proficiency.' },
  { step: 11, title: 'Extracurricular Activities', short: 'Extracurricular', description: 'Student clubs, community initiatives, sports, and volunteering.' },
  { step: 12, title: 'Positions of Responsibility', short: 'Leadership', description: 'Club coordinator, team lead, or student representative roles.' },
  { step: 13, title: 'Publications / Research', short: 'Research', description: 'Academic papers, conference presentations, or journals (Optional).' },
  { step: 14, title: 'References', short: 'References', description: 'Mentors, professors, or managers available for recommendation (Optional).' },
  { step: 15, title: 'Resume Preferences', short: 'Preferences', description: 'Choose your template, color theme, page size, and layout type.' },
  { step: 16, title: 'Final Review', short: 'Review', description: 'Verify all your details with quick-edit shortcuts before generating.' },
  { step: 17, title: 'Generate & Export', short: 'Generate', description: 'Preview your ATS-ready resume, download PDF, or print.' },
];

export const TEMPLATE_OPTIONS = [
  {
    id: 'classic',
    name: 'Classic Standard',
    description: 'Clean, traditional single-column format favored by top Fortune 500 ATS systems.',
    atsRating: '100% ATS Safe',
  },
  {
    id: 'modern',
    name: 'Modern Header',
    description: 'Crisp header accent with structured metadata badges and sleek dividers.',
    atsRating: '99% ATS Safe',
  },
  {
    id: 'minimal',
    name: 'Clean Minimalist',
    description: 'Understated, airy aesthetic with refined typography and maximum readability.',
    atsRating: '100% ATS Safe',
  },
  {
    id: 'professional',
    name: 'Professional Slate',
    description: 'Formal corporate layout with bordered accents, perfect for consulting & engineering.',
    atsRating: '98% ATS Safe',
  },
  {
    id: 'technical',
    name: 'Developer Technical',
    description: 'Emphasizes technical stack tags, project architectures, and GitHub metrics.',
    atsRating: '99% ATS Safe',
  },
] as const;

export const COLOR_THEMES = [
  { id: 'monochrome', name: 'Monochrome', color: '#1c1917' },
  { id: 'navy', name: 'Navy Blue', color: '#1e3a8a' },
  { id: 'slate', name: 'Cool Slate', color: '#334155' },
  { id: 'emerald', name: 'Emerald', color: '#065f46' },
  { id: 'burgundy', name: 'Burgundy', color: '#831843' },
] as const;

